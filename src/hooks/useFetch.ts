import { useEffect, useState } from 'react';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error('Error en la petición');
        }

        const json = (await response.json()) as T;
        setData(json);
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === 'AbortError') {
          return;
        }

        setError(fetchError instanceof Error ? fetchError.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    void loadData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}
