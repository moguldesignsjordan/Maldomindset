import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../constants/translations';

/*
 * DIRECTION CONTRACT — Academy surface (seed d4c49579, form "The Prospectus")
 *
 * THESIS: An academy publishes a curriculum, not a feature comparison. Each
 *   program is a track with a syllabus you can read; the tiers stack, so each
 *   track opens by naming what it inherits. Refuses the pricing grid.
 * OWN-WORLD: Inherited, unchanged — #0d0d0d ground, #161616 panels, hairline
 *   rules, one cyan accent, the Expose display face. Recognizable by the
 *   number-and-rule track headers and the ruled syllabus, not new ornament.
 * STORY: A visitor reads the tracks in order, sees each one absorb the last,
 *   and enrolls from the track whose curriculum matches their ambition.
 * FIRST VIEWPORT: Heading and one line of lead, then Track 01 opening full
 *   width: a sticky identity rail on the left holding number, name, price and
 *   the action, its curriculum ruled out to the right.
 * FORM: Editorial prospectus, chosen after the user asked for less grid and
 *   more academy.
 * FINISH: unreviewed and undocumented is unfinished; this build ends with the
 *   finish review, the verdict, DESIGN.md, and every shipping raster carrying
 *   its provenance.
 */

const CHANNEL_ID = 'UCQNVnq0GC66_cUWeBStgdzw';
const UPLOADS_PLAYLIST_ID = `UU${CHANNEL_ID.slice(2)}`;

export default function Academy({ navigateToView, language = 'en', setSelectedTier }) {
  const t = TRANSLATIONS[language];
  const programs = t.programs;

  // The 90-Day Challenge has its own page and single-product checkout;
  // the other programs go through the multi-tier Academy checkout.
  const goToCheckout = (tierId) => {
    if (tierId === 'mindset') {
      navigateToView('challenge-checkout');
      return;
    }
    if (setSelectedTier) setSelectedTier(tierId);
    navigateToView('checkout');
  };

  // Each track lists its own curriculum in full. Tracks after the first open by
  // naming the one they absorb, which is what makes the ladder legible without
  // a comparison grid.
  const curriculumFor = (tierId, previousId) =>
    t.programGroups
      .map((group) => ({
        title: group.title,
        rows: group.rows
          .filter((row) => row.in.includes(tierId))
          .map((row) => ({
            ...row,
            isNew: previousId ? !row.in.includes(previousId) : false,
          })),
      }))
      .filter((group) => group.rows.length > 0);

  return (
    <div className="academy-page-wrapper">
      <section id="programs" className="section academy-tracks-section">
        <div className="tracks-intro">
          <h2 className="tracks-title">{t.programsTitle}</h2>
          <p className="tracks-lead">{t.programsDesc}</p>
        </div>

        <div className="tracks">
          {programs.map((program, index) => {
            const previous = programs[index - 1];
            return (
              <article
                key={program.id}
                className={`track ${program.popular ? 'featured' : ''}`}
              >
                <div className="track-rail">
                  <div className="track-marker">
                    <span className="track-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="track-label">{t.trackLabel}</span>
                  </div>

                  {program.popular && (
                    <span className="track-flag">
                      <Sparkles size={11} /> {t.programsMostPopular}
                    </span>
                  )}

                  <h3 className="track-name">{program.name}</h3>
                  <p className="track-tagline">{program.tagline}</p>

                  <dl className="track-facts">
                    {program.duration && (
                      <div>
                        <dt>{t.trackDurationLabel}</dt>
                        <dd>{program.duration}</dd>
                      </div>
                    )}
                    <div>
                      <dt>{t.trackFormatLabel}</dt>
                      <dd>{program.format}</dd>
                    </div>
                  </dl>

                  <p className="track-price">
                    {program.price}
                    <span className="track-price-note">{program.priceNote}</span>
                  </p>

                  <button
                    onClick={() => goToCheckout(program.id)}
                    className={program.popular ? 'primary-btn track-cta' : 'secondary-btn track-cta'}
                  >
                    {t.trackEnroll}
                    <ArrowRight size={15} />
                  </button>

                  {program.id === 'mindset' && (
                    <button
                      onClick={() => navigateToView('challenge')}
                      className="track-details-link"
                    >
                      {t.programsSeeDetails}
                    </button>
                  )}
                </div>

                <div className="track-body">
                  {previous && (
                    <p className="track-inherits">
                      {t.trackBuildsOn} <strong>{previous.name}</strong>.
                    </p>
                  )}

                  <h4 className="track-curriculum-label">{t.trackCurriculum}</h4>

                  {curriculumFor(program.id, previous?.id).map((group) => (
                    <section key={group.title} className="track-group">
                      <h5>{group.title}</h5>
                      <ul>
                        {group.rows.map((row) => (
                          <li key={row.label} className={row.isNew ? 'is-new' : ''}>
                            <Check size={15} aria-hidden="true" />
                            <span>
                              {row.label}
                              {row.isNew && <span className="track-new-tag">{t.trackNewLabel}</span>}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}

                  <p className="track-who">{program.bestFor}</p>
                </div>
              </article>
            );
          })}
        </div>

        <p className="tracks-footnote">{t.programsFootnote}</p>
      </section>

      <section className="section academy-video-section">
        <div className="video-intro">
          <h2 className="video-title">{t.academyVideoTitle}</h2>
          <p className="tracks-lead">{t.academyVideoDesc}</p>
        </div>
        <div className="academy-video-wrapper">
          <div className="academy-video-card landscape">
            <div className="landscape-video-container">
              <iframe
                src={`https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}&rel=0`}
                title={t.academyVideoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <div className="page-back-nav flex-center" style={{ paddingBottom: '40px' }}>
        <button onClick={() => navigateToView('home')} className="secondary-btn go-back-home-btn">
          {t.backToHome}
        </button>
      </div>
    </div>
  );
}
