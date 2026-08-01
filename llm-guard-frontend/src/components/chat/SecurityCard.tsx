// src/components/chat/SecurityCard.tsx

import {
  ShieldCheck,
  AlertTriangle,
  Clock3,
  FileText,
  Lock,
  Ban,
} from "lucide-react";

import type { SecurityAnalysis } from "../../types/chat";

interface SecurityCardProps {
  analysis: SecurityAnalysis;
}

const SecurityCard = ({ analysis }: SecurityCardProps) => {
  const riskColor = {
    Low: "text-green-600",
    Medium: "text-yellow-500",
    High: "text-red-600",
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-5 flex items-center gap-2">
        <ShieldCheck className="text-blue-600" size={22} />
        <h2 className="text-lg font-semibold">
          Security Analysis
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-slate-800">
          <AlertTriangle className={riskColor[analysis.risk]} />
          <div>
            <p className="text-sm text-gray-500">Risk Level</p>
            <p className={`font-semibold ${riskColor[analysis.risk]}`}>
              {analysis.risk}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-slate-800">
          <ShieldCheck className="text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Threat Score</p>
            <p className="font-semibold">
              {analysis.threatScore}%
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-slate-800">
          <FileText className="text-indigo-500" />
          <div>
            <p className="text-sm text-gray-500">Tokens</p>
            <p className="font-semibold">
              {analysis.tokens}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-slate-800">
          <Clock3 className="text-orange-500" />
          <div>
            <p className="text-sm text-gray-500">Processing Time</p>
            <p className="font-semibold">
              {analysis.processingTime}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-slate-800">
          <Lock
            className={
              analysis.piiDetected
                ? "text-red-500"
                : "text-green-600"
            }
          />
          <div>
            <p className="text-sm text-gray-500">
              PII Detection
            </p>
            <p className="font-semibold">
              {analysis.piiDetected ? "Detected" : "Not Detected"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-slate-800">
          <Ban
            className={
              analysis.promptInjection
                ? "text-red-500"
                : "text-green-600"
            }
          />
          <div>
            <p className="text-sm text-gray-500">
              Prompt Injection
            </p>
            <p className="font-semibold">
              {analysis.promptInjection
                ? "Detected"
                : "Not Detected"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-gray-50 p-3 dark:bg-slate-800">
        <p className="mb-2 text-sm font-medium">
          Blocked Keywords
        </p>

        {analysis.blockedKeywords.length === 0 ? (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            None
          </span>
        ) : (
          <div className="flex flex-wrap gap-2">
            {analysis.blockedKeywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityCard;