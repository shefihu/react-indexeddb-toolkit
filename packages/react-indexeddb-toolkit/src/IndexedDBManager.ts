import { DBConfig, DBIndex, StoreConfig } from "./types";

export class IndexedDBManager<T = any> {
  private db: IDBDatabase | null = null;
  private readonly config: DBConfig;
  private readonly storeName: string;

  constructor(config: DBConfig) {
    this.config = {
      ...config,
      version: config.version || 1,
      // keyPath: config.keyPath || "id",
      // indexes: config.indexes || [],
      stores: config.stores.map((s) => ({
        ...s,
        keyPath: s.keyPath || "id",
        indexes: s.indexes || [],
      })),
    };
    this.storeName =
      config.store ??
      (config.stores.length === 1
        ? config.stores[0].name
        : (() => {
            throw new Error("Must specify a store when you have multiple");
          })());
  }

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.config.dbName, this.config.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        this.config.stores.forEach((store: StoreConfig) => {
          if (!db.objectStoreNames.contains(store.name)) {
            const os = db.createObjectStore(store.name, {
              keyPath: store.keyPath,
            });
            store.indexes?.forEach((ix) =>
              os.createIndex(ix.name, ix.keyPath, ix.options)
            );
          }
        });

        // if (!db.objectStoreNames.contains(this.config.storeName)) {
        //   const store = db.createObjectStore(this.config.storeName, {
        //     keyPath: this.config.keyPath,
        //   });

        //   // Create indexes
        //   this.config.indexes?.forEach((index: DBIndex) => {
        //     store.createIndex(index.name, index.keyPath, index.options);
        //   });
        // }
      };
    });
  }

  private getStore(mode: IDBTransactionMode): IDBObjectStore {
    if (!this.db) throw new Error("DB not initialized");
    return this.db
      .transaction(this.storeName, mode)
      .objectStore(this.storeName);
  }

  async save(data: T): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      // const transaction = this.db!.transaction(
      //   [this.config.storeName],
      //   "readwrite"
      // );
      // const store = transaction.objectStore(this.config.storeName);

      const store = this.getStore("readwrite");
      const request = store.put(data);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getAll(): Promise<T[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      // const transaction = this.db!.transaction(
      //   [this.config.storeName],
      //   "readonly"
      // );
      // const store = transaction.objectStore(this.config.storeName);

      const store = this.getStore("readonly");
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getById(id: string): Promise<T | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      // const transaction = this.db!.transaction(
      //   [this.config.storeName],
      //   "readonly"
      // );
      // const store = transaction.objectStore(this.config.storeName);
      const store = this.getStore("readonly");
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(id: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      // const transaction = this.db!.transaction(
      //   [this.config.storeName],
      //   "readwrite"
      // );
      // const store = transaction.objectStore(this.config.storeName);

      const store = this.getStore("readwrite");
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clear(): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      // const transaction = this.db!.transaction(
      //   [this.config.storeName],
      //   "readwrite"
      // );
      // const store = transaction.objectStore(this.config.storeName);
      const store = this.getStore("readwrite");
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}
