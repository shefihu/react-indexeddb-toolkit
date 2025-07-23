export interface StoreConfig {
  name: string;
  keyPath?: string;
  indexes?: DBIndex[];
}
export interface DBConfig {
  dbName: string;
  version?: number;
  stores: StoreConfig[];
  store?: string;
  // storeName: string;
  // keyPath?: string;
  // indexes?: DBIndex[];
}

export interface DBIndex {
  name: string;
  keyPath: string;
  options?: IDBIndexParameters;
}

export interface UseIndexedDBReturn<T> {
  data: T[];
  isLoading: boolean;
  error: string | null;
  save: (item: T) => Promise<void>;
  remove: (id: string) => Promise<void>;
  update: (id: string, updates: Partial<T>) => Promise<void>;
  findById: (id: string) => Promise<T | null>;
  clear: () => Promise<void>;
  refresh: () => Promise<void>;
}
