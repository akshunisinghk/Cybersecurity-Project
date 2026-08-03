// src/components/chat/SecurityCard.tsx

import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  FileText,
} from "lucide-react";

import type { SecurityAnalysis } from "../../types/chat";

interface SecurityCardProps {
  analysis: SecurityAnalysis;
}

const SecurityCard = ({ analysis }: SecurityCardProps) => {
  const isBlocked = analysis.decision === "BLOCK";

  const riskColor =
    analysis.riskScore >= 70
      ? "text-red-500"
      : analysis.riskScore >= 40
      ? "text-yellow-500"
      : "text-green-500";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">

      <div className="mb-5 flex items-center gap-2">
        <ShieldCheck className="text-blue-600" size={22} />
        <h2 className="text-lg font-semibold">
          Security Analysis
        </h2>
      </div>

      <div className="space-y-4">

        {/* Decision */}
        <div className="flex items-center justify-between rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
          <span>Decision</span>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              isBlocked
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {analysis.decision}
          </span>
        </div>

        {/* Risk Score */}
        <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className={riskColor} />
              <span>Risk Score</span>
            </div>

            <span className={`font-bold ${riskColor}`}>
              {analysis.riskScore}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-300 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{
                width: `${analysis.riskScore}%`,
              }}
            />
          </div>
        </div>

        {/* Sanitized Prompt */}
        <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
          <div className="mb-2 flex items-center gap-2">
            <FileText size={18} />
            <span className="font-medium">
              Sanitized Prompt
            </span>
          </div>

          <p className="break-words text-sm text-slate-500 dark:text-slate-300">
            {analysis.sanitizedPrompt || "-"}
          </p>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
          <CheckCircle
            className={
              isBlocked
                ? "text-red-500"
                : "text-green-500"
            }
          />

          <span>
            {isBlocked
              ? "Prompt Blocked"
              : "Prompt Passed Security Checks"}
          </span>
        </div>

      </div>
    </div>
  );
};

export default SecurityCard;