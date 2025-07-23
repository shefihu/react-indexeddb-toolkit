# React IndexedDB Toolkit

A complete TypeScript toolkit for IndexedDB in React applications with custom hooks and easy-to-use APIs.

## 📁 Project Structure

```
indexeddb-project/
├── packages/
│   ├── react-indexeddb-toolkit/    # Main npm package
│   └── demo-webapp/                # Demo React application
├── package.json                    # Root package.json (workspace)
└── README.md                       # This file
```

## 🚀 Quick Start

### Install Dependencies

```bash
# Install root dependencies
npm install
```

### Development Setup

To test features using the demo application:

1. **Build the toolkit package:**

   ```bash
   cd packages/react-indexeddb-toolkit
   npm run build
   ```

2. **Set up and start the demo app:**
   ```bash
   cd ../demo-webapp
   npm install
   npm start
   ```

The demo application will start and you can test all the toolkit features in a live React environment.

### Alternative Development Workflow

For active development with hot reloading:

1. **Start toolkit in watch mode:**

   ```bash
   cd packages/react-indexeddb-toolkit
   npm run dev
   ```

2. **In another terminal, start the demo app:**
   ```bash
   cd packages/demo-webapp
   npm install  # if not already done
   npm start
   ```

This allows you to make changes to the toolkit and see them reflected in the demo app automatically.

### Building for Production

```bash
# Build the toolkit package
cd packages/react-indexeddb-toolkit
npm run build

# Build the demo app (optional)
cd ../demo-webapp
npm run build
```

## 📦 Package: react-indexeddb-toolkit

The main package located in `packages/react-indexeddb-toolkit/` provides:

- 🚀 Easy-to-use React hooks
- 📦 TypeScript support
- 🔄 Automatic data synchronization
- 📱 Browser storage with IndexedDB
- 🎯 Simple CRUD operations
- 🏪 Multiple stores support

[View package documentation](./packages/react-indexeddb-toolkit/README.md)

## 🌐 Demo Application

The demo app in `packages/demo-webapp/` showcases the toolkit's capabilities with practical examples including:

- Todo list with CRUD operations
- User preferences management
- Multiple stores demonstration
- Error handling examples

## 🧪 Testing Your Changes

1. Make changes to the toolkit in `packages/react-indexeddb-toolkit/`
2. Build the toolkit: `npm run build`
3. Test in the demo app: `cd ../demo-webapp && npm start`
4. Verify functionality works as expected

## 📚 Documentation

- [Package README](./packages/react-indexeddb-toolkit/README.md)
- [API Documentation](./packages/react-indexeddb-toolkit/docs/API.md)
- [Examples](./packages/demo-webapp/src/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes in `packages/react-indexeddb-toolkit/`
4. Build and test using the demo app
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

MIT - see [LICENSE](./LICENSE) file for details.

## 🔗 Links

- [npm package](https://www.npmjs.com/package/react-indexeddb-toolkit)
- [GitHub Issues](https://github.com/shefihu/react-indexeddb-toolkit/issues)
- [Changelog](./CHANGELOG.md)
