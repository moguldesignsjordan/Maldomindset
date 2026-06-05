import founderImg from '../assets/founder.png';

export default function Story({ navigateToView }) {
  return (
    <section id="story" className="section founder-page-section">
      <div className="section-header">
        <span className="section-subtitle">About me</span>
        <h2 className="section-title">Meet Baldo Mindset</h2>
        <p className="section-desc">
          The journey from dropping out and hitting absolute rock bottom to building an elite performance lifestyle.
        </p>
      </div>

      <div className="founder-grid">
        {/* Left Side: Portrait Card */}
        <div className="founder-visual-card">
          <div className="founder-glow-backdrop"></div>
          <div className="founder-image-frame">
            <img src={founderImg} alt="Liss Almonte - Baldo Mindset" className="founder-portrait-img" />
          </div>
        </div>

        {/* Right Side: Story Card */}
        <div className="founder-story-card glass-card">
          <h3 className="founder-name">Liss Almonte</h3>
          <span className="founder-title">Founder of MaldoMindset</span>

          <p className="founder-narrative">
            In 2020, I decided to burn the ships to leave no turning back and dropped out of school during my final year. I wanted to forge my own path.
          </p>

          <div className="founder-quote">
            <p>
              "By 2025, I had hit rock bottom: trapped in vices like marijuana, pills, Molly, alcohol, and distractions. On top of that, I was over a million in debt and going through a divorce that completely shattered me."
            </p>
          </div>

          <p className="founder-narrative">
            Then I decided to change everything. I kicked my vices, completely reprogrammed my mindset, and rebuilt my psychology from scratch. Today, at 26, I’m living the life I once thought was impossible and have built the business of my dreams.
          </p>

          <div className="founder-mission-box">
            <h4>My Purpose Is Clear:</h4>
            <p>
              To help you do the same break free from your vices, wake up, and build the best version of yourself. I want to show you that it is possible to quit your job, build your personal brand from the ground up, and achieve high-performance self-mastery.
            </p>
          </div>
        </div>
      </div>

      <div className="page-back-nav flex-center">
        <button onClick={() => navigateToView('home')} className="secondary-btn go-back-home-btn">
          ← Back to Home
        </button>
      </div>
    </section>
  );
}
