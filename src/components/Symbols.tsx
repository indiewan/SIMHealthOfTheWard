import React from 'react';
import { MobilityStatus, NewsTrend, PathwayType, ReferralType, TtoStatus, TransportStatus } from '../types';

/**
 * Amber square with silhouette of a person slipping and falling backwards
 */
export const FallsSymbol: React.FC<{ size?: number }> = ({ size = 26 }) => {
  return (
    <div
      className="inline-flex items-center justify-center bg-[#eab308] rounded-[3px] border border-[#ca8a04]/40 shadow-xs"
      style={{ width: size, height: size }}
      title="FALLS: High Falls Risk assessment logged"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[82%] h-[82%] text-neutral-950"
      >
        {/* Head */}
        <circle cx="16" cy="5.5" r="2.2" />
        {/* Torso tilted back */}
        <path d="M12.5 10.2c-.3-.8-.9-1.4-1.7-1.7l-2.4-.8c-.6-.2-1.3.1-1.5.7-.2.6.1 1.3.7 1.5l1.8.6-2.1 4.5c-.3.7 0 1.5.7 1.8.7.3 1.5 0 1.8-.7l1.7-3.6 1.8 1.4-1.2 4.2c-.2.7.2 1.5.9 1.7.7.2 1.5-.2 1.7-.9l1.5-5.2c.1-.4 0-.8-.3-1.1l-2.9-2.3z" />
        {/* Arms splayed */}
        <path d="M13.2 8.8l3.2-2.1c.6-.4 1.4-.2 1.8.4.4.6.2 1.4-.4 1.8l-3.5 2.3c-.5.3-1.1.1-1.4-.4-.3-.6-.1-1.4.3-2z" />
        {/* Slip impact marks */}
        <path d="M3.5 19.5h16.5c.6 0 1 .4 1 1s-.4 1-1 1H3.5c-.6 0-1-.4-1-1s.4-1 1-1z" opacity="0.65" />
      </svg>
    </div>
  );
};

/**
 * Forest green square with black fork and knife silhouette (Malnutrition Universal Screening Tool)
 */
export const MustSymbol: React.FC<{ size?: number }> = ({ size = 26 }) => {
  return (
    <div
      className="inline-flex items-center justify-center bg-[#15803d] rounded-[3px] border border-[#166534] shadow-xs"
      style={{ width: size, height: size }}
      title="MUST: Malnutrition risk screening completed"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[80%] h-[80%] text-neutral-950"
      >
        {/* Fork on left */}
        <path d="M8 2.5v4.5c0 .8-.5 1.5-1.2 1.8V19c0 .6-.4 1-1 1s-1-.4-1-1V8.8C4.1 8.5 3.5 7.8 3.5 7V2.5c0-.3.2-.5.5-.5s.5.2.5.5V6h1V2.5c0-.3.2-.5.5-.5s.5.2.5.5V6h1V2.5c0-.3.2-.5.5-.5s.5.2.5.5z" />
        {/* Knife on right */}
        <path d="M18.5 2.5c-1.8 0-3 1.5-3 3.5v4.5h1V19c0 .6.4 1 1 1s1-.4 1-1V2.5h0z" />
      </svg>
    </div>
  );
};

/**
 * Mobility: Independent (bold green checkmark) vs Assistance Needed (bold red cross)
 */
export const MobilitySymbol: React.FC<{ status: MobilityStatus; size?: number }> = ({
  status,
  size = 22,
}) => {
  if (status === 'none') return null;

  if (status === 'independent') {
    return (
      <div className="inline-flex items-center justify-center" title="Mobility: Independent (Green Tick)">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#16a34a"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: size, height: size }}
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center justify-center" title="Mobility: Assistance Required / Impaired (Red Cross)">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#dc2626"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: size, height: size }}
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </div>
  );
};

/**
 * Patient Referral symbols (PTOT Green Star, PTOT Red Circle, etc.)
 */
export const ReferralSymbol: React.FC<{ type: ReferralType; size?: number }> = ({
  type,
  size = 28,
}) => {
  if (type === 'none') return null;

  if (type === 'ptot_star_green') {
    return (
      <div
        className="relative inline-flex items-center justify-center"
        style={{ width: size, height: size }}
        title="Physiotherapy / Occupational Therapy Referral (Active)"
      >
        <svg viewBox="0 0 24 24" fill="#15803d" className="w-full h-full drop-shadow-xs">
          <polygon points="12,1.5 15.2,8.2 22.5,9.2 17.2,14.3 18.5,21.5 12,18.1 5.5,21.5 6.8,14.3 1.5,9.2 8.8,8.2" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[7.5px] font-black tracking-tighter text-white select-none pt-0.5">
          PTOT
        </span>
      </div>
    );
  }

  if (type === 'ptot_circle_red') {
    return (
      <div
        className="relative inline-flex items-center justify-center bg-[#dc2626] rounded-full border border-red-700 shadow-xs"
        style={{ width: size - 3, height: size - 3 }}
        title="Physiotherapy / Occupational Therapy Referral (Urgent / Pending Review)"
      >
        <span className="text-[8px] font-black tracking-tighter text-white select-none">
          PTOT
        </span>
      </div>
    );
  }

  if (type === 'slt') {
    return (
      <div
        className="inline-flex items-center justify-center bg-[#7c3aed] text-white px-1 py-0.5 rounded text-[8px] font-bold"
        title="Speech and Language Therapy Referral"
      >
        SLT
      </div>
    );
  }

  if (type === 'dietitian') {
    return (
      <div
        className="inline-flex items-center justify-center bg-[#0284c7] text-white px-1 py-0.5 rounded text-[8px] font-bold"
        title="Dietitian Referral"
      >
        DIET
      </div>
    );
  }

  return null;
};

