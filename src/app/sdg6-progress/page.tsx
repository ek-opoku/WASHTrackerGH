"use client";

import { CheckCircle2, AlertTriangle, XCircle, Activity } from "lucide-react";
import { mockSDGTargets } from "@/lib/sdg6-data";
import { calculateTrajectory, TrajectoryStatus } from "@/lib/sdg6-engine";

const getStatusConfig = (status: TrajectoryStatus) => {
  switch (status) {
    case "ON_TRACK":
      return {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
        bar: "bg-green-500",
        label: "On Track",
      };
    case "AT_RISK":
      return {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
        bar: "bg-amber-500",
        label: "At Risk",
      };
    case "OFF_TRACK":
      return {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: <XCircle className="h-5 w-5 text-red-600" />,
        bar: "bg-red-500",
        label: "Off Track",
      };
  }
};

const getStatusMessage = (status: TrajectoryStatus, mAccel: number) => {
  if (status === "ON_TRACK") {
    return "On track to achieve universal coverage by 2030.";
  }
  if (status === "AT_RISK") {
    // Gracefully handle infinity if division by zero happened but logic still landed here somehow
    const factor = mAccel === -1 || !isFinite(mAccel) ? "an unknown amount" : `${mAccel.toFixed(1)}x`;
    return `Needs to progress ${factor} faster to meet 2030 goals.`;
  }
  return "Critical: Progress has stagnated or regressed. Immediate intervention required.";
};

export default function SDG6ProgressPage() {
  const evaluatedTargets = mockSDGTargets.map(t => ({
    target: t,
    trajectory: calculateTrajectory(t)
  }));

  const onTrackCount = evaluatedTargets.filter(t => t.trajectory.status === "ON_TRACK").length;
  const atRiskCount = evaluatedTargets.filter(t => t.trajectory.status === "AT_RISK").length;
  const offTrackCount = evaluatedTargets.filter(t => t.trajectory.status === "OFF_TRACK").length;

  return (
    <div className="space-y-8 pb-12">
      {/* Dashboard Header & Summary */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">SDG6 Progress & Trajectory Engine</h2>
          <p className="mt-2 text-slate-600">Countdown to 2030</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-3 block">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-3xl font-bold text-slate-900">{onTrackCount}</span>
            <span className="text-sm font-medium text-green-800">On Track</span>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 mb-3 block">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <span className="text-3xl font-bold text-slate-900">{atRiskCount}</span>
            <span className="text-sm font-medium text-amber-800">At Risk</span>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-3 block">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <span className="text-3xl font-bold text-slate-900">{offTrackCount}</span>
            <span className="text-sm font-medium text-red-800">Off Track</span>
          </div>
        </div>
      </div>

      {/* SDG Target List/Grid */}
      <div className="space-y-6">
        {evaluatedTargets.map(({ target, trajectory }) => {
          const statusConfig = getStatusConfig(trajectory.status);

          return (
            <div
              key={target.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                {/* Header: Target ID and Name */}
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center rounded-lg bg-blue-50 px-3 py-1 font-bold text-blue-700">
                      {target.id}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900">{target.name}</h3>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="shrink-0">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                    {statusConfig.icon}
                    {statusConfig.label}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-8 space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-600">Current Progress</span>
                  <span className="text-slate-900">{target.vCurr.toFixed(1)}%</span>
                </div>
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ${statusConfig.bar}`}
                    style={{ width: `${Math.min(target.vCurr, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>0%</span>
                  <span>100% target ({target.yTarget})</span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Metrics Grid */}
                <div className="flex gap-8 border-l-2 border-slate-100 pl-4">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Baseline ({target.yBase})</p>
                    <p className="text-2xl font-bold text-slate-900">{target.vBase.toFixed(1)}%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Current ({target.yCurr})</p>
                    <p className="text-2xl font-bold text-slate-900">{target.vCurr.toFixed(1)}%</p>
                  </div>
                </div>

                {/* Alert/Insight Text */}
                <div className={`flex items-start gap-3 rounded-lg p-4 border ${statusConfig.bg} ${statusConfig.border}`}>
                  <Activity className={`mt-0.5 h-5 w-5 shrink-0 ${statusConfig.text}`} />
                  <p className={`text-sm font-medium ${statusConfig.text}`}>
                    {getStatusMessage(trajectory.status, trajectory.mAccel)}
                  </p>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
