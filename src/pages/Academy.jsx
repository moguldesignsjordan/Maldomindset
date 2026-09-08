import { useState } from 'react';
import { Check, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { TRANSLATIONS } from '../constants/translations';

/*
 * DIRECTION CONTRACT — Academy surface (seed d4c49579, form "The Enrollment")
 *
 * THESIS: This page sells a decision, not a specification. The film carries the
 *   promise, three cards carry the choice, and the full curriculum waits behind
 *   a disclosure for the people who want to read it. Refuses the spec sheet.
 * OWN-WORLD: Inherited, unchanged — #0d0d0d ground, #161616 panels, hairline
 *   rules, one cyan accent, the Expose display face.
 * STORY: A visitor watches, understands what enrolling involves in three
 *   beats, compares three tracks at a glance, and enrols from the card.
 * FIRST VIEWPORT: Title and one line of lead over a full-width 16:9 film. The
 *   choice begins immediately under it.
 * FORM: Enrollment page, chosen after the user asked for something engaging
 *   rather than informative, with the video leading.
 * FINISH: unreviewed and undocumented is unfinished; this build ends with the
 *   finish review, the verdict, DESIGN.md, and every shipping raster carrying
 *   its provenance.
 */

const CHANNEL_ID = 'UCQNVnq0GC66_cUWeBStgdzw';
const UPLOADS_PLAYLIST_ID = `UU${CHANNEL_ID.slice(2)}`;

export default function Academy({ navigateToView, language = 'en', setSelectedTier }) {
  const t = TRANSLATIONS[language];
  const programs = t.programs;

  // The full curriculum stays on the page, one disclosure away, so the card
  // can lead with the promise instead of the specification.
  const [openCurriculum, setOpenCurriculum] = useState(null);

  const goToCheckout = (tierId) => {
    if (tierId === 'mindset') {
      navigateToView('challenge-checkout');
      return;
    }
    if (setSelectedTier) setSelectedTier(tierId);
    navigateToView('checkout');
  };

  const curriculumFor = (tierId) =>
    t.programGroups
      .map((group) => ({
        title: group.title,
        rows: group.rows.filter((row) => row.in.includes(tierId)),
      }))
      .filter((group) => group.rows.length > 0);

  return (
    <div className="academy-page-wrapper">
      {/* Film leads the page */}
      <section className="section academy-hero">
        <div className="academy-hero-intro">
          <h1 className="academy-hero-title">{t.academyHeroTitle}</h1>
          <p className="academy-hero-lead">{t.academyHeroLead}</p>
        </div>
        <div className="academy-hero-film">
          <iframe
            src={`https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}&rel=0`}
            title={t.academyVideoTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* The choice */}
      <section id="programs" className="section academy-choose">
        <h2 className="academy-section-title">{t.academyChooseTitle}</h2>

        <div className="enroll-cards">
          {programs.map((program) => {
            const open = openCurriculum === program.id;
            return (
              <article
                key={program.id}
                className={`enroll-card ${program.popular ? 'featured' : ''}`}
              >
                {program.popular && (
                  <span className="enroll-flag">
                    <Sparkles size={11} /> {t.programsMostPopular}
                  </span>
                )}

                <h3 className="enroll-name">{program.name}</h3>
                <p className="enroll-format">
                  {program.format}
                  {program.duration && <span> · {program.duration}</span>}
                </p>
                <p className="enroll-tagline">{program.tagline}</p>

                <p className="enroll-price">
                  {program.price}
                  <span className="enroll-price-note">{program.priceNote}</span>
                </p>

                <button
                  onClick={() => goToCheckout(program.id)}
                  className={program.popular ? 'primary-btn enroll-cta' : 'secondary-btn enroll-cta'}
                >
                  {t.trackEnroll}
                  <ArrowRight size={15} />
                </button>

                <p className="enroll-highlights-label">{t.trackHighlightsLabel}</p>
                <ul className="enroll-highlights">
                  {program.highlights.map((item) => (
                    <li key={item}>
                      <Check size={15} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="enroll-disclosure"
                  aria-expanded={open}
                  onClick={() => setOpenCurriculum(open ? null : program.id)}
                >
                  {open ? t.trackHideCurriculum : t.trackFullCurriculum}
                  <ChevronDown size={14} className={open ? 'open' : ''} />
                </button>

                {open && (
                  <div className="enroll-curriculum">
                    {curriculumFor(program.id).map((group) => (
                      <section key={group.title}>
                        <h4>{group.title}</h4>
                        <ul>
                          {group.rows.map((row) => (
                            <li key={row.label}>
                              <Check size={13} aria-hidden="true" />
                              <span>{row.label}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                )}

                {program.id === 'mindset' && (
                  <button
                    onClick={() => navigateToView('challenge')}
                    className="enroll-details-link"
                  >
                    {t.programsSeeDetails}
                  </button>
                )}
              </article>
            );
          })}
        </div>

        <p className="enroll-footnote">{t.programsFootnote}</p>
      </section>

      <div className="page-back-nav flex-center" style={{ paddingBottom: '40px' }}>
        <button onClick={() => navigateToView('home')} className="secondary-btn go-back-home-btn">
          {t.backToHome}
        </button>
      </div>
    </div>
  );
}
