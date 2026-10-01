import React, { useState, useRef, useEffect } from 'react';
import {
  FallsSymbol,
  MustSymbol,
  MobilitySymbol,
  ReferralSymbol,
  NewsIndicator,
  TtoBadge,
  TransportBadge,
  PathwaySymbol,
} from './Symbols';
import { MobilityStatus, NewsTrend, PathwayType, ReferralType, TransportStatus, TtoStatus } from '../types';

interface SymbolDropdownProps<T> {
  value: T;
  options: {
    label: string;
    value: T;
    renderPreview: () => React.ReactNode;
  }[];
  onChange: (newValue: T) => void;
  title: string;
  children: React.ReactNode;
}

export function SymbolDropdown<T>({
  value,
  options,
  onChange,
  title,
  children,
}: SymbolDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full min-h-[32px] flex items-center justify-center p-1 rounded hover:bg-sky-100/80 transition-colors cursor-pointer group focus:outline-hidden focus:ring-1 focus:ring-sky-400"
        title={`Click to change ${title}`}
      >
        {children}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 text-[9px] text-sky-700 font-bold">
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 left-1/2 -translate-x-1/2 mt-1 min-w-[170px] bg-white border border-slate-300 rounded-md shadow-2xl py-1 text-slate-800 text-xs font-sans text-left">
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 bg-slate-50">
            Select {title}
          </div>
          <div className="max-h-56 overflow-y-auto">
            {options.map((option, idx) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-2.5 py-1.5 flex items-center gap-2.5 hover:bg-sky-50 transition-colors text-left cursor-pointer ${
                    isSelected ? 'bg-sky-100/70 font-semibold text-sky-950' : 'text-slate-700'
                  }`}
                >
                  <div className="w-7 flex items-center justify-center shrink-0">
                    {option.renderPreview()}
                  </div>
                  <span className="truncate">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Pre-configured dropdowns for each clinical column:

export const FallsPicker: React.FC<{
  value: boolean;
  onChange: (val: boolean) => void;
}> = ({ value, onChange }) => {
  return (
    <SymbolDropdown<boolean>
      value={value}
      onChange={onChange}
      title="Falls Risk"
      options={[
        { label: 'No Falls Flag', value: false, renderPreview: () => <span className="text-slate-400 text-xs">—</span> },
        { label: 'Falls Risk (Amber)', value: true, renderPreview: () => <FallsSymbol size={22} /> },
      ]}
    >
      {value ? <FallsSymbol /> : <span className="text-slate-300 text-xs">—</span>}
    </SymbolDropdown>
  );
};

export const MustPicker: React.FC<{
  value: boolean;
  onChange: (val: boolean) => void;
}> = ({ value, onChange }) => {
  return (
    <SymbolDropdown<boolean>
      value={value}
      onChange={onChange}
      title="MUST Nutrition"
      options={[
        { label: 'No MUST Flag', value: false, renderPreview: () => <span className="text-slate-400 text-xs">—</span> },
        { label: 'MUST Flag (Knife & Fork)', value: true, renderPreview: () => <MustSymbol size={22} /> },
      ]}
    >
      {value ? <MustSymbol /> : <span className="text-slate-300 text-xs">—</span>}
    </SymbolDropdown>
  );
};

export const MobilityPicker: React.FC<{
  value: MobilityStatus;
  onChange: (val: MobilityStatus) => void;
}> = ({ value, onChange }) => {
  return (
    <SymbolDropdown<MobilityStatus>
      value={value}
      onChange={onChange}
      title="Mobility Status"
      options={[
        { label: 'Independent (Green Tick)', value: 'independent', renderPreview: () => <MobilitySymbol status="independent" size={18} /> },
        { label: 'Assistance Needed (Red Cross)', value: 'assistance_needed', renderPreview: () => <MobilitySymbol status="assistance_needed" size={18} /> },
        { label: 'None / Not Logged', value: 'none', renderPreview: () => <span className="text-slate-400 text-xs">—</span> },
      ]}
    >
      {value !== 'none' ? <MobilitySymbol status={value} /> : <span className="text-slate-300 text-xs">—</span>}
    </SymbolDropdown>
  );
};

export const ReferralPicker: React.FC<{
  value: ReferralType;
  onChange: (val: ReferralType) => void;
}> = ({ value, onChange }) => {
  return (
    <SymbolDropdown<ReferralType>
      value={value}
      onChange={onChange}
      title="Patient Referral"
      options={[
        { label: 'None', value: 'none', renderPreview: () => <span className="text-slate-400 text-xs">—</span> },
        { label: 'PTOT Star (Green)', value: 'ptot_star_green', renderPreview: () => <ReferralSymbol type="ptot_star_green" size={24} /> },
        { label: 'PTOT Circle (Red)', value: 'ptot_circle_red', renderPreview: () => <ReferralSymbol type="ptot_circle_red" size={24} /> },
        { label: 'SLT (Speech & Lang)', value: 'slt', renderPreview: () => <ReferralSymbol type="slt" /> },
        { label: 'Dietitian', value: 'dietitian', renderPreview: () => <ReferralSymbol type="dietitian" /> },
      ]}
    >
      {value !== 'none' ? <ReferralSymbol type={value} /> : <span className="text-slate-300 text-xs">—</span>}
    </SymbolDropdown>
  );
};

export const NewsTrendPicker: React.FC<{
  trend: NewsTrend;
  score: number;
  onChange: (val: NewsTrend) => void;
}> = ({ trend, score, onChange }) => {
  return (
    <SymbolDropdown<NewsTrend>
      value={trend}
      onChange={onChange}
      title="NEWS Trend Arrow"
      options={[
        { label: 'Improving (Green Down ↓↓)', value: 'down', renderPreview: () => <NewsIndicator score={score} trend="down" /> },
        { label: 'Stable (Slate Horizontal ⇆)', value: 'stable', renderPreview: () => <NewsIndicator score={score} trend="stable" /> },
        { label: 'Deteriorating (Red Up ↑↑)', value: 'up', renderPreview: () => <NewsIndicator score={score} trend="up" /> },
        { label: 'No Trend Arrow', value: 'none', renderPreview: () => <span className="text-slate-700 font-bold">{score}</span> },
      ]}
    >
      <NewsIndicator score={score} trend={trend} />
    </SymbolDropdown>
  );
};

export const TtoPicker: React.FC<{
  value: TtoStatus;
  onChange: (val: TtoStatus) => void;
}> = ({ value, onChange }) => {
  return (
    <SymbolDropdown<TtoStatus>
      value={value}
      onChange={onChange}
      title="TTO Status"
      options={[
        { label: 'None', value: 'none', renderPreview: () => <span className="text-slate-400 text-xs">—</span> },
        { label: 'In Progress (Orange)', value: 'in_progress', renderPreview: () => <TtoBadge status="in_progress" /> },
        { label: 'TTO Ready (Green)', value: 'complete', renderPreview: () => <TtoBadge status="complete" /> },
        { label: 'Awaiting Pharmacy', value: 'awaiting_pharmacy', renderPreview: () => <TtoBadge status="awaiting_pharmacy" /> },
      ]}
    >
      {value !== 'none' ? <TtoBadge status={value} /> : <span className="text-slate-300 text-xs">—</span>}
    </SymbolDropdown>
  );
};

export const TransportPicker: React.FC<{
  value: TransportStatus;
  onChange: (val: TransportStatus) => void;
}> = ({ value, onChange }) => {
  return (
    <SymbolDropdown<TransportStatus>
      value={value}
      onChange={onChange}
      title="Transport Status"
      options={[
        { label: 'None', value: 'none', renderPreview: () => <span className="text-slate-400 text-xs">—</span> },
        { label: 'Check Transport (Red)', value: 'check_transport', renderPreview: () => <TransportBadge status="check_transport" /> },
        { label: 'Transport Booked (Green)', value: 'booked', renderPreview: () => <TransportBadge status="booked" /> },
        { label: 'Own Transport', value: 'not_required', renderPreview: () => <TransportBadge status="not_required" /> },
      ]}
    >
      {value !== 'none' ? <TransportBadge status={value} /> : <span className="text-slate-300 text-xs">—</span>}
    </SymbolDropdown>
  );
};

export const PathwayPicker: React.FC<{
  value: PathwayType;
  onChange: (val: PathwayType) => void;
}> = ({ value, onChange }) => {
  return (
    <SymbolDropdown<PathwayType>
      value={value}
      onChange={onChange}
      title="Pathway Document"
      options={[
        { label: 'None', value: 'none', renderPreview: () => <span className="text-slate-400 text-xs">—</span> },
        { label: 'Document & Pen (Blue)', value: 'clipboard_pencil', renderPreview: () => <PathwaySymbol type="clipboard_pencil" /> },
      ]}
    >
      {value !== 'none' ? <PathwaySymbol type={value} /> : <span className="text-slate-300 text-xs">—</span>}
    </SymbolDropdown>
  );
};
