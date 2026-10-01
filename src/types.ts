export type NewsTrend = 'down' | 'stable' | 'up' | 'none';
export type MobilityStatus = 'independent' | 'assistance_needed' | 'none';
export type ReferralType = 'ptot_star_green' | 'ptot_circle_red' | 'slt' | 'dietitian' | 'none';
export type TtoStatus = 'none' | 'in_progress' | 'complete' | 'awaiting_pharmacy';
export type TransportStatus = 'none' | 'check_transport' | 'booked' | 'not_required';
export type PathwayType = 'none' | 'clipboard_pencil' | 'fast_track' | 'discharge_lounge';

export interface PatientRecord {
  id: string;
  page: 1 | 2 | 3 | 4;
  room: string;             // e.g. "Bay 01", "Bay 02"
  bed: string;              // e.g. "Bed 01", "Bed 02"
  isClosedBed?: boolean;
  closedReason?: string;    // e.g. "Closed Beds (NO BED): Bed Unavailable"
  
  // Patient details
  surname: string;          // e.g. "HARRISON"
  gender: 'M' | 'F';
  initial: string;          // e.g. "J"
  isHighlighted?: boolean;  // Yellow highlight (like CAMPBELL / BROWN)

  // Consultant
  consultant: string;       // e.g. "DR S CHOWDHURY"
  specialty: string;        // e.g. "(ACUTE INTERNAL MEDICINE)"
  consultantBoxed?: boolean;// blue box background (like DR ADAM KIRK)

  // Length of stay
  hospAdmissionDate: string; // e.g. "30/09"
  hospLoSDays: number;       // e.g. 1
  wardAdmissionDate: string; // e.g. "30/09"
  wardLoSDays: number;       // e.g. 1

  // Clinical scores & flags
  r2gScore: number;          // e.g. 0
  r2gStatus?: 'red' | 'green' | 'amber';
  
  newsScore: number;         // e.g. 0, 1, 2, 3
  newsTrend: NewsTrend;      // 'down' (green ↓↓), 'stable' (slate ⇆), 'up' (red ↑↑)

  edrDate?: string;          // Estimated Date of Release e.g. "01/10/26"
  checkboxes?: boolean[];    // 6 checkboxes

  ttoStatus: TtoStatus;      // e.g. 'in_progress'
  transportStatus: TransportStatus; // e.g. 'check_transport'

  fallsRisk: boolean;        // amber falling person icon
  mustRisk: boolean;         // green fork & knife icon
  waterlow: string;          // Waterlow score e.g. "" or "12" or "Low"

  mobility: MobilityStatus;  // 'independent' (green ✔), 'assistance_needed' (red ✖)
  patientReferral: ReferralType; // 'ptot_star_green', 'ptot_circle_red', etc.
  specRef: string;           // 'N' or text
  acuity: string;            // acuity string
  infoCount: number;         // '0'
  pathway: PathwayType;      // 'clipboard_pencil' or 'none'
  notes: string;             // notes
  location: string;          // location code
  allocation: string;        // e.g. 'RBDEN' or empty
}

export interface WardTransferRow {
  title: string;
  transfers: number;
  tci: number;
}
