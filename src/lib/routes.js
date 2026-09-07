// The app renders one view at a time from state. These paths give every view a
// real URL so pages can be linked, shared, bookmarked and opened in a new tab.
export const VIEW_PATHS = {
  home: '/',
  story: '/story',
  challenge: '/90-day-challenge',
  academy: '/academy',
  assessment: '/assessment',
  boost: '/daily-boost',
  checkout: '/checkout',
  'challenge-checkout': '/90-day-challenge/checkout',
  login: '/login',
  dashboard: '/dashboard',
  admin: '/admin',
};

const PATH_VIEWS = Object.fromEntries(
  Object.entries(VIEW_PATHS).map(([view, path]) => [path, view])
);

export function pathForView(view) {
  return VIEW_PATHS[view] || '/';
}

// Unknown paths fall back to home rather than rendering nothing
export function viewForPath(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return PATH_VIEWS[clean] || 'home';
}
