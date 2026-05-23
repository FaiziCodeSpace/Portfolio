"use client";

import { useState, useCallback } from "react";

export function useFormSubmit(endpoint, { onSuccess, onError } = {}) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(
    async (data) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(endpoint, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(data),
        });

        const json = await res.json().catch(() => ({}));

        if (!res.ok) {
          const message = json.error ?? "Something went wrong. Please try again.";
          setError(message);
          onError?.(message);
          return;
        }

        setSuccess(true);
        onSuccess?.();
      } catch {
        const message = "Network error. Please check your connection.";
        setError(message);
        onError?.(message);
      } finally {
        setLoading(false);
      }
    },
    [endpoint, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return { loading, error, success, submit, reset };
}