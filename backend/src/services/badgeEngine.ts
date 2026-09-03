import { pool, isPgConnected, inMemoryStore } from '../db/database.js';

export interface AwardedBadge {
  id: string;
  badgeId: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

/**
 * Evaluates student progress against badge criteria and awards new badges.
 */
export async function checkAndAwardBadges(studentId: string): Promise<AwardedBadge[]> {
  const newBadges: AwardedBadge[] = [];

  if (isPgConnected) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // 1. Fetch student's current mastered skills count and mastered skill IDs
      const progressRes = await client.query(
        `SELECT skill_id, status FROM student_progress WHERE student_id = $1`,
        [studentId]
      );

      const masteredSkills = progressRes.rows.filter(r => r.status === 'mastered');
      const masteredCount = masteredSkills.length;
      const masteredSkillIds = new Set(masteredSkills.map(r => r.skill_id));

      // 2. Fetch all system badges
      const badgesRes = await client.query('SELECT * FROM badges');
      const allBadges = badgesRes.rows;

      // 3. Fetch already earned badge IDs for student
      const earnedRes = await client.query(
        'SELECT badge_id FROM student_badges WHERE student_id = $1',
        [studentId]
      );
      const earnedBadgeIds = new Set(earnedRes.rows.map(r => r.badge_id));

      // 4. Evaluate each badge criteria
      for (const badge of allBadges) {
        if (earnedBadgeIds.has(badge.id)) continue;

        let criteria: any = {};
        try {
          criteria = typeof badge.criteria_json === 'string'
            ? JSON.parse(badge.criteria_json)
            : (badge.criteria_json || {});
        } catch (e) {
          criteria = {};
        }

        let isEligible = false;

        // Rule A: {"skills_mastered": N} or {"skills_mastered_count": N}
        const requiredCount = criteria.skills_mastered ?? criteria.skills_mastered_count ?? criteria.skills_count;
        if (typeof requiredCount === 'number' && masteredCount >= requiredCount) {
          isEligible = true;
        }

        // Rule B: {"skill_id": "skill-05"}
        if (criteria.skill_id && masteredSkillIds.has(criteria.skill_id)) {
          isEligible = true;
        }

        // Rule C: {"category_mastered": "Parking"}
        if (criteria.category_mastered) {
          const categorySkillsRes = await client.query(
            'SELECT id FROM progress_skills WHERE category = $1',
            [criteria.category_mastered]
          );
          const categorySkillIds = categorySkillsRes.rows.map(r => r.id);
          if (categorySkillIds.length > 0 && categorySkillIds.every(id => masteredSkillIds.has(id))) {
            isEligible = true;
          }
        }

        if (isEligible) {
          const studentBadgeId = `sb-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
          const earnedAt = new Date().toISOString();

          await client.query(
            `INSERT INTO student_badges (id, student_id, badge_id, earned_at)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (student_id, badge_id) DO NOTHING`,
            [studentBadgeId, studentId, badge.id, earnedAt]
          );

          newBadges.push({
            id: studentBadgeId,
            badgeId: badge.id,
            name: badge.name,
            description: badge.description,
            icon: badge.icon,
            earnedAt
          });
        }
      }

      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('Error checking badges:', err);
    } finally {
      client.release();
    }
  } else {
    // In-Memory Fallback Path
    const studentProg = inMemoryStore.studentProgress.filter(sp => sp.studentId === studentId);
    const masteredSkills = studentProg.filter(sp => sp.status === 'mastered');
    const masteredCount = masteredSkills.length;
    const masteredSkillIds = new Set(masteredSkills.map(sp => sp.skillId));

    const earnedBadgeIds = new Set(
      inMemoryStore.studentBadges.filter(sb => sb.studentId === studentId).map(sb => sb.badgeId)
    );

    for (const badge of inMemoryStore.badges) {
      if (earnedBadgeIds.has(badge.id)) continue;

      let criteria: any = {};
      try {
        criteria = typeof badge.criteriaJson === 'string'
          ? JSON.parse(badge.criteriaJson)
          : (badge.criteriaJson || {});
      } catch (e) {
        criteria = {};
      }

      let isEligible = false;
      const requiredCount = criteria.skills_mastered ?? criteria.skills_mastered_count ?? criteria.skills_count;
      if (typeof requiredCount === 'number' && masteredCount >= requiredCount) {
        isEligible = true;
      }
      if (criteria.skill_id && masteredSkillIds.has(criteria.skill_id)) {
        isEligible = true;
      }

      if (isEligible) {
        const studentBadgeId = `sb-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
        const earnedAt = new Date().toISOString();

        inMemoryStore.studentBadges.push({
          id: studentBadgeId,
          studentId,
          badgeId: badge.id,
          earnedAt
        });

        newBadges.push({
          id: studentBadgeId,
          badgeId: badge.id,
          name: badge.name,
          description: badge.description,
          icon: badge.icon,
          earnedAt
        });
      }
    }
  }

  return newBadges;
}
