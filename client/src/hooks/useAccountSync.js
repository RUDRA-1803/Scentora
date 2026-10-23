import { useEffect, useRef } from 'react';

/**
 * Keeps a piece of browser state (cart, wishlist) in sync with the signed-in user's account.
 *
 * - On sign-in: loads the server copy, merges it with what the guest collected, and saves the result.
 * - On session restore (page reload): replaces the browser copy with the server copy.
 * - While signed in: saves every change.
 * - On sign-out: resets the state so the next visitor starts empty.
 */
export const useAccountSync = ({ user, value, setValue, load, save, merge, empty }) => {
  const syncedUserId = useRef(null);
  const previousUserId = useRef(user?.id ?? null);
  const userId = user?.id ?? null;

  // Sign-in / sign-out transitions
  useEffect(() => {
    const hadUser = previousUserId.current;
    previousUserId.current = userId;

    if (!userId) {
      syncedUserId.current = null;
      if (hadUser) setValue(empty);
      return undefined;
    }

    // Only a guest signing in has browser state worth merging. When a session is restored
    // on reload (or accounts are switched), the browser copy just mirrors an account, so
    // merging it would double every quantity — take the server copy instead.
    const isGuestSignIn = !hadUser;

    let cancelled = false;
    load()
      .then((serverValue) => {
        if (cancelled) return;
        // Mark synced before the state update so the save effect pushes the result
        syncedUserId.current = userId;
        setValue((localValue) => (isGuestSignIn ? merge(serverValue, localValue) : serverValue));
      })
      .catch((error) => {
        console.warn('Could not load saved account data:', error.message);
        if (!cancelled) syncedUserId.current = userId;
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Persist changes while signed in
  useEffect(() => {
    if (!userId || syncedUserId.current !== userId) return;
    save(value).catch((error) => console.warn('Could not save account data:', error.message));
  }, [value, userId]);
};

export default useAccountSync;
