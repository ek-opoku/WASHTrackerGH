"use client";

import { useState } from "react";
import {
  Download, UploadCloud, CheckCircle, Lock, Server,
  FileText, Key, Code, AlertTriangle, Database,
  ClipboardList, Check, XCircle, FilePlus
} from "lucide-react";
import { mockSubmissions, DataSubmission } from "@/lib/data-center-mock";

// Reusable Toast Component
const Toast = ({ message, type, onClose }: { message: string, type: "success" | "error" | "info", onClose: () => void }) => {
  const bg = type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-blue-600";
  return (
    <div className={`fixed top-4 right-4 md:top-auto md:bottom-4 md:right-4 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border border-white/10 text-white animate-in slide-in-from-top-5 md:slide-in-from-bottom-5 fade-in duration-300 z-[100] ${bg}`}>
      {type === "success" && <CheckCircle className="h-5 w-5 shrink-0" />}
      {type === "error" && <XCircle className="h-5 w-5 shrink-0" />}
      {type === "info" && <AlertTriangle className="h-5 w-5 shrink-0" />}
      <p className="font-medium">{message}</p>
      <button onClick={onClose} className="ml-4 opacity-70 hover:opacity-100">&times;</button>
    </div>
  );
};

export default function DataCenterDashboard() {
  const [activeTab, setActiveTab] = useState(0);

  // Toast State
  const [toast, setToast] = useState<{ message: string, type: "success" | "error" | "info" } | null>(null);
  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000); // 5 sec duration
  };

  const tabs = [
    { id: 0, label: "Download Hub", icon: Database },
    { id: 1, label: "Upload & Sync", icon: UploadCloud },
    { id: 2, label: "Validation Queue", icon: CheckCircle },
    { id: 4, label: "Field Collection Forms", icon: ClipboardList },
    { id: 3, label: "Premium API", icon: Server },
  ];

  return (
    // Forcing a dark theme wrapper to ensure high contrast for all enclosed slate colors
    <div className="bg-slate-950 text-slate-50 min-h-screen">
      <div className="space-y-8 p-6 md:p-12 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white">Data Center & Ingestion Engine</h2>
          <p className="text-slate-400 text-lg">Central hub for WASH data acquisition, governed validation, and programmatic distribution.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-800 pb-px scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 text-sm font-bold transition-all duration-200 whitespace-nowrap
                  ${isActive
                    ? "border-blue-500 text-blue-400 bg-blue-500/10"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Areas */}
        <div className="mt-8 transition-all">
          {activeTab === 0 && <DownloadHubTab showToast={showToast} />}
          {activeTab === 1 && <UploadSyncTab showToast={showToast} />}
          {activeTab === 2 && <ValidationQueueTab showToast={showToast} />}
          {activeTab === 3 && <PremiumApiTab />}
          {activeTab === 4 && <FieldCollectionFormsTab showToast={showToast} />}
        </div>

        {/* Toast Notification Mount */}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
}

// --- TAB COMPONENTS ---

