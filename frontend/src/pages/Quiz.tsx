import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RefreshCw, 
  Car, 
  AlertCircle, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { fetchQuizQuestions, submitQuizAnswers } from '../services/api';

export const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    const qData = await fetchQuizQuestions();
    setQuestions(qData);
    setLoading(false);
  };

  const handleSelectOption = (qId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuiz = async () => {
    const formatted = Object.entries(userAnswers).map(([qId, selectedIndex]) => ({
      questionId: parseInt(qId),
      selectedIndex
    }));
    const res = await submitQuizAnswers(formatted);
    setQuizResult(res);
    setIsSubmitted(true);
  };

  const handleRestart = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setQuizResult(null);
    setCurrentIdx(0);
  };

  if (loading) {
    return (
      <div className="quiz-loading-page">
        <PageHeader 
          tag="SERVICE NSW PRACTICE EXAM"
          title="DRIVER KNOWLEDGE TEST (DKT) SIMULATOR."
          subtitle="Loading official NSW Transport road rule practice questions..."
          breadcrumb="Practice Quiz"
        />
        <div className="container section-padding text-center">
          <RefreshCw size={36} className="spin-icon" style={{ margin: '2rem auto', color: 'var(--accent-gold)' }} />
          <p>Preparing Service NSW exam questions...</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="quiz-page">
      <PageHeader 
        tag="SERVICE NSW PRACTICE EXAM"
        title="DRIVER KNOWLEDGE TEST (DKT) SIMULATOR."
        subtitle="Interactive practice quiz simulating NSW speed limits, roundabouts, school zones, and hazard perception rules."
        breadcrumb="Practice Quiz"
      />

      <section className="section-padding" style={{ paddingTop: '1.5rem' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          {!isSubmitted ? (
            /* ACTIVE QUIZ WIZARD */
            <div className="quiz-card aura-card">
              {/* Quiz Header & Tracker */}
              <div className="quiz-card-header">
                <div className="quiz-progress-badge">
                  <BookOpen size={16} />
                  <span>QUESTION {currentIdx + 1} OF {questions.length}</span>
                </div>
                <div className="category-pill">{currentQ?.category}</div>
              </div>

              {/* Progress Line */}
              <div className="quiz-progress-line-bg">
                <div 
                  className="quiz-progress-line-fill" 
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="quiz-question-title">{currentQ?.question}</h3>

              {/* Options List */}
              <div className="quiz-options-grid">
                {currentQ?.options?.map((opt: string, idx: number) => {
                  const isSelected = userAnswers[currentQ.id] === idx;
                  return (
                    <div 
                      key={idx}
                      className={`quiz-option-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectOption(currentQ.id, idx)}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                      <span className="option-text">{opt}</span>
                    </div>
                  );
                })}
              </div>

              {/* Stepper Footer Controls */}
              <div className="quiz-footer-row">
                <div className="answered-status">
                  <span>{answeredCount} of {questions.length} answered</span>
                </div>

                <div className="quiz-btn-actions">
                  {currentIdx > 0 && (
                    <Button onClick={() => setCurrentIdx(prev => prev - 1)} variant="outline" size="sm">
                      Previous
                    </Button>
                  )}

                  {currentIdx < questions.length - 1 ? (
                    <Button onClick={() => setCurrentIdx(prev => prev + 1)} variant="primary" size="sm">
                      Next Question <ArrowRight size={14} />
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleSubmitQuiz} 
                      variant="yellow" 
                      size="sm" 
                      disabled={answeredCount < questions.length}
                    >
                      SUBMIT EXAM FOR SCORING
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* RESULTS SCREEN */
            <div className="quiz-results-card aura-card text-center">
              <div className={`result-badge-wrap ${quizResult?.passed ? 'pass' : 'fail'}`}>
                {quizResult?.passed ? <Award size={56} /> : <AlertCircle size={56} />}
              </div>

              <span className={`pill-badge ${quizResult?.passed ? 'accent' : 'dark'}`}>
                {quizResult?.passed ? 'EXAM PASSED (85%+ REQUIREMENT MET)' : 'NEEDS PRACTICE'}
              </span>

              <h2 className="results-score-title">
                Your Score: <span className="score-gold">{quizResult?.percentage}%</span> ({quizResult?.score} / {quizResult?.total})
              </h2>

              <p className="results-message">{quizResult?.message}</p>

              {/* Detailed Breakdown */}
              <div className="results-breakdown-list">
                <h4 className="breakdown-title">Review Itemized Explanations</h4>
                {quizResult?.results?.map((res: any, i: number) => (
                  <div key={i} className={`result-item-card ${res.isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="item-top">
                      <span className="item-num">Q{i + 1}. {res.question}</span>
                      <span className="item-status">
                        {res.isCorrect ? <CheckCircle2 size={16} className="green" /> : <XCircle size={16} className="red" />}
                      </span>
                    </div>
                    <div className="item-ans-row">
                      <span>Your Answer: <strong>{res.userAnswer}</strong></span>
                      {!res.isCorrect && <span>Correct Answer: <strong className="green">{res.correctAnswer}</strong></span>}
                    </div>
                    <p className="item-explanation">💡 <em>{res.explanation}</em></p>
                  </div>
                ))}
              </div>

              <div className="results-cta-actions">
                <Button onClick={handleRestart} variant="outline" size="lg" icon={<RefreshCw size={16} />}>
                  Retake Quiz
                </Button>
                <Button to="/book" variant="primary" size="lg" icon={<Car size={16} />}>
                  BOOK DRIVING LESSONS
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .quiz-card {
          padding: 2.25rem;
        }
        .quiz-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .quiz-progress-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.775rem;
          font-weight: 800;
          color: var(--accent-gold);
          letter-spacing: 0.04em;
        }
        .category-pill {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          background: #FAFAF8;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
          color: #07131D;
        }
        .quiz-progress-line-bg {
          width: 100%;
          height: 6px;
          background: #E2DFD6;
          border-radius: 99px;
          overflow: hidden;
          margin-bottom: 1.75rem;
        }
        .quiz-progress-line-fill {
          height: 100%;
          background: var(--accent-gold);
          border-radius: 99px;
          transition: width 0.3s ease;
        }

        .quiz-question-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: #07131D;
          line-height: 1.35;
          margin-bottom: 1.5rem;
        }

        .quiz-options-grid {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 2rem;
        }
        .quiz-option-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.05rem 1.35rem;
          background: #FAFAF8;
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .quiz-option-card:hover {
          border-color: var(--accent-gold);
          background: #FFFFFF;
        }
        .quiz-option-card.selected {
          border-color: #07131D;
          background: rgba(210, 176, 76, 0.15);
          box-shadow: 0 4px 14px rgba(7, 19, 29, 0.06);
        }
        .option-letter {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #07131D;
          color: #FFFFFF;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .quiz-option-card.selected .option-letter {
          background: var(--accent-gold);
          color: #07131D;
        }
        .option-text {
          font-size: 0.95rem;
          font-weight: 600;
          color: #07131D;
        }

        .quiz-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-light);
        }
        .answered-status {
          font-size: 0.825rem;
          color: #64748B;
          font-weight: 600;
        }
        .quiz-btn-actions {
          display: flex;
          gap: 0.6rem;
        }

        /* Results Screen */
        .quiz-results-card {
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .result-badge-wrap {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .result-badge-wrap.pass { background: rgba(210, 176, 76, 0.2); color: #B38E2A; }
        .result-badge-wrap.fail { background: rgba(239, 68, 68, 0.15); color: #EF4444; }

        .results-score-title {
          font-size: 2.2rem;
          margin-top: 0.85rem;
          margin-bottom: 0.5rem;
        }
        .score-gold {
          color: #B38E2A;
        }
        .results-message {
          font-size: 1.05rem;
          color: #64748B;
          margin-bottom: 2rem;
        }

        .results-breakdown-list {
          width: 100%;
          text-align: left;
          margin-bottom: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .breakdown-title {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-light);
        }
        .result-item-card {
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
          background: #FAFAF8;
          border: 1px solid var(--border-light);
        }
        .result-item-card.correct { border-left: 4px solid #16A34A; }
        .result-item-card.incorrect { border-left: 4px solid #EF4444; }
        .item-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.35rem;
        }
        .item-num {
          font-weight: 800;
          font-size: 0.925rem;
        }
        .item-ans-row {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          font-size: 0.85rem;
          color: #475569;
          margin-bottom: 0.4rem;
        }
        .green { color: #16A34A; }
        .red { color: #EF4444; }
        .item-explanation {
          font-size: 0.8rem;
          color: #64748B;
        }
        .results-cta-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
};
