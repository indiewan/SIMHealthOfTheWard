import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PatientRecord, WardTransferRow } from './types';
import { INITIAL_PATIENTS, INITIAL_TRANSFER_ROWS } from './defaultData';
import { TopBar } from './components/TopBar';
import { PatientTable } from './components/PatientTable';
import { PasswordModal } from './components/PasswordModal';
import { HelpLegendModal } from './components/HelpLegendModal';
import { EditPatientModal } from './components/EditPatientModal';
import { Check, Info, Lock } from 'lucide-react';

const STORAGE_KEY = 'hotw_simulation_patients_v1';
const STORAGE_HOSPITAL_KEY = 'hotw_simulation_hospital';
const STORAGE_WARD_KEY = 'hotw_simulation_ward';

export default function App() {
  // Load patients from localStorage or default simulation dataset
  const [patients, setPatients] = useState<PatientRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load saved simulation data', e);
    }
    return INITIAL_PATIENTS;
  });

  const [currentPage, setCurrentPage] = useState<1 | 2 | 3 | 4>(1);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [editingPatient, setEditingPatient] = useState<PatientRecord | null>(null);

  const [sortBy, setSortBy] = useState<string>('room_bay');
  const [selectedConsultantFilter, setSelectedConsultantFilter] = useState<string>('ALL');

  const [hospital, setHospital] = useState<string>(() => {
    return localStorage.getItem(STORAGE_HOSPITAL_KEY) || 'Royal Bournemouth Hospital';
  });

  const [ward, setWard] = useState<string>(() => {
    return localStorage.getItem(STORAGE_WARD_KEY) || 'AMU C8';
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  const handleManualRefresh = useCallback(() => {
    showToast('Refreshed Health of the Ward board data');
  }, [showToast]);

  const handleLockEditMode = useCallback(() => {
    setIsEditMode(false);
    showToast('Board locked: View Only Mode active');
  }, [showToast]);

  const handleOpenPasswordModal = useCallback(() => {
    setIsPasswordModalOpen(true);
  }, []);

  const handleOpenHelpModal = useCallback(() => {
    setIsHelpModalOpen(true);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    } catch (e) {
      console.error('Failed to persist to localStorage', e);
    }
  }, [patients]);

  useEffect(() => {
    localStorage.setItem(STORAGE_HOSPITAL_KEY, hospital);
  }, [hospital]);

  useEffect(() => {
    localStorage.setItem(STORAGE_WARD_KEY, ward);
  }, [ward]);

  // Extract unique consultants for the filter dropdown
  const consultantList = useMemo(() => {
    const set = new Set<string>();
    patients.forEach((p) => {
      if (p.consultant && !p.isClosedBed) {
        set.add(p.consultant);
      }
    });
    return Array.from(set).sort();
  }, [patients]);

  // Update a single patient record
  const handleUpdatePatient = useCallback((updated: PatientRecord) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  }, []);

  // Delete a patient / bed space
  const handleDeletePatient = useCallback((id: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
    showToast('Bed space removed');
  }, [showToast]);

  // Add a new patient bed space to the current page
  const handleAddPatient = () => {
    const newId = `bed-${Date.now()}`;
    const pagePatients = patients.filter((p) => p.page === currentPage);
    const bedIndex = pagePatients.length + 1;
    const roomName = currentPage === 4 ? 'Side Room' : `Bay 0${currentPage * 2 - 1}`;
    const bedName = `Bed 0${bedIndex}`;

    const newRecord: PatientRecord = {
      id: newId,
      page: currentPage,
      room: roomName,
      bed: bedName,
      surname: 'SIM_PATIENT',
      gender: 'M',
      initial: 'A',
      isHighlighted: false,
      consultant: 'DR S CHOWDHURY',
      specialty: '(ACUTE INTERNAL MEDICINE)',
      consultantBoxed: false,
      hospAdmissionDate: '01/10',
      hospLoSDays: 0,
      wardAdmissionDate: '01/10',
      wardLoSDays: 0,
      r2gScore: 0,
      r2gStatus: 'red',
      newsScore: 0,
      newsTrend: 'down',
      checkboxes: [false, false, false, false, false, false],
      ttoStatus: 'none',
      transportStatus: 'none',
      fallsRisk: false,
      mustRisk: false,
      waterlow: '',
      mobility: 'independent',
      patientReferral: 'none',
      specRef: 'N',
      acuity: '',
      infoCount: 0,
      pathway: 'none',
      notes: '',
      location: '',
      allocation: '',
    };

    setPatients((prev) => [...prev, newRecord]);
    showToast(`Added new bed space to Page ${currentPage}`);
  };

  // Reset to initial simulation defaults
  const handleResetScenario = () => {
    if (confirm('Reset all patient data to original simulation scenario? Any unsaved edits will be replaced.')) {
      setPatients(INITIAL_PATIENTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PATIENTS));
      showToast('Reset simulation scenario to default data');
    }
  };

  // Export scenario JSON
  const handleExportScenario = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(patients, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `HOTW_Scenario_${hospital.replace(/\s+/g, '_')}_${ward.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported simulation scenario JSON');
  };

  // Import scenario JSON
  const handleImportScenario = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          setPatients(parsed);
          showToast('Successfully imported simulation scenario');
        } else {
          alert('Invalid scenario file format.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Filter & sort patients for current page
  const filteredPatients = useMemo(() => {
    let list = patients.filter((p) => p.page === currentPage);

    // Filter by consultant
    if (selectedConsultantFilter !== 'ALL') {
      list = list.filter((p) => p.consultant === selectedConsultantFilter);
    }

    // Sort by selected criteria
    return [...list].sort((a, b) => {
      if (sortBy === 'patient_name') {
        return (a.surname || '').localeCompare(b.surname || '');
      }
      if (sortBy === 'news_score') {
        return (b.newsScore || 0) - (a.newsScore || 0);
      }
      if (sortBy === 'los') {
        return (b.hospLoSDays || 0) - (a.hospLoSDays || 0);
      }
      // default: room / bay name
      const roomDiff = (a.room || '').localeCompare(b.room || '');
      if (roomDiff !== 0) return roomDiff;
      return (a.bed || '').localeCompare(b.bed || '');
    });
  }, [patients, currentPage, selectedConsultantFilter, sortBy]);

  // Total bed counts
  const totalBedsCount = patients.length;

  return (
    <div className="min-h-screen bg-[#023b57] text-slate-800 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-2xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
          <Info className="w-4 h-4 text-sky-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation & Hospital Whiteboard Bar */}
      <TopBar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isEditMode={isEditMode}
        onOpenPasswordModal={handleOpenPasswordModal}
        onLockEditMode={handleLockEditMode}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        selectedConsultantFilter={selectedConsultantFilter}
        onConsultantFilterChange={setSelectedConsultantFilter}
        consultantList={consultantList}
        hospital={hospital}
        onHospitalChange={setHospital}
        ward={ward}
        onWardChange={setWard}
        onOpenHelpModal={handleOpenHelpModal}
        onResetScenario={handleResetScenario}
        onAddPatient={handleAddPatient}
        onExportScenario={handleExportScenario}
        onImportScenario={handleImportScenario}
        onManualRefresh={handleManualRefresh}
      />

      {/* Main Ward Table Content */}
      <main className="flex-1 w-full p-2 md:p-3 max-w-[1920px] mx-auto overflow-hidden flex flex-col">
        {/* Active Page Context Bar */}
        <div className="mb-2 flex items-center justify-between text-xs text-sky-100 font-medium px-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wide uppercase">
              {hospital} — {ward}
            </span>
            <span>•</span>
            <span>Viewing Page {currentPage} of 4</span>
            <span>•</span>
            <span className="text-sky-200">
              {filteredPatients.length} bed space{filteredPatients.length !== 1 ? 's' : ''} on this page
            </span>
            <span>•</span>
            <span className="bg-amber-400/20 border border-amber-300/40 text-amber-200 px-2 py-0.5 rounded text-[10.5px] font-bold tracking-wide">
              ⚠️ SIMULATION ONLY — FICTITIOUS DATA
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isEditMode ? (
              <span className="bg-amber-400 text-amber-950 px-2 py-0.5 rounded font-black text-[10px] uppercase tracking-wider shadow-xs">
                Edit Mode Active (Click any cell or symbol to modify)
              </span>
            ) : (
              <span className="text-sky-200/90 flex items-center gap-1 text-[11px]">
                <Lock className="w-3 h-3 text-sky-300" />
                View Only Mode (Protected by password)
              </span>
            )}
          </div>
        </div>

        {/* The Electronic Ward Table */}
        <div className="flex-1 overflow-auto rounded shadow-xl border border-[#013550]">
          <PatientTable
            patients={filteredPatients}
            currentPage={currentPage}
            isEditMode={isEditMode}
            transferRows={INITIAL_TRANSFER_ROWS}
            onUpdatePatient={handleUpdatePatient}
            onEditPatientInModal={(patient) => setEditingPatient(patient)}
            totalBedsCount={totalBedsCount}
          />
        </div>

        {/* Footer simulation status */}
        <footer className="mt-2 py-1 px-2 flex items-center justify-between text-[11px] text-sky-300/80">
          <div className="flex items-center gap-3">
            <span>UHD NHS Health of the Ward (Wardview) Simulation Environment</span>
            <span>•</span>
            <span>30 Patient Cohort Scenario</span>
          </div>
          <div>
            Password for Edit Mode: <strong className="text-white font-mono">Admin</strong>
          </div>
        </footer>
      </main>

      {/* Password Modal (Prompts for "Admin" to unlock Edit Mode) */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={() => {
          setIsEditMode(true);
          showToast('Unlocked Edit Mode! You can now edit patient names, consultants, and clinical symbols.');
        }}
      />

      {/* Interactive Symbol & Legend Reference Guide */}
      <HelpLegendModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      {/* Full Patient / Bed Space Editor Dialog */}
      <EditPatientModal
        patient={editingPatient}
        isOpen={!!editingPatient}
        onClose={() => setEditingPatient(null)}
        onSave={(updated) => {
          handleUpdatePatient(updated);
          showToast(`Saved bed ${updated.room} - ${updated.bed}`);
        }}
        onDelete={handleDeletePatient}
      />
    </div>
  );
}
