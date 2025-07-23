import { useState, useEffect, useCallback } from "react";
import { IndexedDBManager } from "../IndexedDBManager";
import { DBConfig, UseIndexedDBReturn } from "../types";

export function useIndexedDB<T>(config: DBConfig): UseIndexedDBReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const storeName =
    config.store ??
    (config.stores.length === 1
      ? config.stores[0].name
      : (() => {
          throw new Error("Must specify a store when you have multiple");
        })());

  const [dbManager] = useState(
    () => new IndexedDBManager<T>({ ...config, store: storeName })
  );

  const keyPath =
    config.stores.find((s) => s.name === storeName)?.keyPath || "id";

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const items = await dbManager.getAll();
      setData(items);
    } catch (err: any) {
      setError(err.message || "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, [dbManager]);

  const save = useCallback(
    async (item: T) => {
      try {
        setError(null);
        await dbManager.save(item);
        await loadData();
      } catch (err: any) {
        setError(err.message || "Failed to save item");
        throw err;
      }
    },
    [dbManager, loadData]
  );

  const remove = useCallback(
    async (id: string) => {
      try {
        setError(null);
        await dbManager.delete(id);
        setData((prev) =>
          prev.filter((item) => (item as any)[keyPath || "id"] !== id)
        );
      } catch (err: any) {
        setError(err.message || "Failed to delete item");
        throw err;
      }
    },
    [dbManager, keyPath]
  );

  const update = useCallback(
    async (id: string, updates: Partial<T>) => {
      try {
        setError(null);
        const existing = await dbManager.getById(id);
        if (existing) {
          const updated = { ...existing, ...updates };
          await dbManager.save(updated);
          await loadData();
        }
      } catch (err: any) {
        setError(err.message || "Failed to update item");
        throw err;
      }
    },
    [dbManager, loadData]
  );

  const findById = useCallback(
    async (id: string): Promise<T | null> => {
      try {
        setError(null);
        return await dbManager.getById(id);
      } catch (err: any) {
        setError(err.message || "Failed to find item");
        return null;
      }
    },
    [dbManager]
  );

  const clear = useCallback(async () => {
    try {
      setError(null);
      await dbManager.clear();
      setData([]);
    } catch (err: any) {
      setError(err.message || "Failed to clear data");
      throw err;
    }
  }, [dbManager]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    isLoading,
    error,
    save,
    remove,
    update,
    findById,
    clear,
    refresh: loadData,
  };
}
