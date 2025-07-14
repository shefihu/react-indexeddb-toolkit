import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  Database,
  Home,
  CheckSquare,
  Settings,
  Github,
  Package,
} from "lucide-react";
import TodoDemo from "./components/TodoDemo";
import UserPrefsDemo from "./components/UserPrefsDemo";

const HomePage: React.FC = () => (
  <div className="max-w-4xl mx-auto">
    <div className="text-center mb-12">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <Database className="w-20 h-20 text-primary-600" />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
      <h1 className="text-5xl font-bold text-gray-900 mb-4">
        React IndexedDB Toolkit
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        A complete TypeScript toolkit for using IndexedDB in React applications.
        Fast, type-safe, and easy to use.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <a
          href="https://www.npmjs.com/package/react-indexeddb-toolkit"
          className="btn-primary flex items-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Package className="w-4 h-4" />
          View on NPM
        </a>
        <a
          href="https://github.com/yourusername/react-indexeddb-toolkit"
          className="btn-secondary flex items-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="w-4 h-4" />
          View on GitHub
        </a>
      </div>
    </div>

    {/* Feature Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <div className="card p-6 text-center">
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <CheckSquare className="w-6 h-6 text-primary-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Type Safe</h3>
        <p className="text-gray-600 text-sm">
          Full TypeScript support with excellent IntelliSense
        </p>
      </div>

      <div className="card p-6 text-center">
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Database className="w-6 h-6 text-primary-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Powerful Storage</h3>
        <p className="text-gray-600 text-sm">
          Store large amounts of structured data offline
        </p>
      </div>

      <div className="card p-6 text-center">
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Settings className="w-6 h-6 text-primary-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
        <p className="text-gray-600 text-sm">
          Simple React hooks API, just like useState
        </p>
      </div>
    </div>

    {/* Demo Cards */}
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      <div className="card p-6 hover:shadow-md transition-shadow">
        <CheckSquare className="w-8 h-8 text-primary-600 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Todo Demo</h3>
        <p className="text-gray-600 mb-4">
          See how to build a complete todo application with persistent storage,
          optimistic updates, and error handling.
        </p>
        <Link to="/todo" className="btn-primary">
          Try Todo Demo
        </Link>
      </div>

      <div className="card p-6 hover:shadow-md transition-shadow">
        <Settings className="w-8 h-8 text-primary-600 mb-4" />
        <h3 className="text-xl font-semibold mb-2">User Preferences</h3>
        <p className="text-gray-600 mb-4">
          Learn how to store and manage user preferences that persist across
          browser sessions.
        </p>
        <Link to="/preferences" className="btn-primary">
          Try Preferences Demo
        </Link>
      </div>
    </div>

    {/* Installation Section */}
    <div className="card p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        npm install react-indexeddb-toolkit
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
        {`import { useIndexedDB } from 'react-indexeddb-toolkit';

function MyComponent() {
  const { data, save, remove } = useIndexedDB({
    dbName: 'MyApp',
    storeName: 'items',
    keyPath: 'id'
  });

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}`}
      </pre>
    </div>

    {/* Benefits Section */}
    <div className="card p-6">
      <h2 className="text-2xl font-bold mb-6">Why IndexedDB?</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-green-600">
            ✅ IndexedDB
          </h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• Unlimited storage capacity</li>
            <li>• Asynchronous (non-blocking)</li>
            <li>• Complex data structures</li>
            <li>• Indexes and queries</li>
            <li>• Transactional integrity</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-red-600">
            ❌ localStorage
          </h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• 5-10MB storage limit</li>
            <li>• Synchronous (blocks UI)</li>
            <li>• Only strings</li>
            <li>• No querying capability</li>
            <li>• No transactions</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Database className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold">IndexedDB Toolkit</span>
            </Link>
          </div>
          <div className="flex items-center space-x-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive("/")
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              to="/todo"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive("/todo")
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              Todo Demo
            </Link>
            <Link
              to="/preferences"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive("/preferences")
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
              }`}
            >
              <Settings className="w-4 h-4" />
              Preferences
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/todo" element={<TodoDemo />} />
            <Route path="/preferences" element={<UserPrefsDemo />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center text-gray-600">
              <p>Built with Vite, React, TypeScript, and Tailwind CSS</p>
              <p className="mt-2">
                <a
                  href="https://github.com/yourusername/react-indexeddb-toolkit"
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                >
                  View source on GitHub
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
