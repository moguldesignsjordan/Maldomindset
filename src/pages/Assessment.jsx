import { useState } from 'react';
import { 
  ChevronRight, 
  TrendingUp, 
  Sparkles, 
  RefreshCw 
} from 'lucide-react';

import { TRANSLATIONS, LOCALIZED_QUESTIONS } from '../constants/translations';

export default function Assessment({ navigateToView, language = 'en' }) {
  // State for Mindset Assessment
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [assessmentResult, setAssessmentResult] = useState(null);

  const activeQuestions = LOCALIZED_QUESTIONS[language] || LOCALIZED_QUESTIONS.en;
  const t = TRANSLATIONS[language];

  const handleSelectOption = (questionId, optionScore) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionScore
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const totalScore = Object.values(selectedAnswers).reduce((sum, score) => sum + score, 0);
    let archKey;

    if (totalScore <= 7) {
      archKey = "reactant";
    } else if (totalScore <= 11) {
      archKey = "visionary";
    } else {
      archKey = "executioner";
    }

    const archObj = t.archetypes[archKey];

    setAssessmentResult({
      score: totalScore,
      maxScore: activeQuestions.length * 3,
      archetype: archObj.name,
      description: archObj.desc,
      recommendation: language === 'es'
        ? (totalScore <= 7 
            ? "Enfócate en hábitos diarios microscópicos. Comienza construyendo una rutina matutina de solo 15 minutos de enfoque estructurado, y practica reformular el fracaso como una lección." 
            : totalScore <= 11 
              ? "Establece límites firmes. Crea una sesión de revisión semanal para alinear tus micro-acciones con tu macro-visión. Introduce rutinas de disciplina estructurada." 
              : "Optimiza para un alto apalancamiento y estados de flujo. Cambia el enfoque hacia una claridad mental extrema, delegación y construcción de sistemas heredados.")
        : (totalScore <= 7 
            ? "Focus on small, daily microscopic habits. Start by building a morning routine of just 15 minutes of structured focus, and practice reframing failure as a lesson." 
            : totalScore <= 11 
              ? "Establish hard boundaries. Create a weekly review session to align your micro-actions with your macro-vision. Introduce structured discipline routines." 
              : "Optimize for high leverage and flow states. Shift focus towards extreme mental clarity, delegation, and building legacy systems.")
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
        <span className="section-subtitle">{t.assessSubtitle}</span>
        <h2 className="section-title">{t.assessTitle}</h2>
        <p className="section-desc">
          {t.assessDesc}
        </p>
      </div>

      <div className="assessment-card-container">
        {!assessmentResult ? (
          <div className="assessment-card" id="active-quiz-container">
            <div className="assessment-progress">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%` }}
              ></div>
              <span className="progress-text">
                {t.questionLabel} {currentQuestionIndex + 1} {t.ofLabel} {activeQuestions.length}
              </span>
            </div>

            <h3 className="question-text">{activeQuestions[currentQuestionIndex].question}</h3>

            <div className="options-list">
              {activeQuestions[currentQuestionIndex].options.map((option, idx) => {
                const qId = activeQuestions[currentQuestionIndex].id;
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
                disabled={selectedAnswers[activeQuestions[currentQuestionIndex].id] === undefined}
                className="assessment-next-btn"
                id="quiz-next-btn"
              >
                {currentQuestionIndex === activeQuestions.length - 1 
                  ? (language === 'es' ? 'Analizar Resultados' : 'Analyze Results') 
                  : (language === 'es' ? 'Siguiente Pregunta' : 'Next Question')}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="assessment-result-card" id="quiz-result-container">
            <div className="result-header">
              <div className="result-badge">
                <TrendingUp size={20} />
                <span>{language === 'es' ? 'Auditoría Completada' : 'Audit Complete'}</span>
              </div>
              <h3>{t.archetypeLabel}</h3>
              <h4 className="archetype-title gradient-text">{assessmentResult.archetype}</h4>
            </div>

            <div className="result-body">
              <div className="score-summary">
                <span className="score-value">{assessmentResult.score}</span>
                <span className="score-label">
                  {language === 'es' ? `de ${assessmentResult.maxScore} puntos` : `out of ${assessmentResult.maxScore} points`}
                </span>
              </div>
              <p className="archetype-desc">{assessmentResult.description}</p>
              
              <div className="recommendation-box">
                <h5><Sparkles size={16} className="rec-icon" /> {language === 'es' ? 'Recomendación Práctica:' : 'Actionable Recommendation:'}</h5>
                <p>{assessmentResult.recommendation}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
              <button 
                onClick={resetAssessment} 
                className="restart-btn"
                id="quiz-restart-btn"
                style={{ margin: 0 }}
              >
                <RefreshCw size={14} />
                {t.btnRestart}
              </button>
              <button 
                onClick={() => navigateToView('academy')} 
                className="primary-btn"
                id="quiz-checkout-cta"
                style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '8px' }}
              >
                {t.assessCheckoutCTA}
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="page-back-nav flex-center" style={{ marginTop: '40px' }}>
        <button onClick={() => navigateToView('home')} className="secondary-btn go-back-home-btn">
          {t.backToHome}
        </button>
      </div>
    </section>
  );
}
