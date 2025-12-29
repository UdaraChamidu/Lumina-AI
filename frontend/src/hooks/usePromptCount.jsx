import { useState, useEffect } from 'react';
import { Supabase } from '../lib/Supabase';

/**
 * Custom hook to fetch prompt count from Supabase
 * - For guests: fetches from guest_tracking table by fingerprint
 * - For logged-in users: fetches from user_stats table by user_id
 */
export const usePromptCount = (fingerprint, userId, session) => {
  const [promptCount, setPromptCount] = useState(0);
  const [maxPrompts, setMaxPrompts] = useState(5); // Default for guests
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPromptCount = async () => {
    if (!fingerprint && !userId) {
      console.log('[usePromptCount] No fingerprint or userId yet, skipping fetch');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Logged-in user: fetch from user_stats
      if (session && userId) {
        console.log('[usePromptCount] Fetching for logged-in user:', userId);
        setMaxPrompts(8); // Logged-in users get 8 prompts

        const { data, error: supabaseError } = await Supabase
          .from('user_stats')
          .select('prompt_count')
          .eq('user_id', userId)
          .maybeSingle(); // Use maybeSingle() to handle no results gracefully

        if (supabaseError) {
          console.error('[usePromptCount] Supabase error (user_stats):', supabaseError);
          throw supabaseError;
        }

        const count = data?.prompt_count || 0;
        console.log('[usePromptCount] User prompt count:', count);
        setPromptCount(count);
      } 
      // Guest user: fetch from guest_tracking
      else if (fingerprint) {
        console.log('[usePromptCount] Fetching for guest with fingerprint:', fingerprint);
        setMaxPrompts(5); // Guests get 5 prompts

        const { data, error: supabaseError } = await Supabase
          .from('guest_tracking')
          .select('prompt_count')
          .eq('fingerprint_id', fingerprint)
          .maybeSingle(); // Use maybeSingle() to handle no results gracefully

        if (supabaseError) {
          console.error('[usePromptCount] Supabase error (guest_tracking):', supabaseError);
          throw supabaseError;
        }

        const count = data?.prompt_count || 0;
        console.log('[usePromptCount] Guest prompt count:', count);
        setPromptCount(count);
      }
    } catch (err) {
      console.error('[usePromptCount] Error fetching prompt count:', err);
      setError(err.message);
      setPromptCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and when fingerprint/userId changes
  useEffect(() => {
    fetchPromptCount();

    // Set up real-time subscription to automatically update count
    let subscription = null;

    if (session && userId) {
      // Subscribe to user_stats changes for logged-in users
      console.log('[usePromptCount] Setting up real-time subscription for user:', userId);
      subscription = Supabase
        .channel(`user_stats_${userId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'user_stats',
            filter: `user_id=eq.${userId}`
          },
          (payload) => {
            console.log('[usePromptCount] Real-time update received:', payload);
            if (payload.new?.prompt_count !== undefined) {
              setPromptCount(payload.new.prompt_count);
            }
          }
        )
        .subscribe();
    } else if (fingerprint) {
      // Subscribe to guest_tracking changes for guests
      console.log('[usePromptCount] Setting up real-time subscription for fingerprint:', fingerprint);
      subscription = Supabase
        .channel(`guest_tracking_${fingerprint}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'guest_tracking',
            filter: `fingerprint_id=eq.${fingerprint}`
          },
          (payload) => {
            console.log('[usePromptCount] Real-time update received:', payload);
            if (payload.new?.prompt_count !== undefined) {
              setPromptCount(payload.new.prompt_count);
            }
          }
        )
        .subscribe();
    }

    // Cleanup subscription on unmount or when dependencies change
    return () => {
      if (subscription) {
        console.log('[usePromptCount] Cleaning up subscription');
        Supabase.removeChannel(subscription);
      }
    };
  }, [fingerprint, userId, session]);

  return {
    promptCount,
    maxPrompts,
    loading,
    error,
    refetchPromptCount: fetchPromptCount
  };
};
