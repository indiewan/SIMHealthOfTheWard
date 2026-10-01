import React from 'react';
import { X, HelpCircle, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';
import { FallsSymbol, MustSymbol, MobilitySymbol, ReferralSymbol, NewsIndicator, TtoBadge, TransportBadge, PathwaySymbol } from './Symbols';

interface HelpLegendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpLegendModal: React.FC<HelpLegendModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-300 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-slate-800">
        {/* Header */}
        <div className="bg-[#044b70] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-sky-200" />
            <h3 className="font-bold text-base tracking-wide">
              Health of the Ward (Wardview) - Clinical Symbol & Column Reference
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          <div>
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#044b70]" /> Clinical Safety Symbols & Scoring
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-start gap-3">
                <div className="shrink-0 pt-0.5">
                  <FallsSymbol size={26} />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-xs">FALLS Risk Alert</div>
                  <div className="text-slate-600 text-xs mt-0.5">
                    Patient screened as high risk of inpatient falls. Falls prevention care bundle, bed alarm or 1:1 bay supervision indicated.
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-start gap-3">
                <div className="shrink-0 pt-0.5">
                  <MustSymbol size={26} />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-xs">MUST (Nutrition Screener)</div>
                  <div className="text-slate-600 text-xs mt-0.5">
                    Malnutrition Universal Screening Tool flag logged. Indicates weight loss, low BMI or high acute disease effect. Red tray / food chart required.
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-start gap-3">
                <div className="shrink-0 pt-0.5 flex gap-2">
                  <MobilitySymbol status="independent" size={20} />
                  <MobilitySymbol status="assistance_needed" size={20} />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-xs">Mobility Status</div>
                  <div className="text-slate-600 text-xs mt-0.5">
                    <span className="text-green-700 font-semibold">Green Tick</span> = Independent with or without stick/frame.<br />
                    <span className="text-red-700 font-semibold">Red Cross</span> = Needs assistance (x1 or x2 transfer, hoist or bedbound).
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-start gap-3">
                <div className="shrink-0 pt-0.5 flex gap-2">
                  <ReferralSymbol type="ptot_star_green" size={26} />
                  <ReferralSymbol type="ptot_circle_red" size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-xs">PTOT (Physio & Occupational Therapy)</div>
                  <div className="text-slate-600 text-xs mt-0.5">
                    <span className="text-green-800 font-semibold">Green Star</span> = Routine Therapy referral active.<br />
                    <span className="text-red-700 font-semibold">Red Circle</span> = Urgent referral / discharge assessment pending.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#044b70]" /> Early Warning (NEWS) & Discharge Management
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-start gap-3">
                <div className="shrink-0 pt-0.5 flex flex-col gap-1 items-center">
                  <NewsIndicator score={0} trend="down" />
                  <NewsIndicator score={1} trend="stable" />
                  <NewsIndicator score={2} trend="up" />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-xs">NEWS & Trend Direction</div>
                  <div className="text-slate-600 text-xs mt-0.5">
                    National Early Warning Score + trajectory:<br />
                    <span className="text-green-700 font-semibold">↓↓ Green</span> = Patient improving / stabilizing.<br />
                    <span className="text-slate-700 font-semibold">⇆ Slate</span> = Score unchanged.<br />
                    <span className="text-red-700 font-semibold">↑↑ Red</span> = Deteriorating / escalating NEWS trigger.
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-start gap-3">
                <div className="shrink-0 pt-0.5 flex flex-col gap-1">
                  <TtoBadge status="in_progress" />
                  <TransportBadge status="check_transport" />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-xs">TTO & Transport Bundles</div>
                  <div className="text-slate-600 text-xs mt-0.5">
                    <strong className="text-orange-700 font-semibold">TTO:</strong> To Take Out discharge medications.<br />
                    <strong className="text-red-700 font-semibold">Transport:</strong> Non-emergency ambulance / hospital car booking status.
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-start gap-3">
                <div className="shrink-0 pt-0.5">
                  <div className="w-7 h-7 bg-[#b91c1c] text-white font-black text-base flex items-center justify-center rounded-[2px]">
                    0
                  </div>
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-xs">R2G (Red to Green Days)</div>
                  <div className="text-slate-600 text-xs mt-0.5">
                    SAFER Patient Flow Bundle. Red indicates a delay day (waiting for test, social care or referral); Green indicates value-adding active day.
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-start gap-3">
                <div className="shrink-0 pt-0.5">
                  <PathwaySymbol type="clipboard_pencil" />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-xs">Pathway / Clinical Plan</div>
                  <div className="text-slate-600 text-xs mt-0.5">
                    Indicates dedicated clinical assessment documentation, virtual ward pathway or discharge lounge handover attached.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-sky-50 border border-sky-200 rounded-md text-xs text-sky-900">
            <strong>Simulation Facilitator Note:</strong> Click the Padlock icon in the top right and enter password <code className="bg-sky-200 px-1 py-0.5 rounded font-mono font-bold">Admin</code> to modify patient names, scores, symbols, or bed availability for your simulation scenario.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#044b70] hover:bg-[#033b58] rounded-md transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
