import { Fragment, useState } from 'react';
import { Check, Minus, ArrowRight, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../constants/translations';
import { useMediaQuery } from '../lib/useMediaQuery';

/*
 * DIRECTION CONTRACT — Academy surface (seed d4c49579, form "The Matrix", 2 of 7)
 *
 * THESIS: The upgrade path between three programs is the page's real content.
 *   Refuses the three same-size pricing cards that make tiers look parallel
 *   rather than cumulative.
 * OWN-WORLD: Inherited, unchanged — #0d0d0d ground, #161616 panels, hairline
 *   rules, one cyan accent. Recognizable by the ruled matrix and the single
 *   raised column, not by new ornament.
 * STORY: A visitor sees every capability at once, reads down a column to find
 *   where their money stops, and enrolls from the row they stopped on.
 * FIRST VIEWPORT: Heading and one line of lead, then the sticky program header
 *   with three names and prices, the middle column raised. Feature groups run
 *   beneath; CTAs sit in the table foot; the video sits below as proof.
 * FORM: Comparison matrix, structure locked by the user on the decision page.
 * FINISH: unreviewed and undocumented is unfinished; this build ends with the
 *   finish review, the verdict, DESIGN.md, and every shipping raster carrying
 *   its provenance.
 */

const CHANNEL_ID = 'UCQNVnq0GC66_cUWeBStgdzw';
const UPLOADS_PLAYLIST_ID = `UU${CHANNEL_ID.slice(2)}`;

export default function Academy({ navigateToView, language = 'en', setSelectedTier }) {
  const t = TRANSLATIONS[language];
  const [activeTier, setActiveTier] = useState(null);

  // Three columns cannot hold their labels on a phone, so the same matrix
  // linearizes into one block per program. Every capability still shows its
  // check or dash; nothing is summarized away or hidden behind a tap.
  const isNarrow = useMediaQuery('(max-width: 720px)');

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

  const programs = t.programs;
  const colProps = (id) => ({
    onMouseEnter: () => setActiveTier(id),
    onMouseLeave: () => setActiveTier(null),
  });
  const cellClass = (program) =>
    [
      'matrix-cell',
      program.popular ? 'featured' : '',
      activeTier === program.id ? 'active' : '',
    ]
      .filter(Boolean)
      .join(' ');

  return (
    <div className="academy-page-wrapper">
      <section id="programs" className="section academy-matrix-section">
        <div className="matrix-intro">
          <h2 className="matrix-title">{t.programsTitle}</h2>
          <p className="matrix-lead">{t.programsDesc}</p>
        </div>

        {isNarrow ? (
          <div className="matrix-stack">
            {programs.map((program) => (
              <article
                key={program.id}
                className={`matrix-stack-card ${program.popular ? 'featured' : ''}`}
              >
                <header className="matrix-stack-head">
                  {program.popular && (
                    <span className="matrix-flag">
                      <Sparkles size={11} /> {t.programsMostPopular}
                    </span>
                  )}
                  <h3 className="matrix-program-name">{program.name}</h3>
                  <span className="matrix-price">{program.price}</span>
                  <span className="matrix-price-note">{program.priceNote}</span>
                </header>

                {t.programGroups.map((group) => (
                  <div key={group.title} className="matrix-stack-group">
                    <h4>{group.title}</h4>
                    <ul>
                      {group.rows.map((row) => {
                        const included = row.in.includes(program.id);
                        return (
                          <li key={row.label} className={included ? 'yes' : 'no'}>
                            {included ? (
                              <Check size={16} className="matrix-yes" aria-hidden="true" />
                            ) : (
                              <Minus size={14} className="matrix-no" aria-hidden="true" />
                            )}
                            <span>{row.label}</span>
                            <span className="visually-hidden">
                              {included ? t.programsIncluded : t.programsNotIncluded}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}

                <p className="matrix-who-text">{program.bestFor}</p>

                <button
                  onClick={() => goToCheckout(program.id)}
                  className={program.popular ? 'primary-btn matrix-cta' : 'secondary-btn matrix-cta'}
                >
                  {t.programsCta}
                  <ArrowRight size={15} />
                </button>
                {program.id === 'mindset' && (
                  <button onClick={() => navigateToView('challenge')} className="matrix-details-link">
                    {language === 'es' ? 'Ver detalles' : 'See details'}
                  </button>
                )}
              </article>
            ))}
          </div>
        ) : (
        <div className="matrix-scroll">
          <table className="program-matrix">
            <caption className="visually-hidden">{t.programsMatrixCaption}</caption>

            <thead>
              <tr>
                <th scope="col" className="matrix-corner">
                  <span className="visually-hidden">{t.programsIncludesLabel}</span>
                </th>
                {programs.map((program) => (
                  <th
                    key={program.id}
                    scope="col"
                    className={cellClass(program)}
                    {...colProps(program.id)}
                  >
                    {program.popular && (
                      <span className="matrix-flag">
                        <Sparkles size={11} /> {t.programsMostPopular}
                      </span>
                    )}
                    <span className="matrix-program-name">{program.name}</span>
                    <span className="matrix-price">{program.price}</span>
                    <span className="matrix-price-note">{program.priceNote}</span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {t.programGroups.map((group) => (
                <Fragment key={group.title}>
                  <tr className="matrix-group-row">
                    <th scope="row">{group.title}</th>
                    {/* empty cells keep the featured column unbroken down the table */}
                    {programs.map((program) => (
                      <td key={program.id} className={cellClass(program)} {...colProps(program.id)} />
                    ))}
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row" className="matrix-row-label">{row.label}</th>
                      {programs.map((program) => {
                        const included = row.in.includes(program.id);
                        return (
                          <td
                            key={program.id}
                            className={cellClass(program)}
                            {...colProps(program.id)}
                          >
                            {included ? (
                              <Check size={17} className="matrix-yes" aria-hidden="true" />
                            ) : (
                              <Minus size={15} className="matrix-no" aria-hidden="true" />
                            )}
                            <span className="visually-hidden">
                              {included ? t.programsIncluded : t.programsNotIncluded}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </Fragment>
              ))}

              <tr className="matrix-who-row">
                <th scope="row" className="matrix-row-label">{t.programsWhoFor}</th>
                {programs.map((program) => (
                  <td key={program.id} className={cellClass(program)} {...colProps(program.id)}>
                    <span className="matrix-who-text">{program.bestFor}</span>
                  </td>
                ))}
              </tr>
            </tbody>

            <tfoot>
              <tr>
                <td className="matrix-corner" />
                {programs.map((program) => (
                  <td key={program.id} className={cellClass(program)} {...colProps(program.id)}>
                    <button
                      onClick={() => goToCheckout(program.id)}
                      className={program.popular ? 'primary-btn matrix-cta' : 'secondary-btn matrix-cta'}
                    >
                      {t.programsCta}
                      <ArrowRight size={15} />
                    </button>
                    {program.id === 'mindset' && (
                      <button
                        onClick={() => navigateToView('challenge')}
                        className="matrix-details-link"
                      >
                        {language === 'es' ? 'Ver detalles' : 'See details'}
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
        )}

        <p className="matrix-footnote">{t.programsFootnote}</p>
      </section>

      <section className="section academy-video-section">
        <div className="matrix-intro">
          <h2 className="matrix-title">{t.academyVideoTitle}</h2>
          <p className="matrix-lead">{t.academyVideoDesc}</p>
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

      <div className="page-back-nav flex-center" style={{ paddingBottom: '60px' }}>
        <button onClick={() => navigateToView('home')} className="secondary-btn go-back-home-btn">
          {t.backToHome}
        </button>
      </div>
    </div>
  );
}
