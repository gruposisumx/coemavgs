import { useEffect, useState } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface UseSupabaseQueryResult<T> {
  data: T[] | null;
  error: PostgrestError | null;
  loading: boolean;
  refetch: () => Promise<void>;
}

export function useSupabaseQuery<T>(
  table: string,
  query?: {
    select?: string;
    filter?: Record<string, any>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
  }
): UseSupabaseQueryResult<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      let queryBuilder = supabase.from(table).select(query?.select || '*');

      if (query?.filter) {
        Object.entries(query.filter).forEach(([key, value]) => {
          queryBuilder = queryBuilder.eq(key, value);
        });
      }

      if (query?.orderBy) {
        queryBuilder = queryBuilder.order(
          query.orderBy.column,
          { ascending: query.orderBy.ascending ?? true }
        );
      }

      if (query?.limit) {
        queryBuilder = queryBuilder.limit(query.limit);
      }

      const { data, error } = await queryBuilder;

      if (error) {
        setError(error);
        setData(null);
      } else {
        setData(data);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [table, JSON.stringify(query)]);

  return { data, error, loading, refetch: fetchData };
}