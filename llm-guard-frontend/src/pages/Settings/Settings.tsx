import { useEffect, useState } from "react";
import type { SettingSection } from "../../types/settings";
import { getSettings } from "../../services/settings";

const Settings = () => {
  const [sections, setSections] = useState<SettingSection[]>([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        setSections(data);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 p-6 text-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-cyan-400">
          Settings
        </h1>

        <p className="mt-2 text-gray-400">
          Configure system preferences and security options.
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-700 bg-gray-900 p-6"
          >
            <h2 className="text-xl font-semibold text-cyan-300">
              {section.title}
            </h2>

            <p className="mt-2 text-gray-400">
              {section.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;