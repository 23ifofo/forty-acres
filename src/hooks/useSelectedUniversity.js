import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import universitiesConfig from '../config/universities.json';

export default function useSelectedUniversity() {
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const location = useLocation();

  const resolveSelected = () => {
    try {
      const raw = localStorage.getItem('selectedUniversity');
      if (raw) {
        const parsed = JSON.parse(raw);
        // If parsed has a slug/key, try to merge with config entry to ensure full contact info
        const key = parsed?.slug || parsed?.id || parsed?.key;
        if (key) {
          const cfg = (universitiesConfig?.universities && (universitiesConfig.universities[key] || Object.values(universitiesConfig.universities).find(u => u?.id === key))) || null;
          setSelectedUniversity({ ...(cfg || {}), ...parsed });
          return;
        }
        setSelectedUniversity(parsed);
        return;
      }

      // If not in localStorage, try to read ?university=<key> from URL and resolve from config
      const params = new URLSearchParams(window.location.search);
      const uniParam = params.get('university');
      if (uniParam) {
        const cfg = universitiesConfig?.universities?.[uniParam] || Object.values(universitiesConfig?.universities || {}).find(u => u?.id === uniParam);
        if (cfg) {
          localStorage.setItem('selectedUniversity', JSON.stringify({ slug: uniParam, ...cfg }));
          setSelectedUniversity({ slug: uniParam, ...cfg });
          return;
        }
      }

      // as last resort, leave null
      setSelectedUniversity(null);
    } catch (e) {
      setSelectedUniversity(null);
    }
  };

  useEffect(() => {
    // Resolve once on mount and whenever the location (query params) changes
    resolveSelected();

    // Listen for storage events (other tabs) and window focus so same-tab updates are picked up
    const onStorage = (e) => {
      if (!e || e.key === 'selectedUniversity' || !e.key) {
        resolveSelected();
      }
    };

    const onFocus = () => resolveSelected();

    // Custom event for same-tab setItem usage
    const onSelectedUniversityChanged = () => resolveSelected();

    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', onFocus);
    window.addEventListener('selectedUniversityChanged', onSelectedUniversityChanged);
    // also handle popstate/hashchange for non-react router navigations
    window.addEventListener('popstate', resolveSelected);
    window.addEventListener('hashchange', resolveSelected);

    // Monkey-patch localStorage.setItem to emit an event so same-tab updates are picked up immediately
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      originalSetItem.apply(this, [key, value]);
      try {
        // Dispatch a namespaced event for consumers to pick up
        window.dispatchEvent(new Event('selectedUniversityChanged'));
      } catch (e) {
        // ignore
      }
    };

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('selectedUniversityChanged', onSelectedUniversityChanged);
      window.removeEventListener('popstate', resolveSelected);
      window.removeEventListener('hashchange', resolveSelected);
      // restore original
      try { Storage.prototype.setItem = originalSetItem; } catch (e) { /* ignore */ }
    };
  }, [location.search]);

  return selectedUniversity;
}
