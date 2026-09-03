import { Router, Response } from 'express';
import { z } from 'zod';
import { pool, isPgConnected, inMemoryStore } from '../db/database.js';
import { authenticateToken, requireRole, AuthenticatedRequest } from '../middleware/auth.js';
import { checkAndAwardBadges } from '../services/badgeEngine.js';

const router = Router();

const updateProgressSchema = z.object({
  status: z.enum(['not_started', 'in_progress', 'mastered']),
  instructorNotes: z.string().optional().default('')
});

// GET /api/badges - Get all system badges (public / authenticated)
router.get('/badges', async (_req, res: Response): Promise<void> => {
  try {
    if (isPgConnected) {
      const result = await pool.query('SELECT * FROM badges ORDER BY id ASC');
      res.json({ success: true, count: result.rows.length, data: result.rows });
    } else {
      res.json({ success: true, count: inMemoryStore.badges.length, data: inMemoryStore.badges });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/progress/:studentId - Get student skill progress matrix
router.get('/progress/:studentId', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { studentId } = req.params;
    const currentUser = req.user!;

    // Self-or-Staff Authorization Enforcer
    if (currentUser.role === 'student' && currentUser.userId !== studentId) {
      res.status(403).json({
        success: false,
        error: 'Access forbidden: Students can only view their own progress.'
      });
      return;
    }

    if (isPgConnected) {
      const result = await pool.query(
        `SELECT 
           ps.id as skill_id, 
           ps.skill_name, 
           ps.category, 
           ps.display_order, 
           COALESCE(sp.status, 'not_started') as status, 
           sp.instructor_notes, 
           sp.updated_at,
           sp.updated_by
         FROM progress_skills ps
         LEFT JOIN student_progress sp ON ps.id = sp.skill_id AND sp.student_id = $1
         ORDER BY ps.display_order ASC`,
        [studentId]
      );

      res.json({
        success: true,
        studentId,
        count: result.rows.length,
        data: result.rows.map(row => ({
          skillId: row.skill_id,
          skillName: row.skill_name,
          category: row.category,
          displayOrder: row.display_order,
          status: row.status,
          instructorNotes: row.instructor_notes || '',
          updatedAt: row.updated_at,
          updatedBy: row.updated_by
        }))
      });
    } else {
      // In-Memory Fallback
      const userProgressMap = new Map(
        inMemoryStore.studentProgress
          .filter(sp => sp.studentId === studentId)
          .map(sp => [sp.skillId, sp])
      );

      const data = inMemoryStore.progressSkills.map(ps => {
        const prog = userProgressMap.get(ps.id);
        return {
          skillId: ps.id,
          skillName: ps.skillName,
          category: ps.category,
          displayOrder: ps.displayOrder,
          status: prog ? prog.status : 'not_started',
          instructorNotes: prog ? (prog.instructorNotes || '') : '',
          updatedAt: prog ? prog.updatedAt : null,
          updatedBy: prog ? prog.updatedBy : null
        };
      });

      res.json({ success: true, studentId, count: data.length, data });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/progress/:studentId/:skillId - Update skill status & instructor notes (Instructors/Admins ONLY)
router.patch('/progress/:studentId/:skillId', authenticateToken, requireRole('instructor', 'admin'), async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { studentId, skillId } = req.params;
    const instructorUserId = req.user!.userId;

    const parseResult = updateProgressSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: parseResult.error.issues.map((e: any) => e.message)
      });
      return;
    }

    const { status, instructorNotes } = parseResult.data;

    let updatedRecord: any = null;

    if (isPgConnected) {
      // Check instructor record ID linked to calling user
      const instRes = await pool.query('SELECT id FROM instructors WHERE user_id = $1', [instructorUserId]);
      const instructorId = instRes.rows.length > 0 ? instRes.rows[0].id : null;

      const spId = `sp-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

      const upsertRes = await pool.query(
        `INSERT INTO student_progress (id, student_id, skill_id, status, instructor_notes, updated_by, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW())
         ON CONFLICT (student_id, skill_id) 
         DO UPDATE SET status = $4, instructor_notes = $5, updated_by = $6, updated_at = NOW()
         RETURNING *`,
        [spId, studentId, skillId, status, instructorNotes, instructorId]
      );

      updatedRecord = upsertRes.rows[0];
    } else {
      // In-Memory Fallback
      let existing = inMemoryStore.studentProgress.find(sp => sp.studentId === studentId && sp.skillId === skillId);
      if (existing) {
        existing.status = status;
        existing.instructorNotes = instructorNotes;
        existing.updatedBy = instructorUserId;
        existing.updatedAt = new Date().toISOString();
        updatedRecord = existing;
      } else {
        const newRecord = {
          id: `sp-${Date.now()}`,
          studentId,
          skillId,
          status,
          instructorNotes,
          updatedBy: instructorUserId,
          updatedAt: new Date().toISOString()
        };
        inMemoryStore.studentProgress.push(newRecord);
        updatedRecord = newRecord;
      }
    }

    // Trigger Badge Engine Check
    const newlyEarnedBadges = await checkAndAwardBadges(String(studentId));

    res.json({
      success: true,
      message: 'Student progress updated successfully!',
      data: updatedRecord,
      newlyEarnedBadges
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/progress/:studentId/badges - Get student's earned badges
router.get('/progress/:studentId/badges', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { studentId } = req.params;
    const currentUser = req.user!;

    // Self-or-Staff Authorization Enforcer
    if (currentUser.role === 'student' && currentUser.userId !== studentId) {
      res.status(403).json({
        success: false,
        error: 'Access forbidden: Students can only view their own badges.'
      });
      return;
    }

    if (isPgConnected) {
      const result = await pool.query(
        `SELECT 
           sb.id, 
           sb.badge_id, 
           b.name, 
           b.description, 
           b.icon, 
           sb.earned_at
         FROM student_badges sb
         JOIN badges b ON sb.badge_id = b.id
         WHERE sb.student_id = $1
         ORDER BY sb.earned_at DESC`,
        [studentId]
      );

      res.json({
        success: true,
        studentId,
        count: result.rows.length,
        data: result.rows.map(r => ({
          id: r.id,
          badgeId: r.badge_id,
          name: r.name,
          description: r.description,
          icon: r.icon,
          earnedAt: r.earned_at
        }))
      });
    } else {
      const studentBadges = inMemoryStore.studentBadges.filter(sb => sb.studentId === studentId);
      const badgeMap = new Map(inMemoryStore.badges.map(b => [b.id, b]));

      const data = studentBadges.map(sb => {
        const b = badgeMap.get(sb.badgeId);
        return {
          id: sb.id,
          badgeId: sb.badgeId,
          name: b ? b.name : 'Achievement Badge',
          description: b ? b.description : '',
          icon: b ? b.icon : '🏆',
          earnedAt: sb.earnedAt
        };
      });

      res.json({ success: true, studentId, count: data.length, data });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
