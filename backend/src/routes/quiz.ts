import { Router, Request, Response } from 'express';

const router = Router();

// Service NSW Driver Knowledge Test (DKT) Questions Database
const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: 'Speed & School Zones',
    question: 'What is the default speed limit in NSW urban built-up areas unless a speed limit sign indicates otherwise?',
    options: ['40 km/h', '50 km/h', '60 km/h', '70 km/h'],
    correctIndex: 1,
    explanation: 'In NSW built-up areas, the default speed limit is 50 km/h unless a road sign displays a different limit.'
  },
  {
    id: 2,
    category: 'Roundabouts',
    question: 'When approaching a roundabout, which vehicle must you give way to?',
    options: [
      'Vehicles entering from your left',
      'Vehicles already in the roundabout or approaching from your right',
      'Heavy commercial vehicles only',
      'No one, you always have right of way'
    ],
    correctIndex: 1,
    explanation: 'You must give way to any vehicle already in, entering, or approaching the roundabout from your right.'
  },
  {
    id: 3,
    category: 'School Zones',
    question: 'What is the speed limit in a designated NSW School Zone during active operational hours (8:00–9:30 AM & 2:30–4:00 PM on school days)?',
    options: ['30 km/h', '40 km/h', '50 km/h', '60 km/h'],
    correctIndex: 1,
    explanation: 'NSW School Zones enforce a strict 40 km/h limit during active morning and afternoon school hours.'
  },
  {
    id: 4,
    category: 'Learner Speed Limits',
    question: 'What is the maximum speed limit permitted for an NSW Learner (L-Plate) driver anywhere in NSW, even in a 110 km/h zone?',
    options: ['80 km/h', '90 km/h', '100 km/h', '110 km/h'],
    correctIndex: 1,
    explanation: 'NSW Learner drivers (L-Plates) must never exceed 90 km/h on any road in NSW.'
  },
  {
    id: 5,
    category: 'Maneuvers & Indicators',
    question: 'When performing a kerbside stop or parallel park, how long before stopping must you indicate?',
    options: [
      'Indicate continuously for at least 5 seconds before pulling over',
      'Indicate 1 second before',
      'No indication is needed if no cars are behind you',
      'Flash hazard lights instead'
    ],
    correctIndex: 0,
    explanation: 'You must signal your intention with your indicator for at least 5 seconds before pulling over or stopping at the kerb.'
  },
  {
    id: 6,
    category: 'Mobile Phone Rules',
    question: 'Are NSW Learner (L-Plate) and Provisional (P1/P2) drivers permitted to use a mobile phone hands-free or via Bluetooth while driving?',
    options: [
      'Yes, if using Bluetooth voice commands',
      'Yes, if mounted in a commercial cradle',
      'NO. NSW Learners and P-platers are strictly forbidden from using any phone function while driving or stopped in traffic.',
      'Yes, but only for GPS navigation'
    ],
    correctIndex: 2,
    explanation: 'NSW Learner and Provisional drivers are strictly prohibited from using mobile phones for any function while driving or queued in traffic.'
  },
  {
    id: 7,
    category: 'Hazard Perception',
    question: 'When following another vehicle in good weather conditions, what is the minimum safe visual gap distance?',
    options: ['1 second', '3 seconds', '5 seconds', '10 seconds'],
    correctIndex: 1,
    explanation: 'Maintain a minimum 3-second crash avoidance space behind the vehicle in front in dry conditions (double in wet weather).'
  },
  {
    id: 8,
    category: 'Pedestrian Crossings',
    question: 'When approaching a marked zebra pedestrian crossing, when must you stop?',
    options: [
      'Only if a pedestrian is already stepping onto the crossing',
      'If any pedestrian is about to step onto or is crossing',
      'Only if a police officer is present',
      'You only need to slow down to 20 km/h'
    ],
    correctIndex: 1,
    explanation: 'You must give way to any pedestrian who is on or about to step onto a marked pedestrian crossing.'
  }
];

// GET /api/quiz/questions - Fetch quiz questions
router.get('/questions', (_req: Request, res: Response): void => {
  res.json({
    success: true,
    count: QUIZ_QUESTIONS.length,
    data: QUIZ_QUESTIONS.map(q => ({
      id: q.id,
      category: q.category,
      question: q.question,
      options: q.options
    }))
  });
});

// POST /api/quiz/submit - Submit and score quiz
router.post('/submit', (req: Request, res: Response): void => {
  const { answers } = req.body; // Array of { questionId: number, selectedIndex: number }

  if (!answers || !Array.isArray(answers)) {
    res.status(400).json({ success: false, error: 'Answers array is required' });
    return;
  }

  let score = 0;
  const results = QUIZ_QUESTIONS.map(q => {
    const userAns = answers.find((a: any) => a.questionId === q.id);
    const selectedIndex = userAns ? userAns.selectedIndex : -1;
    const isCorrect = selectedIndex === q.correctIndex;
    if (isCorrect) score += 1;

    return {
      questionId: q.id,
      question: q.question,
      userAnswer: selectedIndex >= 0 ? q.options[selectedIndex] : 'Not answered',
      correctAnswer: q.options[q.correctIndex],
      isCorrect,
      explanation: q.explanation
    };
  });

  const total = QUIZ_QUESTIONS.length;
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 85;

  res.json({
    success: true,
    score,
    total,
    percentage,
    passed,
    message: passed ? 'CONGRATULATIONS! YOU PASSED THE PRACTICE QUIZ 🎉' : 'KEEP PRACTICING! Service NSW requires 85%+ to pass.',
    results
  });
});

export default router;