/**
 * NEWS score and trend arrow indicator (improving, stable, deteriorating)
 */
export const NewsIndicator: React.FC<{ score: number; trend: NewsTrend }> = ({
  score,
  trend,
}) => {
  // Score color logic
  let scoreColor = 'text-[#0284c7]'; // default blue/teal
  if (score >= 3 && score < 5) scoreColor = 'text-[#d97706]'; // amber
  if (score >= 5) scoreColor = 'text-[#dc2626]'; // red

  return (
    <div className="inline-flex items-center gap-1.5 font-sans">
      <span className={`text-base font-bold tabular-nums ${scoreColor}`}>
        {score}
      </span>
      {trend === 'down' && (
        <div
          className="w-5 h-6 bg-[#15803d] rounded-[2px] flex items-center justify-center shadow-xs"
          title="NEWS Improving (Down arrows)"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" className="w-3.5 h-4">
            {/* Double down arrows */}
            <path d="M7 4v11m0 0l-3-3m3 3l3-3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 4v11m0 0l-3-3m3 3l3-3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      {trend === 'stable' && (
        <div
          className="w-5 h-6 bg-[#cbd5e1] border border-slate-300 rounded-[2px] flex items-center justify-center shadow-xs"
          title="NEWS Stable (Horizontal arrows)"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="3.2" className="w-4 h-4">
            <path d="M4 8h15M15 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 16H5M9 20l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      {trend === 'up' && (
        <div
          className="w-5 h-6 bg-[#dc2626] rounded-[2px] flex items-center justify-center shadow-xs"
          title="NEWS Deteriorating (Red Up arrows)"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" className="w-3.5 h-4">
            {/* Double up arrows */}
            <path d="M7 20V9m0 0l-3 3m3-3l3 3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 20V9m0 0l-3 3m3-3l3 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  );
};

/**
 * Pathway document/notes symbol
 */
export const PathwaySymbol: React.FC<{ type: PathwayType }> = ({ type }) => {
  if (type === 'none') return null;

  if (type === 'clipboard_pencil') {
    return (
      <div className="inline-flex items-center justify-center text-[#2563eb]" title="Clinical Pathway & Care Plan Document">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" opacity="0.9" />
          <path d="M18.8 6.2l-1.5-1.5c-.2-.2-.5-.2-.7 0l-1 1 2.2 2.2 1-1c.2-.2.2-.5 0-.7z" />
        </svg>
      </div>
    );
  }

  return null;
};

/**
 * TTO Status Badge
 */
export const TtoBadge: React.FC<{ status: TtoStatus }> = ({ status }) => {
  if (status === 'none') return null;

  if (status === 'in_progress') {
    return (
      <span className="inline-block bg-[#ea580c] text-white text-[11px] font-bold px-2 py-1.5 rounded-[3px] shadow-xs whitespace-nowrap leading-tight text-center">
        In<br />Progress
      </span>
    );
  }

  if (status === 'complete') {
    return (
      <span className="inline-block bg-[#16a34a] text-white text-[11px] font-bold px-2 py-1.5 rounded-[3px] shadow-xs whitespace-nowrap leading-tight text-center">
        TTO<br />Ready
      </span>
    );
  }

  if (status === 'awaiting_pharmacy') {
    return (
      <span className="inline-block bg-[#d97706] text-white text-[11px] font-bold px-2 py-1.5 rounded-[3px] shadow-xs whitespace-nowrap leading-tight text-center">
        Awaiting<br />Pharm
      </span>
    );
  }

  return null;
};

/**
 * Transport Status Badge
 */
export const TransportBadge: React.FC<{ status: TransportStatus }> = ({ status }) => {
  if (status === 'none') return null;

  if (status === 'check_transport') {
    return (
      <span className="inline-block bg-[#b91c1c] text-white text-[11px] font-bold px-2 py-1.5 rounded-[3px] shadow-xs whitespace-nowrap leading-tight text-center">
        Check<br />Transport
      </span>
    );
  }

  if (status === 'booked') {
    return (
      <span className="inline-block bg-[#16a34a] text-white text-[11px] font-bold px-2 py-1.5 rounded-[3px] shadow-xs whitespace-nowrap leading-tight text-center">
        Transport<br />Booked
      </span>
    );
  }

  if (status === 'not_required') {
    return (
      <span className="inline-block text-slate-500 text-[10px] font-medium leading-tight text-center">
        Own<br />Transport
      </span>
    );
  }

  return null;
};

/**
 * R2G Badge (Red to Green bundle)
 */
export const R2GBadge: React.FC<{ score: number; status?: 'red' | 'green' | 'amber' }> = ({
  score,
  status = 'red',
}) => {
  let bg = 'bg-[#b91c1c]';
  if (status === 'green') bg = 'bg-[#15803d]';
  if (status === 'amber') bg = 'bg-[#d97706]';

  return (
    <div
      className={`w-7 h-7 ${bg} text-white font-black text-lg flex items-center justify-center rounded-[2px] shadow-inner select-none`}
      title="R2G: Red to Green Day Status"
    >
      {score}
    </div>
  );
};
