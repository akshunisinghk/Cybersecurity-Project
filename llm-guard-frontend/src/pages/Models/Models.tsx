const Models = () => {
  return (
    <div className="min-h-screen bg-gray-950 p-6 text-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-cyan-400">AI Models</h1>
        <p className="mt-2 text-gray-400">
          Manage and monitor all connected AI models.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-900 shadow-lg">
        <table className="min-w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-300">
                Model
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-300">
                Provider
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-300">
                Version
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-300">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t border-gray-700 hover:bg-gray-800 transition">
              <td className="px-6 py-4">GPT-4o</td>
              <td className="px-6 py-4">OpenAI</td>
              <td className="px-6 py-4">2026.1</td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-medium">
                  Online
                </span>
              </td>
            </tr>

            <tr className="border-t border-gray-700 hover:bg-gray-800 transition">
              <td className="px-6 py-4">Claude 4</td>
              <td className="px-6 py-4">Anthropic</td>
              <td className="px-6 py-4">4.0</td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-yellow-600 px-3 py-1 text-sm font-medium">
                  Maintenance
                </span>
              </td>
            </tr>

            <tr className="border-t border-gray-700 hover:bg-gray-800 transition">
              <td className="px-6 py-4">Gemini 2.5</td>
              <td className="px-6 py-4">Google</td>
              <td className="px-6 py-4">2.5</td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-medium">
                  Offline
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Models;