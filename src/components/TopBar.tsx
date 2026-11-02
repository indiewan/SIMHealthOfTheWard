import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  RotateCcw,
  HelpCircle,
  Eye,
  LayoutGrid,
  Plus,
  Download,
  Upload,
  Play,
  Pause,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown,
  AlertTriangle,
} from 'lucide-react';

interface TopBarProps {
  currentPage: 1 | 2 | 3 | 4;
  onPageChange: (page: 1 | 2 | 3 | 4) => void;
  activePages: (1 | 2 | 3 | 4)[];
  countdown: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  isEditMode: boolean;
  onOpenPasswordModal: () => void;
  onLockEditMode: () => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  selectedConsultantFilter: string;
  onConsultantFilterChange: (consultant: string) => void;
  consultantList: string[];
  hospital: string;
  onHospitalChange: (hosp: string) => void;
  ward: string;
  onWardChange: (ward: string) => void;
  onOpenHelpModal: () => void;
  onResetScenario: () => void;
  onAddPatient: () => void;
  onExportScenario: () => void;
  onImportScenario: (file: File) => void;
  onManualRefresh: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentPage,
  onPageChange,
  activePages,
  countdown,
  isTimerRunning,
  onToggleTimer,
  isEditMode,
  onOpenPasswordModal,
  onLockEditMode,
  sortBy,
  onSortByChange,
  selectedConsultantFilter,
  onConsultantFilterChange,
  consultantList,
  hospital,
  onHospitalChange,
  ward,
  onWardChange,
  onOpenHelpModal,
  onResetScenario,
  onAddPatient,
  onExportScenario,
  onImportScenario,
  onManualRefresh,
}) => {
  const [showConsultantDropdown, setShowConsultantDropdown] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImportScenario(e.target.files[0]);
    }
  };

  return (
    <header className="bg-[#02476b] text-white border-b-2 border-[#013550] shadow-md select-none font-sans">
      {/* Simulation Notice Ribbon */}
      <div className="bg-[#b45309] text-amber-50 px-4 py-1 text-center text-[11.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b border-amber-700/60 shadow-xs">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-200 shrink-0" />
        <span>SIMULATION ONLY — ALL PATIENTS & DATA ARE FICTITIOUS — NOT FOR CLINICAL USE</span>
        <AlertTriangle className="w-3.5 h-3.5 text-amber-200 shrink-0" />
      </div>

      {/* Main Top Header Controls matching NHS Health of the Ward */}
      <div className="max-w-[1920px] mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Filters and Sort */}
        <div className="flex flex-col gap-2 shrink-0">
          {/* Row 1: Filters */}
          <div className="flex items-center gap-2">
            <span className="text-white text-xs font-semibold tracking-wide">Filters:</span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowConsultantDropdown(!showConsultantDropdown)}
                className={`px-3 py-1 text-xs font-semibold rounded border border-white transition-colors flex items-center gap-1.5 cursor-pointer ${
                  selectedConsultantFilter !== 'ALL'
                    ? 'bg-sky-500 text-white font-bold border-sky-300'
                    : 'bg-[#02476b] hover:bg-[#035985] text-white'
                }`}
              >
                <span>Consultant{selectedConsultantFilter !== 'ALL' ? `: ${selectedConsultantFilter}` : ''}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showConsultantDropdown && (
                <div className="absolute left-0 mt-1 z-50 w-64 bg-white border border-slate-300 rounded shadow-xl py-1 text-slate-800 text-xs">
                  <div className="px-3 py-1 font-bold text-slate-400 text-[10px] uppercase border-b border-slate-100">
                    Filter by Consultant
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onConsultantFilterChange('ALL');
                      setShowConsultantDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-sky-50 ${
                      selectedConsultantFilter === 'ALL' ? 'bg-sky-100 font-bold text-sky-900' : ''
                    }`}
                  >
                    All Consultants
                  </button>
                  {consultantList.map((cons) => (
                    <button
                      key={cons}
                      type="button"
                      onClick={() => {
                        onConsultantFilterChange(cons);
                        setShowConsultantDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-sky-50 truncate ${
                        selectedConsultantFilter === cons ? 'bg-sky-100 font-bold text-sky-900' : ''
                      }`}
                    >
                      {cons}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Row 2: Sort By */}
          <div className="flex items-center gap-2">
            <span className="text-white text-xs font-semibold tracking-wide">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="bg-[#02476b] text-white text-xs font-semibold border border-white rounded px-2.5 py-1 focus:outline-hidden focus:ring-1 focus:ring-sky-300 cursor-pointer"
            >
              <option value="room_bay">Room / Bay Name</option>
              <option value="patient_name">Patient Surname</option>
              <option value="news_score">NEWS Score (Highest First)</option>
              <option value="los">Length of Stay (Highest First)</option>
            </select>
          </div>
        </div>

        {/* Center: Hospital & Ward Selectors + Page Navigation */}
        <div className="flex flex-col items-center gap-2">
          {/* Row 1: Hospital and Ward Dropdowns + Simulation Warning Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <select
              value={hospital}
              onChange={(e) => onHospitalChange(e.target.value)}
              className="bg-[#02476b] text-white text-xs font-semibold border border-white rounded px-3 py-1 focus:outline-hidden cursor-pointer"
            >
              <option value="Royal Bournemouth Hospital">Royal Bournemouth Hospital</option>
              <option value="Poole Hospital">Poole Hospital</option>
              <option value="Christchurch Hospital">Christchurch Hospital</option>
            </select>

            <select
              value={ward}
              onChange={(e) => onWardChange(e.target.value)}
              className="bg-[#02476b] text-white text-xs font-semibold border border-white rounded px-3 py-1 focus:outline-hidden cursor-pointer"
            >
              <option value="AMU C8">AMU C8</option>
              <option value="Ward 10 Medical">Ward 10 Medical</option>
              <option value="Ward 12 Acute">Ward 12 Acute</option>
              <option value="Elderly Care AAU">Elderly Care AAU</option>
            </select>

            <div className="bg-[#fef08a] text-[#713f12] border border-[#eab308] px-2.5 py-0.5 rounded text-[10.5px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs select-none">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shrink-0"></span>
              <span>SIMULATION ONLY — NOT REAL PATIENTS</span>
            </div>
          </div>

          {/* Row 2: Pagination Tabs and Timer Counter */}
          <div className="flex items-center gap-1.5">
            {([1, 2, 3, 4] as const).map((pageNum) => {
              const isActive = currentPage === pageNum;
              const inUse = activePages.includes(pageNum);
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => onPageChange(pageNum)}
                  className={`px-3 py-1 text-xs font-bold rounded transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-white text-[#02476b] border-white shadow-md'
                      : inUse
                      ? 'bg-[#02476b] hover:bg-[#035985] text-white border-white'
                      : 'bg-[#02476b]/50 hover:bg-[#02476b] text-white/60 hover:text-white border-white/30'
                  }`}
                  title={
                    inUse
                      ? `Page ${pageNum} (Beds in use)`
                      : `Page ${pageNum} (Empty - skipped during auto-rotation)`
                  }
                >
                  Page {pageNum}
                  {!inUse && (
                    <span className="ml-1 text-[9px] font-normal text-white/50">
                      (empty)
                    </span>
                  )}
                </button>
              );
            })}

            {/* Simulated Live Countdown Display */}
            <div
              className={`ml-2 flex items-center gap-1.5 px-2 py-0.5 rounded text-white shadow-xs border transition-colors ${
                isTimerRunning ? 'bg-[#013550] border-white/50' : 'bg-amber-950/70 border-amber-400/50 text-amber-200'
              }`}
              title={
                isTimerRunning
                  ? `Auto-rotation active: switching to next active page in ${countdown}s`
                  : 'Auto-rotation paused'
              }
            >
              <span className="font-mono text-xs font-black tabular-nums tracking-tight">
                {String(countdown).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={onToggleTimer}
                className="text-white hover:text-sky-300 p-0.5 transition-colors cursor-pointer"
                title={isTimerRunning ? 'Pause auto-page rotation' : 'Resume auto-page rotation'}
              >
                {isTimerRunning ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Hospital Icons & Prominent Padlock / Mode Toggle */}
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          {/* Action icon buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onManualRefresh}
              className="w-7 h-7 rounded-full border border-white flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              title="Refresh Wardview"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onOpenHelpModal}
              className="w-7 h-7 rounded-full border border-white flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              title="Symbols & Columns Reference Guide"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            <div
              className="w-7 h-7 rounded-full border border-white flex items-center justify-center text-white/90"
              title="Observation View Mode"
            >
              <Eye className="w-4 h-4" />
            </div>
            <div
              className="w-7 h-7 rounded-full border border-white flex items-center justify-center text-white/90"
              title="Grid Layout View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Mode Switch / Padlock */}
          <div className="flex items-center gap-2">
            {!isEditMode ? (
              <button
                type="button"
                onClick={onOpenPasswordModal}
                className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/80 rounded-md text-white transition-all cursor-pointer shadow-xs group"
                title="Click to enter password 'Admin' and unlock Edit Mode"
              >
                <Lock className="w-4 h-4 text-white group-hover:text-amber-300 transition-colors" />
                <span className="text-xs font-bold tracking-wide">
                  View Mode <span className="text-[10px] text-sky-200 font-normal">(Click to Edit)</span>
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/20 border border-amber-400 rounded-md text-amber-200 text-xs font-bold">
                  <Unlock className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>EDIT MODE</span>
                </div>
                <button
                  type="button"
                  onClick={onLockEditMode}
                  className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  title="Lock back to View Mode"
                >
                  Exit to View Mode
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Mode Quick Toolbar (shows when Edit Mode is active) */}
      {isEditMode && (
        <div className="bg-[#035985] px-4 py-2 border-t border-sky-400/40 text-xs flex flex-wrap items-center justify-between gap-3 text-sky-100">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-300">● Simulation Facilitator Controls:</span>
            <span>You can click any cell to edit text or select symbols from the dropdowns.</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onAddPatient}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Bed Space
            </button>
            <button
              type="button"
              onClick={onExportScenario}
              className="px-2.5 py-1 bg-sky-700 hover:bg-sky-600 text-white font-semibold rounded flex items-center gap-1 transition-colors cursor-pointer"
              title="Download current patient scenario to JSON file"
            >
              <Download className="w-3.5 h-3.5" /> Export Scenario
            </button>
            <label className="px-2.5 py-1 bg-sky-700 hover:bg-sky-600 text-white font-semibold rounded flex items-center gap-1 transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5" /> Import Scenario
              <input
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={onResetScenario}
              className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded flex items-center gap-1 transition-colors cursor-pointer"
              title="Reset all patients to initial default simulation scenario"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
