import React, { useState, useEffect } from "react";

import { Settings, Save, RefreshCw } from "lucide-react";
import { useIndexedDB } from "react-indexeddb-toolkit";

interface UserPreference {
  id: string;
  theme: "light" | "dark";
  language: string;
  notifications: boolean;
  autoSave: boolean;
  updatedAt: string;
}

const UserPrefsDemo: React.FC = () => {
  const {
    data: prefs,
    isLoading,
    save,
    error,
  } = useIndexedDB<UserPreference>({
    dbName: "UserPrefsDB",
    stores: [
      {
        name: "preferences",
        keyPath: "id",
      },
    ],
  });

  const currentPrefs = prefs[0] || {
    id: "user-prefs",
    theme: "light" as const,
    language: "en",
    notifications: true,
    autoSave: true,
    updatedAt: new Date().toISOString(),
  };

  const [localPrefs, setLocalPrefs] = useState(currentPrefs);
  const [isSaving, setIsSaving] = useState(false);

  // Update local state when data loads
  useEffect(() => {
    if (prefs.length > 0) {
      setLocalPrefs(prefs[0]);
    }
  }, [prefs]);

  const savePreferences = async () => {
    try {
      setIsSaving(true);
      await save({
        ...localPrefs,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Failed to save preferences:", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="p-6 card">
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-primary-600" />
            <span className="ml-3 text-gray-600">Loading preferences...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-6 card">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-8 h-8 text-primary-600" />
          <h2 className="text-2xl font-bold">User Preferences Demo</h2>
        </div>

        {error && (
          <div className="px-4 py-3 mb-4 text-red-700 border border-red-200 rounded bg-red-50">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Theme Selection */}
          <div>
            <label className="block mb-3 text-sm font-medium text-gray-700">
              Theme Preference
            </label>
            <div className="flex gap-4">
              {(["light", "dark"] as const).map((theme) => (
                <label key={theme} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value={theme}
                    checked={localPrefs.theme === theme}
                    onChange={(e) =>
                      setLocalPrefs((prev) => ({
                        ...prev,
                        theme: e.target.value as "light" | "dark",
                      }))
                    }
                    className="mr-2 text-primary-600"
                  />
                  <span className="capitalize">{theme}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Language Selection */}
          <div>
            <label className="block mb-3 text-sm font-medium text-gray-700">
              Language
            </label>
            <select
              value={localPrefs.language}
              onChange={(e) =>
                setLocalPrefs((prev) => ({ ...prev, language: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
              <option value="zh">Chinese</option>
            </select>
          </div>

          {/* Boolean Preferences */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">
              Notification Settings
            </h3>

            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localPrefs.notifications}
                onChange={(e) =>
                  setLocalPrefs((prev) => ({
                    ...prev,
                    notifications: e.target.checked,
                  }))
                }
                className="mr-3 rounded text-primary-600"
              />
              <span>Enable push notifications</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localPrefs.autoSave}
                onChange={(e) =>
                  setLocalPrefs((prev) => ({
                    ...prev,
                    autoSave: e.target.checked,
                  }))
                }
                className="mr-3 rounded text-primary-600"
              />
              <span>Auto-save changes</span>
            </label>
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t">
            <button
              onClick={savePreferences}
              disabled={isSaving}
              className="flex items-center gap-2 btn-primary"
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? "Saving..." : "Save Preferences"}
            </button>
          </div>

          {/* Last Updated */}
          {currentPrefs.updatedAt && (
            <div className="pt-2 text-sm text-gray-500">
              Last updated: {new Date(currentPrefs.updatedAt).toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPrefsDemo;
