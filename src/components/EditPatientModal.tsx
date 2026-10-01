import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Ban, CheckCircle } from 'lucide-react';
import { PatientRecord, NewsTrend, MobilityStatus, ReferralType, TtoStatus, TransportStatus, PathwayType } from '../types';

interface EditPatientModalProps {
  patient: PatientRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: PatientRecord) => void;
  onDelete?: (id: string) => void;
}

export const EditPatientModal: React.FC<EditPatientModalProps> = ({
  patient,
  isOpen,
  onClose,
  onSave,
  onDelete,
}) => {
  const [formData, setFormData] = useState<PatientRecord | null>(null);

  useEffect(() => {
    if (patient) {
      setFormData({ ...patient });
    }
  }, [patient]);

  if (!isOpen || !formData) return null;

  const handleChange = <K extends keyof PatientRecord>(key: K, value: PatientRecord[K]) => {
    setFormData((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-300 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden text-slate-800">
        {/* Header */}
        <div className="bg-[#044b70] text-white px-5 py-3.5 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-bold text-base tracking-wide">
              Edit Bed Space: {formData.room} - {formData.bed}
            </h3>
            <p className="text-xs text-sky-200">
              {formData.isClosedBed ? 'Bed marked as Closed / Unavailable' : `Patient: ${formData.surname || 'Empty'}`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Bed Availability Toggle */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="font-bold text-slate-800 flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isClosedBed || false}
                  onChange={(e) => handleChange('isClosedBed', e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-400"
                />
                Mark Bed as Closed / Unavailable (No Bed)
              </label>
            </div>
            {formData.isClosedBed && (
              <input
                type="text"
                value={formData.closedReason || ''}
                onChange={(e) => handleChange('closedReason', e.target.value)}
                placeholder="Closed reason (e.g. Closed Beds: Bed Unavailable)"
                className="w-64 px-2 py-1 border border-slate-300 rounded text-xs"
              />
            )}
          </div>

          {!formData.isClosedBed && (
            <>
              {/* Patient Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Patient Surname</label>
                  <input
                    type="text"
                    value={formData.surname}
                    onChange={(e) => handleChange('surname', e.target.value.toUpperCase())}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded uppercase font-bold text-sky-900 focus:ring-1 focus:ring-[#044b70]"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value as 'M' | 'F')}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  >
                    <option value="M">Male (M)</option>
                    <option value="F">Female (F)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Initial</label>
                  <input
                    type="text"
                    maxLength={2}
                    value={formData.initial}
                    onChange={(e) => handleChange('initial', e.target.value.toUpperCase())}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded uppercase text-center font-bold"
                  />
                </div>
              </div>

              {/* Name Highlight Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="highlightName"
                  checked={formData.isHighlighted || false}
                  onChange={(e) => handleChange('isHighlighted', e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-400"
                />
                <label htmlFor="highlightName" className="font-semibold text-slate-700 cursor-pointer flex items-center gap-1.5">
                  Highlight surname in yellow <span className="bg-[#facc15] px-1.5 py-0.5 rounded text-[10px] text-slate-900 font-bold">EXAMPLE</span>
                </label>
              </div>

              {/* Consultant Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-200 pt-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Consultant Name</label>
                  <input
                    type="text"
                    value={formData.consultant}
                    onChange={(e) => handleChange('consultant', e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-semibold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Boxed Blue Style</label>
                  <select
                    value={formData.consultantBoxed ? 'yes' : 'no'}
                    onChange={(e) => handleChange('consultantBoxed', e.target.value === 'yes')}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  >
                    <option value="no">Standard Plain Text</option>
                    <option value="yes">Blue Boxed Style</option>
                  </select>
                </div>
                <div className="sm:col-span-3">
                  <label className="block font-bold text-slate-700 mb-1">Specialty Subtitle</label>
                  <input
                    type="text"
                    value={formData.specialty}
                    onChange={(e) => handleChange('specialty', e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-600"
                  />
                </div>
              </div>

              {/* NEWS Score & Trend */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-200 pt-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">NEWS Score</label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={formData.newsScore}
                    onChange={(e) => handleChange('newsScore', parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Trend Arrow</label>
                  <select
                    value={formData.newsTrend}
                    onChange={(e) => handleChange('newsTrend', e.target.value as NewsTrend)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  >
                    <option value="down">Improving (↓↓ Green)</option>
                    <option value="stable">Stable (⇆ Slate)</option>
                    <option value="up">Deteriorating (↑↑ Red)</option>
                    <option value="none">No Arrow</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hosp LoS (Days)</label>
                  <input
                    type="number"
                    min={0}
                    value={formData.hospLoSDays}
                    onChange={(e) => handleChange('hospLoSDays', parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ward LoS (Days)</label>
                  <input
                    type="number"
                    min={0}
                    value={formData.wardLoSDays}
                    onChange={(e) => handleChange('wardLoSDays', parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  />
                </div>
              </div>

              {/* Safety Flags & Symbols */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-200 pt-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">FALLS Risk</label>
                  <select
                    value={formData.fallsRisk ? 'yes' : 'no'}
                    onChange={(e) => handleChange('fallsRisk', e.target.value === 'yes')}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  >
                    <option value="no">None</option>
                    <option value="yes">Falls Risk (Amber Person)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">MUST Nutrition</label>
                  <select
                    value={formData.mustRisk ? 'yes' : 'no'}
                    onChange={(e) => handleChange('mustRisk', e.target.value === 'yes')}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  >
                    <option value="no">None</option>
                    <option value="yes">MUST Risk (Green Knife/Fork)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobility</label>
                  <select
                    value={formData.mobility}
                    onChange={(e) => handleChange('mobility', e.target.value as MobilityStatus)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  >
                    <option value="independent">Independent (✔ Green)</option>
                    <option value="assistance_needed">Assistance Needed (✖ Red)</option>
                    <option value="none">None</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Patient Referral</label>
                  <select
                    value={formData.patientReferral}
                    onChange={(e) => handleChange('patientReferral', e.target.value as ReferralType)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  >
                    <option value="none">None</option>
                    <option value="ptot_star_green">PTOT Star (Green)</option>
                    <option value="ptot_circle_red">PTOT Circle (Red)</option>
                    <option value="slt">SLT</option>
                    <option value="dietitian">Dietitian</option>
                  </select>
                </div>
              </div>

              {/* Discharge / Flow info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-200 pt-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">EDR Date</label>
                  <input
                    type="text"
                    value={formData.edrDate || ''}
                    onChange={(e) => handleChange('edrDate', e.target.value)}
                    placeholder="EDR: 01/10/26"
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">TTO (Meds)</label>
                  <select
                    value={formData.ttoStatus}
                    onChange={(e) => handleChange('ttoStatus', e.target.value as TtoStatus)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  >
                    <option value="none">None</option>
                    <option value="in_progress">In Progress (Orange)</option>
                    <option value="complete">TTO Ready (Green)</option>
                    <option value="awaiting_pharmacy">Awaiting Pharmacy</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Transport</label>
                  <select
                    value={formData.transportStatus}
                    onChange={(e) => handleChange('transportStatus', e.target.value as TransportStatus)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  >
                    <option value="none">None</option>
                    <option value="check_transport">Check Transport (Red)</option>
                    <option value="booked">Transport Booked (Green)</option>
                    <option value="not_required">Own Transport</option>
                  </select>
                </div>
              </div>

              {/* Pathway & Allocation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-200 pt-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pathway Doc</label>
                  <select
                    value={formData.pathway}
                    onChange={(e) => handleChange('pathway', e.target.value as PathwayType)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  >
                    <option value="none">None</option>
                    <option value="clipboard_pencil">Document / Pen (Blue)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Specialist Ref</label>
                  <input
                    type="text"
                    value={formData.specRef}
                    onChange={(e) => handleChange('specRef', e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Allocation Code</label>
                  <input
                    type="text"
                    value={formData.allocation}
                    onChange={(e) => handleChange('allocation', e.target.value)}
                    placeholder="e.g. RBDEN"
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Clinical Notes</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Simulation handover notes..."
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                />
              </div>
            </>
          )}

          {/* Footer Actions */}
          <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-200">
            {onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to remove this bed space from the simulation?')) {
                    onDelete(formData.id);
                    onClose();
                  }
                }}
                className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove Bed
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 text-xs font-bold text-white bg-[#044b70] hover:bg-[#033b58] rounded shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" /> Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
