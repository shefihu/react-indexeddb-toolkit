# React IndexedDB Toolkit

A complete TypeScript toolkit for IndexedDB in React applications with custom hooks and easy-to-use APIs.

## Features

- 🚀 Easy-to-use React hooks
- 📦 TypeScript support
- 🔄 Automatic data synchronization
- 📱 Browser storage with IndexedDB
- 🎯 Simple CRUD operations
- 🔍 Index support for complex queries
- ⚡ Optimized performance
- 🛠️ Zero dependencies (except React)

## Installation

```bash
npm install react-indexeddb-toolkit
```

## Quick Start

```tsx
import { useIndexedDB } from "react-indexeddb-toolkit";

interface User {
  id: string;
  name: string;
  email: string;
}

function UserComponent() {
  const { data, save, remove, isLoading, error } = useIndexedDB<User>({
    dbName: "myapp",
    storeName: "users",
    keyPath: "id",
  });

  const addUser = async () => {
    await save({
      id: Date.now().toString(),
      name: "John Doe",
      email: "john@example.com",
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={addUser}>Add User</button>
      {data.map((user) => (
        <div key={user.id}>
          {user.name} - {user.email}
          <button onClick={() => remove(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

## API Reference

### useIndexedDB Hook

```tsx
const {
  data,
  isLoading,
  error,
  save,
  remove,
  update,
  findById,
  clear,
  refresh,
} = useIndexedDB<T>(config);
```

#### Parameters

- `config`: Configuration object for the IndexedDB setup

#### Returns

- `data`: Array of all items in the store
- `isLoading`: Boolean indicating if data is being loaded
- `error`: Error message if any operation fails
- `save`: Function to save/update an item
- `remove`: Function to delete an item by ID
- `update`: Function to update an item partially
- `findById`: Function to find an item by ID
- `clear`: Function to clear all data
- `refresh`: Function to reload data from the database

### Configuration

```tsx
interface DBConfig {
  dbName: string; // Database name
  version?: number; // Database version (default: 1)
  storeName: string; // Object store name
  keyPath?: string; // Key path (default: 'id')
  indexes?: DBIndex[]; // Array of indexes
}

interface DBIndex {
  name: string; // Index name
  keyPath: string; // Key path for the index
  options?: {
    // Index options
    unique?: boolean;
    multiEntry?: boolean;
  };
}
```

## Advanced Usage

### With Indexes

```tsx
const { data, save } = useIndexedDB<User>({
  dbName: "myapp",
  storeName: "users",
  keyPath: "id",
  indexes: [
    {
      name: "email",
      keyPath: "email",
      options: { unique: true },
    },
    {
      name: "name",
      keyPath: "name",
    },
  ],
});
```

### Direct Database Manager Usage

```tsx
import { IndexedDBManager } from "react-indexeddb-toolkit";

const dbManager = new IndexedDBManager<User>({
  dbName: "myapp",
  storeName: "users",
  keyPath: "id",
});

// Initialize the database
await dbManager.init();

// Save data
await dbManager.save({ id: "1", name: "John", email: "john@example.com" });

// Get all data
const users = await dbManager.getAll();

// Get by ID
const user = await dbManager.getById("1");

// Delete
await dbManager.delete("1");

// Clear all
await dbManager.clear();
```

### Error Handling

```tsx
const { data, save, error } = useIndexedDB<User>(config);

const handleSave = async (user: User) => {
  try {
    await save(user);
    console.log("User saved successfully");
  } catch (err) {
    console.error("Failed to save user:", err);
  }
};

// Or use the error state
if (error) {
  console.error("Database error:", error);
}
```

## TypeScript Support

This package is written in TypeScript and provides full type definitions. All functions are properly typed, and you can use your own interfaces for type safety:

```tsx
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

const { data, save } = useIndexedDB<Product>({
  dbName: "store",
  storeName: "products",
  keyPath: "id",
});

// TypeScript will enforce the Product interface
await save({
  id: "1",
  name: "Laptop",
  price: 999.99,
  category: "Electronics",
  inStock: true,
});
```

## Best Practices

1. **Use consistent key paths**: Stick to a consistent naming convention for your IDs
2. **Handle errors gracefully**: Always check for errors and handle them appropriately
3. **Use indexes wisely**: Create indexes for fields you frequently query
4. **Keep data normalized**: Avoid deeply nested objects for better performance
5. **Clean up resources**: The hook handles cleanup automatically, but be mindful when using the manager directly

## Browser Support

- Chrome 58+
- Firefox 55+
- Safari 10.1+
- Edge 79+

IndexedDB is supported in all modern browsers. For older browser support, consider using a polyfill.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
