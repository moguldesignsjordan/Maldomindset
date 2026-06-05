import { useState } from 'react';
import {
  ArrowRight,
  Zap,
  BrainCircuit,
  Target,
  ChevronRight
} from 'lucide-react';

export default function Home({ navigateToView }) {
  // State for FAQ Accordion
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaqIndex(prev => (prev === index ? null : index));
  };

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Master Your Mind.<br />
            <span className="gradient-text">Architect Your Legacy.</span>
          </h1>
          <p className="hero-description">
            MaldoMindset provides a systematic framework to break mental plateaus, build elite habits, and construct the discipline required for high-performance self-mastery.
          </p>
          <div className="hero-actions">
            <button
              onClick={() => navigateToView('assessment')}
              className="primary-btn"
              id="hero-assessment-cta"
            >
              Take Free Assessment
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigateToView('story')}
              className="secondary-btn"
              id="hero-story-cta"
            >
              Read Liss' Story
            </button>
          </div>
        </div>
      </section>


      {/* Portal Navigation Dashboard */}
      <section className="section home-portal-section">
        <div className="section-header">
          <span className="section-subtitle">Command Center</span>
          <h2 className="section-title">Navigate Your Mindset Shift</h2>
          <p className="section-desc">
            Select a protocol below to explore our core training areas, take the performance audit, or begin enrollment.
          </p>
        </div>

        <div className="home-portal-grid">
          <div className="portal-card glass-card" onClick={() => navigateToView('academy')}>
            <div className="portal-card-badge">PROGRAM</div>
            <div className="portal-card-header">
              <Zap size={24} className="portal-card-icon academy-color" />
              <h3>90-Day Challenge Academy</h3>
            </div>
            <p>The structured accelerator to eliminate vices, build military-grade discipline, and launch an online personal brand.</p>
            <button className="portal-card-btn">
              Explore Program <ChevronRight size={16} />
            </button>
          </div>

          <div className="portal-card glass-card" onClick={() => navigateToView('assessment')}>
            <div className="portal-card-badge">AUDIT</div>
            <div className="portal-card-header">
              <BrainCircuit size={24} className="portal-card-icon assessment-color" />
              <h3>Mindset Assessment</h3>
            </div>
            <p>Uncover your subconscious bottlenecks. Answer 5 performance-focused questions to receive your mindset archetype.</p>
            <button className="portal-card-btn">
              Start Assessment <ChevronRight size={16} />
            </button>
          </div>

          <div className="portal-card glass-card" onClick={() => navigateToView('story')}>
            <div className="portal-card-badge">BIOGRAPHY</div>
            <div className="portal-card-header">
              <Target size={24} className="portal-card-icon story-color" />
              <h3>Founder's Story</h3>
            </div>
            <p>Learn how Liss Almonte (Baldo Mindset) dropped out of school, overcame extreme debt and vices, and rebuilt himself.</p>
            <button className="portal-card-btn">
              Read Bio <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section">
        <div className="video-container glass-card">
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube-nocookie.com/embed/KwdXk5LH6po"
              title="Baldo Mindset 90-Day Challenge Blueprint"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Academy CTA Section */}
      <section className="section academy-cta-section">
        <div className="cta-glass-box glass-card">
          <div className="cta-glow-overlay"></div>
          <div className="cta-content">
            <span className="cta-subtitle">ARE YOU READY TO BURN THE SHIPS?</span>
            <h2 className="cta-title">Join The 90-Day Challenge Academy Today</h2>
            <p className="cta-description">
              Eliminate vices, build military-grade discipline, reprogram your psychology, and construct a highly profitable personal brand from scratch.
            </p>
            <button
              onClick={() => navigateToView('academy')}
              className="primary-btn cta-btn-large"
              id="home-academy-cta-btn"
            >
              Apply & Enroll Now
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="section-header">
          <span className="section-subtitle">Common Inquiries</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-desc">
            Everything you need to know about the 90-Day Challenge Academy and our mindset coaching methodology.
          </p>
        </div>

        <div className="faq-list">
          {[
            {
              question: "What is the 90-Day Challenge Academy?",
              answer: "It is an elite, structured mentorship program led by Liss Almonte (Baldo Mindset) designed to help you eliminate bad habits, establish discipline, reprogram your mindset, and build a profitable online brand."
            },
            {
              question: "Who is this program for?",
              answer: "It is for driven individuals who feel stuck, lack consistent discipline, suffer from distractions, or want to launch and scale their own passion-based online businesses from the ground up."
            },
            {
              question: "How much time does this require daily?",
              answer: "The program is designed to integrate into your life, but it requires a dedicated commitment of at least 1–2 hours daily to complete mindset protocols, physical routines, and branding blueprints."
            },
            {
              question: "How do the weekly live mentorship calls work?",
              answer: "Every week, Liss Almonte conducts live group mentorship sessions with students to check progress, resolve bottlenecks, and review business scaling structures. All sessions are recorded."
            },
            {
              question: "Is there a guarantee or refund policy?",
              answer: "Because spots are highly limited and Liss Almonte works closely with each student to build customized blueprints, enrollment is selective. We ask that you apply only if you are fully committed to burning the ships."
            }
          ].map((faq, index) => {
            const isOpen = activeFaqIndex === index;
            return (
              <div
                key={index}
                className={`faq-item glass-card ${isOpen ? 'open' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <h4>{faq.question}</h4>
                  <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                </div>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
