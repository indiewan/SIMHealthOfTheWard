import React from 'react';
import { PatientRecord, WardTransferRow, NewsTrend, MobilityStatus, ReferralType, TtoStatus, TransportStatus, PathwayType } from '../types';
import {
  FallsSymbol,
  MustSymbol,
  MobilitySymbol,
  ReferralSymbol,
  NewsIndicator,
  TtoBadge,
  TransportBadge,
  PathwaySymbol,
  R2GBadge,
} from './Symbols';
import {
  FallsPicker,
  MustPicker,
  MobilityPicker,
  ReferralPicker,
  NewsTrendPicker,
  TtoPicker,
  TransportPicker,
  PathwayPicker,
  SymbolDropdown,
} from './SymbolPicker';
import { Edit2, Sparkles, Check } from 'lucide-react';

interface PatientTableProps {
  patients: PatientRecord[];
  currentPage: 1 | 2 | 3 | 4;
  isEditMode: boolean;
  transferRows: WardTransferRow[];
  onUpdatePatient: (updated: PatientRecord) => void;
  onEditPatientInModal: (patient: PatientRecord) => void;
  totalBedsCount: number;
}

export const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  currentPage,
  isEditMode,
  transferRows,
  onUpdatePatient,
  onEditPatientInModal,
  totalBedsCount,
}) => {
  // Helper to update a field on a patient
  const updateField = <K extends keyof PatientRecord>(
    patient: PatientRecord,
    key: K,
    value: PatientRecord[K]
  ) => {
    onUpdatePatient({
      ...patient,
      [key]: value,
    });
  };

  const toggleCheckbox = (patient: PatientRecord, index: number) => {
    const list = [...(patient.checkboxes || [false, false, false, false, false, false])];
    list[index] = !list[index];
    updateField(patient, 'checkboxes', list);
  };

  return (
    <div className="w-full overflow-x-auto bg-white shadow-xl border border-slate-300">
      <table className="w-full border-collapse text-left font-sans text-xs">
        {/* Table Header exactly matching the NHS Health of the Ward board */}
        <thead>
          <tr className="bg-[#02476b] text-white font-bold text-[11px] leading-tight select-none">
            {isEditMode && (
              <th className="p-1.5 text-center border-r border-[#013550] w-9 bg-[#013550]">
                Edit
              </th>
            )}
            <th className="p-1.5 text-center border-r border-[#013550] w-10">R2G</th>
            <th className="p-1.5 text-center border-r border-[#013550] w-20">Room</th>
            <th className="p-1.5 text-center border-r border-[#013550] w-24">
              Bed<br />
              <span className="text-[9.5px] font-normal text-sky-200">
                ({totalBedsCount}/2/0)
              </span>
            </th>
            <th className="p-1.5 text-center border-r border-[#013550] min-w-[130px]">Patient</th>
            <th className="p-1.5 text-center border-r border-[#013550] min-w-[150px]">Consultant</th>
            <th className="p-1 text-center border-r border-[#013550] w-12">
              Hosp<br />LoS
            </th>
            <th className="p-1 text-center border-r border-[#013550] w-12">
              Ward<br />LoS
            </th>
            <th className="p-1.5 text-center border-r border-[#013550] w-20">NEWS</th>
            <th className="p-1.5 text-center border-r border-[#013550] min-w-[90px]">Dates</th>
            <th className="p-1.5 text-center border-r border-[#013550] w-16">TTO</th>
            <th className="p-1.5 text-center border-r border-[#013550] w-20">Transport</th>
            <th className="p-1 text-center border-r border-[#013550] w-12">FALLS</th>
            <th className="p-1 text-center border-r border-[#013550] w-12">MUST</th>
            <th className="p-1 text-center border-r border-[#013550] w-14">
              Water<br />Low
            </th>
            <th className="p-1 text-center border-r border-[#013550] w-12">Mobility</th>
            <th className="p-1 text-center border-r border-[#013550] min-w-[70px]">
              Patient Referral
            </th>
            <th className="p-1 text-center border-r border-[#013550] w-11">
              Spec<br />Ref
            </th>
            <th className="p-1 text-center border-r border-[#013550] w-12">Acuity</th>
            <th className="p-1 text-center border-r border-[#013550] w-11">Info</th>
            <th className="p-1 text-center border-r border-[#013550] w-14">Pathway</th>
            <th className="p-1 text-center border-r border-[#013550] w-14">Notes</th>
            <th className="p-1 text-center border-r border-[#013550] w-14">Location</th>
            <th className="p-1 text-center w-16">Allocation</th>
          </tr>
        </thead>

        <tbody>
          {/* Transfer & Waiting Area Status Rows (Page 1 top, matching Screenshot 1) */}
          {currentPage === 1 &&
            transferRows.map((tRow, idx) => (
              <tr
                key={idx}
                className="bg-[#f0f4f8] text-slate-700 border-b border-slate-300 font-semibold text-[11px]"
              >
                {isEditMode && <td className="p-1 border-r border-slate-300"></td>}
                <td className="p-1 border-r border-slate-300"></td>
                <td className="p-1.5 pl-3 border-r border-slate-300 font-bold text-slate-800">
                  {tRow.title}
                </td>
                <td className="p-1.5 pl-2 border-r border-slate-300 text-[10px] text-slate-600 leading-tight">
                  <div>{tRow.transfers} Transfers</div>
                  <div>{tRow.tci} TCI</div>
                </td>
                <td colSpan={20} className="p-1 bg-[#f7f9fb] border-r border-slate-300"></td>
              </tr>
            ))}

          {/* Patient Rows */}
          {patients.map((patient) => {
            // Closed Bed row (like Bay 02 Bed 06)
            if (patient.isClosedBed) {
              return (
                <tr
                  key={patient.id}
                  className="bg-[#f8fafc] border-b border-slate-300 hover:bg-slate-100 transition-colors"
                >
                  {isEditMode && (
                    <td className="p-1 border-r border-slate-300 text-center">
                      <button
                        type="button"
                        onClick={() => onEditPatientInModal(patient)}
                        className="p-1 text-[#02476b] hover:bg-sky-100 rounded transition-colors"
                        title="Edit bed"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  )}
                  <td className="p-1 border-r border-slate-300 text-center"></td>
                  <td className="p-1.5 border-r border-slate-300 font-bold text-slate-800 text-center">
                    {patient.room}
                  </td>
                  <td className="p-1.5 border-r border-slate-300 font-medium text-slate-700 text-center">
                    {patient.bed}
                  </td>
                  <td
                    colSpan={isEditMode ? 19 : 20}
                    className="p-2 border-r border-slate-300 bg-slate-100 text-slate-800 font-semibold"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-[#dc2626] rounded-full flex items-center justify-center shadow-xs">
                        <div className="w-3.5 h-1 bg-white rounded-full"></div>
                      </div>
                      <span className="text-slate-900 font-bold">
                        {patient.closedReason || 'Closed Beds (NO BED): Bed Unavailable'}
                      </span>
                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() => updateField(patient, 'isClosedBed', false)}
                          className="ml-4 px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] rounded font-bold transition-colors cursor-pointer"
                        >
                          Reopen Bed
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="p-1 border-slate-300"></td>
                </tr>
              );
            }

            return (
              <tr
                key={patient.id}
                className="border-b border-slate-300 hover:bg-sky-50/40 transition-colors text-slate-800 text-xs"
              >
                {/* Edit Button in Edit Mode */}
                {isEditMode && (
                  <td className="p-1 border-r border-slate-300 text-center bg-slate-50">
                    <button
                      type="button"
                      onClick={() => onEditPatientInModal(patient)}
                      className="p-1 text-[#02476b] hover:bg-sky-100 rounded transition-colors"
                      title="Open full edit dialog for this patient"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                )}

                {/* 1. R2G (Red to Green) */}
                <td className="p-1 border-r border-slate-300 text-center align-middle">
                  {isEditMode ? (
                    <SymbolDropdown<number>
                      value={patient.r2gScore}
                      onChange={(newScore) => updateField(patient, 'r2gScore', newScore)}
                      title="R2G Score"
                      options={[
                        { label: 'Red Day (Score 0)', value: 0, renderPreview: () => <R2GBadge score={0} status="red" /> },
                        { label: 'Red Day (Score 1)', value: 1, renderPreview: () => <R2GBadge score={1} status="red" /> },
                        { label: 'Red Day (Score 2)', value: 2, renderPreview: () => <R2GBadge score={2} status="red" /> },
                        { label: 'Green Day (Score 0)', value: 0, renderPreview: () => <R2GBadge score={0} status="green" /> },
                      ]}
                    >
                      <R2GBadge score={patient.r2gScore} status={patient.r2gStatus || 'red'} />
                    </SymbolDropdown>
                  ) : (
                    <div className="flex justify-center">
                      <R2GBadge score={patient.r2gScore} status={patient.r2gStatus || 'red'} />
                    </div>
                  )}
                </td>

                {/* 2. Room */}
                <td className="p-1.5 border-r border-slate-300 font-bold text-slate-900 text-center whitespace-nowrap">
                  {isEditMode ? (
                    <input
                      type="text"
                      value={patient.room}
                      onChange={(e) => updateField(patient, 'room', e.target.value)}
                      className="w-full text-center font-bold bg-transparent border-b border-dashed border-slate-300 focus:border-[#02476b] focus:outline-hidden"
                    />
                  ) : (
                    patient.room
                  )}
                </td>

                {/* 3. Bed */}
                <td className="p-1.5 border-r border-slate-300 font-medium text-slate-800 text-center whitespace-nowrap">
                  {isEditMode ? (
                    <input
                      type="text"
                      value={patient.bed}
                      onChange={(e) => updateField(patient, 'bed', e.target.value)}
                      className="w-full text-center font-medium bg-transparent border-b border-dashed border-slate-300 focus:border-[#02476b] focus:outline-hidden"
                    />
                  ) : (
                    patient.bed
                  )}
                </td>

                {/* 4. Patient */}
                <td className="p-1.5 border-r border-slate-300 align-middle">
                  {isEditMode ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={patient.surname}
                          onChange={(e) => updateField(patient, 'surname', e.target.value.toUpperCase())}
                          placeholder="SURNAME"
                          className={`font-black text-sm uppercase px-1 py-0.5 rounded border border-slate-300 w-full ${
                            patient.isHighlighted ? 'bg-[#facc15] text-slate-950 font-black' : 'text-[#026aa7]'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => updateField(patient, 'isHighlighted', !patient.isHighlighted)}
                          className={`p-1 rounded border text-[10px] font-bold ${
                            patient.isHighlighted
                              ? 'bg-amber-300 border-amber-500 text-amber-950'
                              : 'bg-slate-100 border-slate-300 text-slate-600'
                          }`}
                          title="Toggle Yellow Highlight (like CAMPBELL/BROWN in screenshots)"
                        >
                          HL
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <select
                          value={patient.gender}
                          onChange={(e) => updateField(patient, 'gender', e.target.value as 'M' | 'F')}
                          className="text-[11px] border border-slate-300 rounded px-1 py-0.5 text-[#026aa7]"
                        >
                          <option value="M">(M)</option>
                          <option value="F">(F)</option>
                        </select>
                        <input
                          type="text"
                          maxLength={2}
                          value={patient.initial}
                          onChange={(e) => updateField(patient, 'initial', e.target.value.toUpperCase())}
                          placeholder="Initial"
                          className="w-8 text-center text-[11px] font-semibold border border-slate-300 rounded px-1 py-0.5 uppercase text-[#026aa7]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div
                        className={`font-black text-sm tracking-wide ${
                          patient.isHighlighted
                            ? 'bg-[#facc15] text-slate-950 px-1 py-0.5 rounded-[2px] inline-block font-extrabold shadow-2xs'
                            : 'text-[#026aa7]'
                        }`}
                      >
                        {patient.surname}
                      </div>
                      <div className="text-[11px] font-medium text-[#026aa7] mt-0.5">
                        ({patient.gender}) {patient.initial}
                      </div>
                    </div>
                  )}
                </td>

                {/* 5. Consultant */}
                <td className="p-1.5 border-r border-slate-300 align-middle">
                  {isEditMode ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={patient.consultant}
                          onChange={(e) => updateField(patient, 'consultant', e.target.value)}
                          placeholder="Consultant"
                          className={`w-full text-xs font-semibold px-1 py-0.5 rounded border border-slate-300 ${
                            patient.consultantBoxed ? 'bg-[#1d70b8] text-white' : 'text-slate-900'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => updateField(patient, 'consultantBoxed', !patient.consultantBoxed)}
                          className={`p-1 rounded border text-[9px] font-bold ${
                            patient.consultantBoxed
                              ? 'bg-blue-600 text-white border-blue-700'
                              : 'bg-slate-100 text-slate-600 border-slate-300'
                          }`}
                          title="Toggle Blue Box style (like DR ADAM KIRK)"
                        >
                          Box
                        </button>
                      </div>
                      <input
                        type="text"
                        value={patient.specialty}
                        onChange={(e) => updateField(patient, 'specialty', e.target.value)}
                        placeholder="Specialty (e.g. (General Medicine))"
                        className="w-full text-[10px] text-slate-600 px-1 py-0.5 rounded border border-slate-200"
                      />
                    </div>
                  ) : (
                    <div>
                      {patient.consultantBoxed ? (
                        <div className="bg-[#1d70b8] text-white px-1.5 py-1 rounded-[2px] leading-tight font-semibold shadow-xs inline-block w-full">
                          <div className="text-xs uppercase font-bold">{patient.consultant}</div>
                          <div className="text-[10.5px] opacity-90">{patient.specialty}</div>
                        </div>
                      ) : (
                        <div className="leading-tight">
                          <div className="text-xs uppercase font-bold text-slate-800">
                            {patient.consultant}
                          </div>
                          <div className="text-[10.5px] text-slate-600">{patient.specialty}</div>
                        </div>
                      )}
                    </div>
                  )}
                </td>

                {/* 6. Hosp LoS */}
                <td className="p-1 border-r border-slate-300 text-center align-middle">
                  <div className="flex flex-col items-center justify-center">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={patient.hospAdmissionDate}
                        onChange={(e) => updateField(patient, 'hospAdmissionDate', e.target.value)}
                        className="w-10 text-center text-[10px] text-slate-600 font-mono bg-transparent border-b border-dashed border-slate-300"
                      />
                    ) : (
                      <span className="text-[10.5px] text-slate-600 font-mono font-medium">
                        {patient.hospAdmissionDate}
                      </span>
                    )}

                    {isEditMode ? (
                      <input
                        type="number"
                        min={0}
                        value={patient.hospLoSDays}
                        onChange={(e) => updateField(patient, 'hospLoSDays', parseInt(e.target.value) || 0)}
                        className="w-6 h-5 mt-0.5 text-center text-xs font-bold text-white bg-[#15803d] rounded-[3px] focus:outline-hidden"
                      />
                    ) : (
                      <div className="w-5 h-5 mt-0.5 bg-[#15803d] text-white font-bold text-xs rounded-[3px] flex items-center justify-center shadow-xs">
                        {patient.hospLoSDays}
                      </div>
                    )}
                  </div>
                </td>

                {/* 7. Ward LoS */}
                <td className="p-1 border-r border-slate-300 text-center align-middle">
                  <div className="flex flex-col items-center justify-center">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={patient.wardAdmissionDate}
                        onChange={(e) => updateField(patient, 'wardAdmissionDate', e.target.value)}
                        className="w-10 text-center text-[10px] text-slate-600 font-mono bg-transparent border-b border-dashed border-slate-300"
                      />
                    ) : (
                      <span className="text-[10.5px] text-slate-600 font-mono font-medium">
                        {patient.wardAdmissionDate}
                      </span>
                    )}

                    {isEditMode ? (
                      <input
                        type="number"
                        min={0}
                        value={patient.wardLoSDays}
                        onChange={(e) => updateField(patient, 'wardLoSDays', parseInt(e.target.value) || 0)}
                        className="w-6 h-5 mt-0.5 text-center text-xs font-bold text-white bg-[#4a044e] rounded-[3px] focus:outline-hidden"
                      />
                    ) : (
                      <div className="w-5 h-5 mt-0.5 bg-[#4a044e] text-white font-bold text-xs rounded-[3px] flex items-center justify-center shadow-xs">
                        {patient.wardLoSDays}
                      </div>
                    )}
                  </div>
                </td>

                {/* 8. NEWS */}
                <td className="p-1 border-r border-slate-300 text-center align-middle">
                  {isEditMode ? (
                    <div className="flex items-center justify-center gap-1">
                      <input
                        type="number"
                        min={0}
                        max={20}
                        value={patient.newsScore}
                        onChange={(e) => updateField(patient, 'newsScore', parseInt(e.target.value) || 0)}
                        className="w-8 text-center font-bold text-sm border border-slate-300 rounded"
                      />
                      <NewsTrendPicker
                        trend={patient.newsTrend}
                        score={patient.newsScore}
                        onChange={(newTrend) => updateField(patient, 'newsTrend', newTrend)}
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <NewsIndicator score={patient.newsScore} trend={patient.newsTrend} />
                    </div>
                  )}
                </td>

                {/* 9. Dates (Checklist + EDR) */}
                <td className="p-1.5 border-r border-slate-300 align-middle">
                  <div className="flex items-center gap-2">
                    {/* Vertical stack of clinical checkboxes */}
                    <div className="flex flex-col gap-0.5 shrink-0">
                      {(patient.checkboxes || [false, false, false, false, false, false]).map(
                        (checked, cIdx) => (
                          <button
                            key={cIdx}
                            type="button"
                            onClick={() => toggleCheckbox(patient, cIdx)}
                            className={`w-3.5 h-3.5 border rounded-[1px] flex items-center justify-center cursor-pointer transition-colors ${
                              checked
                                ? 'bg-sky-600 border-sky-700 text-white'
                                : 'bg-white border-slate-400 hover:border-slate-600'
                            }`}
                            title="Discharge bundle criteria checklist item"
                          >
                            {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </button>
                        )
                      )}
                    </div>

                    <div className="text-[10px] text-slate-700 font-semibold leading-tight">
                      {isEditMode ? (
                        <input
                          type="text"
                          value={patient.edrDate || ''}
                          onChange={(e) => updateField(patient, 'edrDate', e.target.value)}
                          placeholder="EDR: 01/10/26"
                          className="w-24 text-[10px] p-0.5 border border-slate-300 rounded font-mono"
                        />
                      ) : (
                        <span>{patient.edrDate}</span>
                      )}
                    </div>
                  </div>
                </td>

                {/* 10. TTO */}
                <td className="p-1 border-r border-slate-300 text-center align-middle">
                  {isEditMode ? (
                    <TtoPicker
                      value={patient.ttoStatus}
                      onChange={(newStatus) => updateField(patient, 'ttoStatus', newStatus)}
                    />
                  ) : (
                    <div className="flex justify-center">
                      <TtoBadge status={patient.ttoStatus} />
                    </div>
                  )}
                </td>

                {/* 11. Transport */}
                <td className="p-1 border-r border-slate-300 text-center align-middle">
                  {isEditMode ? (
                    <TransportPicker
                      value={patient.transportStatus}
                      onChange={(newStatus) => updateField(patient, 'transportStatus', newStatus)}
                    />
                  ) : (
                    <div className="flex justify-center">
                      <TransportBadge status={patient.transportStatus} />
                    </div>
                  )}
                </td>

                {/* 12. FALLS */}
                <td className="p-1 border-r border-slate-300 text-center align-middle">
                  {isEditMode ? (
                    <FallsPicker
                      value={patient.fallsRisk}
                      onChange={(newVal) => updateField(patient, 'fallsRisk', newVal)}
                    />
                  ) : (
                    <div className="flex justify-center">
                      {patient.fallsRisk && <FallsSymbol />}
                    </div>
                  )}
                </td>

                {/* 13. MUST */}
                <td className="p-1 border-r border-slate-300 text-center align-middle">
                  {isEditMode ? (
                    <MustPicker
                      value={patient.mustRisk}
                      onChange={(newVal) => updateField(patient, 'mustRisk', newVal)}
                    />
                  ) : (
                    <div className="flex justify-center">
                      {patient.mustRisk && <MustSymbol />}
                    </div>
                  )}
                </td>

                {/* 14. Water Low */}
                <td className="p-1 border-r border-slate-300 text-center align-middle">
                  {isEditMode ? (
                    <input
                      type="text"
                      value={patient.waterlow}
                      onChange={(e) => updateField(patient, 'waterlow', e.target.value)}
                      placeholder="—"
                      className="w-10 text-center text-xs font-semibold bg-transparent border-b border-dashed border-slate-300"
                    />
                  ) : (
                    <span className="text-slate-600 font-semibold">{patient.waterlow || ''}</span>
                  )}
                </td>

                {/* 15. Mobility */}
                <td className="p-1 border-r border-slate-300 text-center align-middle">
                  {isEditMode ? (
                    <MobilityPicker
                      value={patient.mobility}
                      onChange={(newVal) => updateField(patient, 'mobility', newVal)}
                    />
                  ) : (
                    <div className="flex justify-center">
                      <MobilitySymbol status={patient.mobility} />
                    </div>
                  )}
                </td>

                {/* 16. Patient Referral */}
                <td className="p-1 border-r border-slate-300 text-center align-middle">
                  {isEditMode ? (
                    <ReferralPicker
                      value={patient.patientReferral}
                      onChange={(newVal) => updateField(patient, 'patientReferral', newVal)}
                    />
                  ) : (
                    <div className="flex justify-center">
                      <ReferralSymbol type={patient.patientReferral} />
                    </div>
                  )}
                </td>

                {/* 17. Spec Ref */}
                <td className="p-1 border-r border-slate-300 text-center align-middle font-black text-slate-900 text-sm">
                  {isEditMode ? (
                    <input
                      type="text"
                      value={patient.specRef}
                      onChange={(e) => updateField(patient, 'specRef', e.target.value)}
                      className="w-8 text-center font-black bg-transparent border-b border-dashed border-slate-300"
                    />
                  ) : (
                    patient.specRef
                  )}
                </td>

                {/* 18. Acuity */}
                <td className="p-1 border-r border-slate-300 text-center align-middle font-medium text-slate-700">
                  {isEditMode ? (
                    <input
                      type="text"
                      value={patient.acuity}
                      onChange={(e) => updateField(patient, 'acuity', e.target.value)}
                      className="w-10 text-center text-xs bg-transparent border-b border-dashed border-slate-300"
                    />
                  ) : (
                    patient.acuity
                  )}
                </td>

                {/* 19. Info */}
                <td className="p-1 border-r border-slate-300 text-center align-middle">
                  <div className="flex justify-center">
                    <div className="w-6 h-6 bg-[#bae6fd] text-slate-900 font-bold text-xs flex items-center justify-center rounded-[2px] shadow-xs">
                      {patient.infoCount}
                    </div>
                  </div>
                </td>

                {/* 20. Pathway */}
                <td className="p-1 border-r border-slate-300 text-center align-middle">
                  {isEditMode ? (
                    <PathwayPicker
                      value={patient.pathway}
                      onChange={(newVal) => updateField(patient, 'pathway', newVal)}
                    />
                  ) : (
                    <div className="flex justify-center">
                      <PathwaySymbol type={patient.pathway} />
                    </div>
                  )}
                </td>

                {/* 21. Notes */}
                <td className="p-1 border-r border-slate-300 text-center align-middle">
                  {isEditMode ? (
                    <input
                      type="text"
                      value={patient.notes}
                      onChange={(e) => updateField(patient, 'notes', e.target.value)}
                      placeholder="Notes..."
                      className="w-16 text-center text-[10px] bg-transparent border-b border-dashed border-slate-300"
                    />
                  ) : (
                    <span className="text-[10px] text-slate-600 truncate max-w-[80px] inline-block" title={patient.notes}>
                      {patient.notes}
                    </span>
                  )}
                </td>

                {/* 22. Location */}
                <td className="p-1 border-r border-slate-300 text-center align-middle font-medium text-slate-700">
                  {isEditMode ? (
                    <input
                      type="text"
                      value={patient.location}
                      onChange={(e) => updateField(patient, 'location', e.target.value)}
                      className="w-12 text-center text-xs bg-transparent border-b border-dashed border-slate-300"
                    />
                  ) : (
                    patient.location
                  )}
                </td>

                {/* 23. Allocation */}
                <td className="p-1 text-center align-middle font-black text-slate-900 text-xs">
                  {isEditMode ? (
                    <input
                      type="text"
                      value={patient.allocation}
                      onChange={(e) => updateField(patient, 'allocation', e.target.value)}
                      placeholder="Code"
                      className="w-14 text-center font-black bg-transparent border-b border-dashed border-slate-300"
                    />
                  ) : (
                    patient.allocation
                  )}
                </td>
              </tr>
            );
          })}

          {/* Empty state when page has no beds configured */}
          {patients.length === 0 && (
            <tr className="bg-slate-50 border-b border-slate-300">
              <td
                colSpan={isEditMode ? 24 : 23}
                className="py-16 px-4 text-center text-slate-500 font-sans"
              >
                <div className="flex flex-col items-center justify-center gap-1.5">
                  <div className="text-sm font-bold text-slate-700">
                    No bed spaces configured on Page {currentPage}
                  </div>
                  <div className="text-xs text-slate-500 max-w-md">
                    {isEditMode
                      ? `Click "+ Add Bed Space" in the top bar toolbar to add beds to Page ${currentPage}.`
                      : 'This page currently has no active beds in use and is skipped during auto-page rotation.'}
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