function DownloadHubTab({ showToast }: { showToast: (m: string, t?: any) => void }) {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [spatialLevel, setSpatialLevel] = useState<string>("National");
  const [startYear, setStartYear] = useState<number>(2015);
  const [endYear, setEndYear] = useState<number>(2024);

  const domains = [
    { id: "water", label: "Water Access Indicators", premium: false },
    { id: "sanitation", label: "Sanitation Facilities", premium: false },
    { id: "hygiene", label: "Hygiene Practices", premium: false },
    { id: "infra", label: "High-Res Infrastructure Corridors", premium: true },
    { id: "finance", label: "District Financial Flows & ODA", premium: true },
  ];

  const spatialLevels = [
    { id: "National", label: "National Aggregate", premium: false },
    { id: "Regional", label: "Regional Aggregate", premium: false },
    { id: "District", label: "Granular District-Level", premium: true },
  ];

  const toggleDomain = (id: string) => {
    setSelectedDomains(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const hasPremiumDomain = domains.some(d => d.premium && selectedDomains.includes(d.id));
  const hasPremiumSpatial = spatialLevels.find(s => s.id === spatialLevel)?.premium || false;
  const isPremiumRequest = hasPremiumDomain || hasPremiumSpatial;

  const handleDownload = () => {
    if (selectedDomains.length === 0) {
      showToast("Please select at least one data domain.", "error");
      return;
    }

    if (isPremiumRequest) {
      showToast("Request sent for Granular Access. Awaiting admin approval and payment confirmation.", "info");
    } else {
      showToast("Generating query... Downloading CSV bundle.", "success");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {/* Step 1: Variables */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold">1</span>
            Select Data Domains
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {domains.map(domain => {
              const isSelected = selectedDomains.includes(domain.id);
              return (
                <button
                  key={domain.id}
                  onClick={() => toggleDomain(domain.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-colors ${isSelected ? 'bg-blue-600/10 border-blue-500/50 text-blue-100' : 'bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-300'
                    }`}
                >
                  <span className="font-medium leading-tight">{domain.label}</span>
                  {domain.premium && (
                    <Lock className={`h-4 w-4 shrink-0 ml-2 ${isSelected ? 'text-blue-400' : 'text-amber-500'}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2 & 3: Spatial and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Spatial */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold">2</span>
              Spatial Resolution
            </h3>
            <div className="space-y-3">
              {spatialLevels.map(level => (
                <label key={level.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 cursor-pointer hover:border-slate-500 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="spatialLevel"
                      value={level.id}
                      checked={spatialLevel === level.id}
                      onChange={(e) => setSpatialLevel(e.target.value)}
                      className="text-blue-600 bg-slate-800 border-slate-600 focus:ring-blue-600"
                    />
                    <span className="font-medium text-slate-200">{level.label}</span>
                  </div>
                  {level.premium && <Lock className="h-4 w-4 text-amber-500 shrink-0" />}
                </label>
              ))}
            </div>
          </div>

          {/* Time Span */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold">3</span>
              Time Span
            </h3>
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 w-full">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Start Year</label>
                  <input
                    type="number" min="2000" max="2030" value={startYear}
                    onChange={(e) => setStartYear(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div className="flex-1 w-full">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">End Year</label>
                  <input
                    type="number" min="2000" max="2030" value={endYear}
                    onChange={(e) => setEndYear(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-2 font-medium">Data availability varies by year and indicator.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Pane */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-fit sticky top-6 shadow-xl">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4 mb-4">Query Summary</h3>

        <div className="space-y-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase text-slate-500">Domains Selected</span>
            <p className="font-semibold text-slate-200 mt-1 flex items-center gap-2">
              {selectedDomains.length > 0 ? (
                <><Check className="h-4 w-4 text-green-500" /> {selectedDomains.length} Active</>
              ) : 'None Selected'}
            </p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-slate-500">Resolution</span>
            <p className="font-semibold text-slate-200 mt-1">{spatialLevels.find(s => s.id === spatialLevel)?.label}</p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-slate-500">Date Range</span>
            <p className="font-mono font-medium text-blue-300 mt-1">{startYear} — {endYear}</p>
          </div>
        </div>

        {isPremiumRequest ? (
          <div className="space-y-4">
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
              <p className="text-sm font-medium text-amber-500 flex items-start gap-2 leading-relaxed">
                <Lock className="h-4 w-4 shrink-0 mt-0.5" />
                This query includes Premium data. Access must be requested.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-amber-600/20 active:scale-[0.98]"
            >
              Request Access
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
              <p className="text-sm font-medium text-green-400 flex items-start gap-2 leading-relaxed">
                <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
                Freely available Open Data. Ready for download.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-colors shadow-lg shadow-blue-600/30 active:scale-[0.98]"
            >
              <Download className="h-5 w-5" />
              Generate & Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function UploadSyncTab({ showToast }: { showToast: (m: string, t?: any) => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFileName) {
      showToast("Please select a file to upload.", "error"); return;
    }

    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);

      // Strict Template Validation Step
      if (selectedFileName !== "WASH_Data_Template.csv") {
        showToast("Validation Failed: File must match the official 'WASH_Data_Template.csv' schema. Upload rejected.", "error");
        return;
      }

      showToast("Data successfully saved to staging. Regional Validators notified. Only validated data will enter the computation engine.", "success");
      setSelectedFileName(""); // Reset on success
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Upload Zone & Instructions */}
      <div className="space-y-6">
        {/* Template Instructions */}
        <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 shrink-0" /> Strict Data Policy
          </h3>
          <p className="text-blue-100/80 text-sm leading-relaxed mb-4">
            To compute indicators reliably, all ingested data must adhere precisely to our standard schema. Submitted files that do not match the official template will be automatically rejected by the pre-flight checker.
          </p>
          <button
            onClick={() => showToast("Downloading WASH_Data_Template.csv...", "success")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-300 hover:bg-blue-600/40 border border-blue-500/50 transition-colors rounded-lg text-sm font-bold shadow-sm"
          >
            <Download className="h-4 w-4" />
            Download Official Template (.csv)
          </button>
        </div>

        {/* Drag Drop Zone */}
        <label className={`cursor-pointer group flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed transition-colors
          ${selectedFileName ? 'border-green-500/50 bg-green-500/5' : 'border-slate-700 hover:border-blue-500/50 bg-slate-900'}`}
        >
          <input type="file" className="hidden" onChange={handleFileChange} accept=".csv" />

          {selectedFileName ? (
            <>
              <div className="h-16 w-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-400">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 truncate max-w-[250px]">{selectedFileName}</h3>
              <p className="text-green-400 font-medium text-sm">File Ready for Pre-flight Check</p>
            </>
          ) : (
            <>
              <div className="h-16 w-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <UploadCloud className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Drag & Drop Data Files</h3>
              <p className="text-slate-500 text-sm max-w-sm font-medium">
                Upload validated .csv mapping files.
              </p>
              <div className="mt-8 px-6 py-2.5 bg-slate-800 border border-slate-600 text-white rounded-lg font-bold group-hover:bg-slate-700 transition-colors shadow-sm">
                Browse Files
              </div>
            </>
          )}
        </label>
      </div>

      {/* Metadata Form */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6">Attach Metadata & Governance Routing</h3>
        <form onSubmit={handleUpload} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Submitter Full Name</label>
              <input required type="text" className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-600" placeholder="e.g. Ama Mensah" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Email Address</label>
              <input required type="email" className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-600" placeholder="ama.mensah@example.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Organization Name</label>
            <input required type="text" className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-600" placeholder="e.g. WaterAid Ghana" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Survey Date</label>
              <input required type="date" className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 [color-scheme:dark]" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Target District</label>
              <input required type="text" className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-600" placeholder="e.g. Tamale" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Data Domain</label>
            <select className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500">
              <option>Water Access</option>
              <option>Sanitation Facilities</option>
              <option>Hygiene Practices</option>
              <option>Infrastructure Investment</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className={`w-full mt-4 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg ${isUploading ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 active:scale-[0.98]'}`}
          >
            {isUploading ? (
              <span className="animate-pulse flex items-center gap-2">
                <Server className="h-5 w-5 animate-spin" /> Running Template Validation...
              </span>
            ) : (
              <>
                <FilePlus className="h-6 w-6" />
                Submit Data for Validation
              </>
            )}
          </button>
        </form>

        {/* Important Validation Disclaimer */}
        <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <Server className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-400 leading-relaxed font-medium">
            Submitted data is securely stored in a <strong className="text-slate-200 font-semibold">staging environment</strong>. Regional validators will be notified immediately.
            <span className="text-blue-300"> Only upon explicit Admin approval will data flow into the primary computation engine to recalculate SDG scores.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function ValidationQueueTab({ showToast }: { showToast: (m: string, t?: any) => void }) {
  const [submissions, setSubmissions] = useState<DataSubmission[]>(mockSubmissions.filter(s => s.status === "Pending"));
  const [showRejectModal, setShowRejectModal] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const handleApprove = (id: string, district: string) => {
    setSubmissions(current => current.filter(s => s.id !== id));
    showToast(`Data merged from staging. Triggering live index recalculation for ${district}.`, "success");
  };

  const submitReject = () => {
    if (showRejectModal) {
      setSubmissions(current => current.filter(s => s.id !== showRejectModal));
      setShowRejectModal(null);
      setRejectReason("");
      showToast(`Submission rejected. Kept safely locally. Reason logged.`, "error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          Admin Queue
          <span className="bg-blue-500/20 text-blue-400 py-0.5 px-3 rounded-full text-sm font-bold border border-blue-500/30">
            {submissions.length} Pending
          </span>
        </h3>
      </div>

      {submissions.length === 0 ? (
        <div className="py-24 text-center bg-slate-900 border border-slate-800 rounded-3xl flex flex-col items-center shadow-inner">
          <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h4 className="text-white text-xl font-bold">All caught up!</h4>
          <p className="text-slate-400 mt-2 font-medium">No pending data submissions require validation.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-xs uppercase font-bold text-slate-400 whitespace-nowrap border-b border-slate-800">
              <tr>
                <th className="px-6 py-5">Submission ID</th>
                <th className="px-6 py-5">Submitter</th>
                <th className="px-6 py-5">Location</th>
                <th className="px-6 py-5 border-r border-slate-800">Details</th>
                <th className="px-6 py-5 text-center">Governance Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-800/80 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-200 whitespace-nowrap">{sub.id}</td>
                  <td className="px-6 py-4 text-white font-bold whitespace-nowrap">{sub.submittedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{sub.district}, {sub.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap border-r border-slate-800">
                    <span className="bg-slate-800 px-3 py-1 rounded-md text-slate-200 font-bold mr-3 border border-slate-700">{sub.recordCount} rows</span>
                    <span className="text-xs font-medium text-slate-400">{new Date(sub.timestamp).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4 flex justify-center items-center gap-3 whitespace-nowrap">
                    <button className="px-4 py-2 text-slate-300 font-bold hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors hidden sm:block">
                      Review File
                    </button>
                    <button onClick={() => handleApprove(sub.id, sub.district)} className="px-4 py-2 text-green-400 font-bold hover:text-white bg-green-500/10 hover:bg-green-600 rounded-lg border border-green-500/30 transition-colors shadow-sm">
                      Approve & Merge
                    </button>
                    <button onClick={() => setShowRejectModal(sub.id)} className="px-4 py-2 text-red-400 font-bold hover:text-white bg-red-500/10 hover:bg-red-600 rounded-lg border border-red-500/30 transition-colors shadow-sm">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-8 animate-in zoom-in-95 duration-200 shadow-2xl">
            <h4 className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              Reject Submission
            </h4>
            <div className="space-y-6">
              <p className="text-slate-300 font-medium">Please provide a reason. This will be sent back to the submitter.</p>
              <textarea
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                autoFocus
                className="w-full px-5 py-4 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-red-500 resize-none placeholder:text-slate-600"
                placeholder="e.g. Incomplete geographical mapping."
              />
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button onClick={() => setShowRejectModal(null)} className="px-6 py-3 font-bold text-slate-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button onClick={submitReject} className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-600/30 active:scale-[0.98]">
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldCollectionFormsTab({ showToast }: { showToast: (m: string, t?: any) => void }) {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const forms = [
    {
      id: "hh-san",
      title: "Household Sanitation Assessment",
      version: "v4.2 (2024)",
      description: "Granular questionnaire covering latrine type, sharing status, handwashing facilities, and safe disposal of excreta.",
      tags: ["Sanitation", "JMP Aligned", "Household"],
      type: "In-Built Form"
    },
    {
      id: "cw-test",
      title: "Community Water Source Testing Log",
      version: "v2.1 (2025)",
      description: "Field form for logging E. coli testing, ambient water quality parameters (pH, turbidity), and GPS mapping of borehole/standpipe locations.",
      tags: ["Water Quality", "Spatial", "Clinical"],
      type: "In-Built Form"
    },
    {
      id: "sch-hyg",
      title: "School Hygiene Infrastructure Monitor",
      version: "v1.5 (2023)",
      description: "Comprehensive audit form for tracking gender-separated toilets, menstrual hygiene management (MHM) materials, and functioning soap stations in educational facilities.",
      tags: ["Hygiene", "Institutional", "Gender Equality"],
      type: "In-Built Form"
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast("Field record securely submitted to staging for validation.", "success");
      setActiveForm(null); // Return to list
    }, 1500);
  };

  // If a form is selected, render the actual granular interactive UI
  if (activeForm === "hh-san") {
    return (
      <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
        <button
          onClick={() => setActiveForm(null)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm mb-4"
        >
          &larr; Back to Forms Library
        </button>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="border-b border-slate-800 pb-6 mb-8">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <ClipboardList className="h-7 w-7 text-blue-400" />
              Household Sanitation Assessment
            </h3>
            <p className="text-slate-400 font-medium">JMP Aligned granular assessment form for field monitors.</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-8">
            {/* Sec 1: Demographics & Geo */}
            <div className="space-y-5 bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50">
              <h4 className="text-lg font-bold text-blue-300 uppercase tracking-wider">1. Location & Demographics</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Household ID / Plot No.</label>
                  <input required placeholder="e.g. HH-001" type="text" className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-600" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-1.5 uppercase tracking-wider">GPS Coordinates</label>
                  <div className="flex gap-2">
                    <input readOnly value="5.6037° N, 0.1870° W" type="text" className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-400 focus:outline-none cursor-not-allowed font-mono text-sm" />
                    <button type="button" className="px-4 py-3 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg font-bold hover:bg-blue-600/40 transition-colors shrink-0">
                      Acquire
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Region</label>
                  <select required className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500">
                    <option value="">Select Region...</option>
                    <option>Greater Accra</option>
                    <option>Ashanti</option>
                    <option>Northern</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-1.5 uppercase tracking-wider">District</label>
                  <input required type="text" placeholder="e.g. Accra Metro" className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-600" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Head of Household</label>
                  <input required type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-600" />
                </div>
              </div>
            </div>

            {/* Sec 2: Facility Types */}
            <div className="space-y-5 bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50">
              <h4 className="text-lg font-bold text-blue-300 uppercase tracking-wider">2. Toilet Facility Assessment</h4>

              <div>
                <label className="block text-sm font-bold text-slate-400 mb-3 tracking-wider">2.1 What kind of toilet facility do members of your household usually use?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Flush to piped sewer system", "Flush to septic tank",
                    "Pit latrine with slab", "Pit latrine without slab / Open pit",
                    "Composting toilet", "No facility / Bush / Field"
                  ].map((facility) => (
                    <label key={facility} className="flex items-center gap-3 p-3 rounded-xl border border-slate-700 bg-slate-900 hover:border-blue-500/50 transition-colors cursor-pointer">
                      <input required type="radio" name="facility_type" value={facility} className="text-blue-600 bg-slate-800 border-slate-600 focus:ring-blue-600" />
                      <span className="font-medium text-slate-200 text-sm leading-snug">{facility}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-400 mb-3 tracking-wider">2.2 Do you share this facility with others who are not part of your household?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-3 p-3 px-6 rounded-xl border border-slate-700 bg-slate-900 hover:border-blue-500/50 transition-colors cursor-pointer">
                    <input required type="radio" name="shared" value="yes" className="text-blue-600 bg-slate-800 border-slate-600 focus:ring-blue-600" />
                    <span className="font-medium text-slate-200">Yes</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 px-6 rounded-xl border border-slate-700 bg-slate-900 hover:border-blue-500/50 transition-colors cursor-pointer">
                    <input required type="radio" name="shared" value="no" className="text-blue-600 bg-slate-800 border-slate-600 focus:ring-blue-600" />
                    <span className="font-medium text-slate-200">No</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Sec 3: Handwashing */}
            <div className="space-y-5 bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50">
              <h4 className="text-lg font-bold text-blue-300 uppercase tracking-wider">3. Hygiene Observation</h4>

              <div>
                <label className="block text-sm font-bold text-slate-400 mb-3 tracking-wider">3.1 Is there a handwashing facility (e.g. sink, bucket with tap) on premises?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-3 p-3 px-6 rounded-xl border border-slate-700 bg-slate-900 hover:border-blue-500/50 transition-colors cursor-pointer">
                    <input required type="radio" name="hwf_obs" value="yes" className="text-blue-600 bg-slate-800 border-slate-600 focus:ring-blue-600" />
                    <span className="font-medium text-slate-200">Yes, Observed</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 px-6 rounded-xl border border-slate-700 bg-slate-900 hover:border-blue-500/50 transition-colors cursor-pointer">
                    <input required type="radio" name="hwf_obs" value="no" className="text-blue-600 bg-slate-800 border-slate-600 focus:ring-blue-600" />
                    <span className="font-medium text-slate-200">No</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-400 mb-3 tracking-wider">3.2 What materials are present at the handwashing facility?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["Water", "Soap / Detergent", "Ash / Mud / Sand"].map((mat) => (
                    <label key={mat} className="flex items-center gap-3 p-3 rounded-xl border border-slate-700 bg-slate-900 hover:border-blue-500/50 transition-colors cursor-pointer">
                      <input type="checkbox" className="text-blue-600 rounded bg-slate-800 border-slate-600 focus:ring-blue-600 h-4 w-4" />
                      <span className="font-medium text-slate-200 text-sm leading-snug">{mat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex justify-end gap-4">
              <button type="button" onClick={() => setActiveForm(null)} className="px-6 py-3 font-bold text-slate-400 hover:text-white transition-colors">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${isSubmitting ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 active:scale-[0.98]'}`}
              >
                {isSubmitting ? (
                  <span className="animate-pulse flex items-center gap-2">
                    <Server className="h-5 w-5 animate-spin" /> Saving Record...
                  </span>
                ) : (
                  <>
                    <Check className="h-5 w-5" /> Submit to Staging
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Base Library View
  return (
    <div className="space-y-8">
      <div className="bg-blue-900/20 border border-blue-800 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="space-y-2 max-w-2xl">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-blue-400" /> In-Built Field Collection Engine
          </h3>
          <p className="text-slate-300 font-medium leading-relaxed">
            Ensure extremely high fidelity in computation outcomes by logging data directly into our native standardized forms. Submitting these forms maps perfectly to our Postgres schemas, guaranteeing the validation phase passes strictly without structural errors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((form) => (
          <div key={form.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-600 transition-colors">
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-bold text-white leading-tight pr-4">{form.title}</h4>
                <span className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold px-2 py-1 rounded-md shrink-0">
                  {form.version}
                </span>
              </div>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                {form.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {form.tags.map(t => (
                  <span key={t} className="bg-slate-950 text-slate-300 text-xs font-bold px-3 py-1 rounded-full border border-slate-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveForm(form.id)}
              className="w-full flex justify-center items-center gap-2 py-3.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white font-bold rounded-xl border border-blue-500/30 hover:border-blue-500 transition-colors shadow-sm"
            >
              <FilePlus className="h-5 w-5" />
              Open Interactive Form
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PremiumApiTab() {
  const curlExample = `curl -X GET "https://api.washtracker.gov.gh/v1/wash-index?district=Kumasi" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Accept: application/json"`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6 bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
            <Code className="h-6 w-6 text-blue-400" />
            Programmatic Access
          </h3>
          <p className="text-slate-400 font-medium">Integrate real-time computational WASH indices directly into your applications.</p>
        </div>

        <div className="bg-[#0D1117] rounded-xl border border-slate-700 overflow-hidden shadow-inner">
          <div className="bg-slate-950/50 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Request Live Index Data</span>
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="h-3 w-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
              <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>
          </div>
          <div className="p-5 overflow-x-auto">
            <pre className="text-sm font-mono text-slate-300 leading-relaxed">
              <code>{curlExample}</code>
            </pre>
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/30">
            Read Documentation
          </button>
          <button className="px-6 py-3 bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 rounded-xl font-bold transition-colors">
            Generate New Token
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-5 flex items-center gap-2">
            <Key className="h-5 w-5" />
            Active API Keys
          </h4>
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-between items-center group cursor-pointer hover:border-blue-500/40 transition-colors shadow-inner">
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Production Key</p>
              <p className="text-xs font-mono font-medium text-slate-500">pk_live_******************</p>
            </div>
            <button className="text-blue-400 hover:text-blue-300 font-bold text-sm bg-blue-500/10 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all">Copy</button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 p-6 rounded-3xl border border-blue-500/30 shadow-xl">
          <h4 className="flex items-center justify-between text-white font-bold mb-6">
            Monthly Quota Usage
            <span className="text-blue-400 font-mono text-lg">74%</span>
          </h4>

          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-slate-400">API Calls</span>
              <span className="text-white">7,402 <span className="text-slate-500">/ 10,000</span></span>
            </div>
            <div className="relative h-3 w-full rounded-full bg-slate-950 overflow-hidden shadow-inner border border-slate-800/80">
              <div className="absolute left-0 top-0 h-full bg-blue-500 rounded-full w-[74%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
