const Settings = () => {
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
        <div className="rounded-xl border border-gray-700 bg-gray-900 p-6">
          <h2 className="text-xl font-semibold text-cyan-300">
            General Settings
          </h2>
          <p className="mt-2 text-gray-400">
            Manage application configuration and preferences.
          </p>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gray-900 p-6">
          <h2 className="text-xl font-semibold text-cyan-300">
            Security Settings
          </h2>
          <p className="mt-2 text-gray-400">
            Configure authentication, password policies, and access controls.
          </p>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gray-900 p-6">
          <h2 className="text-xl font-semibold text-cyan-300">
            Notification Settings
          </h2>
          <p className="mt-2 text-gray-400">
            Choose when and how security alerts are delivered.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;