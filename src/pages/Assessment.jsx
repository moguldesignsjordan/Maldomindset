import { useState } from 'react';
import { 
  ChevronRight, 
  TrendingUp, 
  Sparkles, 
  RefreshCw 
} from 'lucide-react';
import { ASSESSMENT_QUESTIONS } from '../constants/data';

export default function Assessment({ navigateToView }) {
  // State for Mindset Assessment
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [assessmentResult, setAssessmentResult] = useState(null);

  const handleSelectOption = (questionId, optionScore) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionScore
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const totalScore = Object.values(selectedAnswers).reduce((sum, score) => sum + score, 0);
    let archetype;
    let description;
    let recommendation;

    if (totalScore <= 7) {
      archetype = "The Developing Catalyst";
      description = "You are at the entry point of your mindset transformation. You have potential, but internal blocks, reactive habits, and self-doubt currently limit your trajectory.";
      recommendation = "Focus on small, daily microscopic habits. Start by building a morning routine of just 15 minutes of structured focus, and practice reframing failure as a lesson rather than a judgment.";
    } else if (totalScore <= 11) {
      archetype = "The Resilient Performer";
      description = "You possess strong drive and handle obstacles reasonably well. However, consistency under high stress remains a bottleneck, and your goals sometimes lack systems.";
      recommendation = "Establish hard boundaries. Create a weekly review session to align your micro-actions with your macro-vision. Introduce structured discipline routines that don't depend on raw motivation.";
    } else {
      archetype = "The Growth Architect";
      description = "You have developed an advanced growth mindset. You thrive on adversity, construct systematic habits, and view challenges as raw material for ascension.";
      recommendation = "Optimize for high leverage and flow states. Shift focus towards extreme mental clarity, delegation, and building legacy systems. Push your boundaries into elite-level cognitive performance.";
    }

    setAssessmentResult({
      score: totalScore,
      maxScore: ASSESSMENT_QUESTIONS.length * 3,
      archetype,
      description,
      recommendation
    });
  };

  const resetAssessment = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setAssessmentResult(null);
  };

  return (
    <section id="assessment" className="section assessment-page-section">
      <div className="section-header">
        <span className="section-subtitle">Interactive Audit</span>
        <h2 className="section-title">Assess Your Current Mindset</h2>
        <p className="section-desc">
          Discover your psychological bottlenecks. Answer these questions honestly to discover your mindset archetype and receive actionable feedback.
        </p>
      </div>

      <div className="assessment-card-container">
        {!assessmentResult ? (
          <div className="assessment-card" id="active-quiz-container">
            <div className="assessment-progress">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${((currentQuestionIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100}%` }}
              ></div>
              <span className="progress-text">Question {currentQuestionIndex + 1} of {ASSESSMENT_QUESTIONS.length}</span>
            </div>

            <h3 className="question-text">{ASSESSMENT_QUESTIONS[currentQuestionIndex].question}</h3>

            <div className="options-list">
              {ASSESSMENT_QUESTIONS[currentQuestionIndex].options.map((option, idx) => {
                const qId = ASSESSMENT_QUESTIONS[currentQuestionIndex].id;
                const isSelected = selectedAnswers[qId] === option.score;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(qId, option.score)}
                    className={`option-btn ${isSelected ? 'selected' : ''}`}
                    id={`opt-${qId}-${idx}`}
                  >
                    <span className="option-indicator"></span>
                    <span className="option-btn-text">{option.text}</span>
                  </button>
                );
              })}
            </div>

            <div className="assessment-nav">
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswers[ASSESSMENT_QUESTIONS[currentQuestionIndex].id] === undefined}
                className="assessment-next-btn"
                id="quiz-next-btn"
              >
                {currentQuestionIndex === ASSESSMENT_QUESTIONS.length - 1 ? 'Analyze Results' : 'Next Question'}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="assessment-result-card" id="quiz-result-container">
            <div className="result-header">
              <div className="result-badge">
                <TrendingUp size={20} />
                <span>Audit Complete</span>
              </div>
              <h3>Your Archetype:</h3>
              <h4 className="archetype-title gradient-text">{assessmentResult.archetype}</h4>
            </div>

            <div className="result-body">
              <div className="score-summary">
                <span className="score-value">{assessmentResult.score}</span>
                <span className="score-label">out of {assessmentResult.maxScore} points</span>
              </div>
              <p className="archetype-desc">{assessmentResult.description}</p>
              
              <div className="recommendation-box">
                <h5><Sparkles size={16} className="rec-icon" /> Actionable Recommendation:</h5>
                <p>{assessmentResult.recommendation}</p>
              </div>
            </div>

            <button 
              onClick={resetAssessment} 
              className="restart-btn"
              id="quiz-restart-btn"
            >
              <RefreshCw size={14} />
              Retake Assessment
            </button>
          </div>
        )}
      </div>
      
      <div className="page-back-nav flex-center" style={{ marginTop: '40px' }}>
        <button onClick={() => navigateToView('home')} className="secondary-btn go-back-home-btn">
          ← Back to Home
        </button>
      </div>
    </section>
  );
}
