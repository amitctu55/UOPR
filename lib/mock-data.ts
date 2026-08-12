export const appointments = [
  {
    id: "apt-1",
    patient: "Amelia Chen",
    doctor: "Dr. Marcus Webb",
    specialty: "Cardiology",
    type: "Video",
    status: "Confirmed",
    start: "2026-08-08T14:30:00",
    end: "2026-08-08T15:00:00",
    location: "Telemedicine Room A",
  },
  {
    id: "apt-2",
    patient: "James Okonkwo",
    doctor: "Dr. Lena Park",
    specialty: "Dermatology",
    type: "In-person",
    status: "Pending",
    start: "2026-08-09T09:00:00",
    end: "2026-08-09T09:30:00",
    location: "Clinic 2B",
  },
  {
    id: "apt-3",
    patient: "Sofia Alvarez",
    doctor: "Dr. Marcus Webb",
    specialty: "Cardiology",
    type: "Follow-up",
    status: "Confirmed",
    start: "2026-08-10T11:00:00",
    end: "2026-08-10T11:30:00",
    location: "Wing C · Room 312",
  },
  {
    id: "apt-4",
    patient: "Amelia Chen",
    doctor: "Dr. Priya Shah",
    specialty: "Primary Care",
    type: "In-person",
    status: "Completed",
    start: "2026-08-02T10:00:00",
    end: "2026-08-02T10:30:00",
    location: "Main Campus",
  },
  {
    id: "apt-5",
    patient: "Noah Kim",
    doctor: "Dr. Marcus Webb",
    specialty: "Cardiology",
    type: "Video",
    status: "Waiting",
    start: "2026-08-08T15:30:00",
    end: "2026-08-08T16:00:00",
    location: "Telemedicine Queue",
  },
];

export const patients = [
  {
    id: "p-1",
    name: "Amelia Chen",
    age: 34,
    gender: "Female",
    bloodType: "A+",
    allergies: ["Penicillin", "Peanuts"],
    conditions: ["Hypertension", "Seasonal asthma"],
    medications: ["Lisinopril 10mg", "Albuterol inhaler"],
    lastVisit: "2026-08-02",
    mrn: "MRN-88421",
  },
  {
    id: "p-2",
    name: "James Okonkwo",
    age: 47,
    gender: "Male",
    bloodType: "O+",
    allergies: ["None known"],
    conditions: ["Type 2 diabetes"],
    medications: ["Metformin 500mg"],
    lastVisit: "2026-07-28",
    mrn: "MRN-77210",
  },
  {
    id: "p-3",
    name: "Sofia Alvarez",
    age: 29,
    gender: "Female",
    bloodType: "B-",
    allergies: ["Latex"],
    conditions: ["Migraine"],
    medications: ["Sumatriptan PRN"],
    lastVisit: "2026-07-15",
    mrn: "MRN-90112",
  },
  {
    id: "p-4",
    name: "Noah Kim",
    age: 61,
    gender: "Male",
    bloodType: "AB+",
    allergies: ["Sulfa drugs"],
    conditions: ["Atrial fibrillation", "Hyperlipidemia"],
    medications: ["Apixaban 5mg", "Atorvastatin 20mg"],
    lastVisit: "2026-08-05",
    mrn: "MRN-55690",
  },
];

export const invoices = [
  {
    id: "INV-2041",
    patient: "Amelia Chen",
    date: "2026-08-02",
    amount: 240,
    status: "Paid",
    insurer: "BlueCare Plus",
    description: "Primary care visit + labs",
  },
  {
    id: "INV-2048",
    patient: "Amelia Chen",
    date: "2026-08-08",
    amount: 120,
    status: "Due",
    insurer: "BlueCare Plus",
    description: "Cardiology telemedicine consult",
  },
  {
    id: "INV-2033",
    patient: "James Okonkwo",
    date: "2026-07-28",
    amount: 380,
    status: "Insurance pending",
    insurer: "Harbor Health",
    description: "Dermatology procedure",
  },
  {
    id: "INV-2050",
    patient: "Noah Kim",
    date: "2026-08-05",
    amount: 520,
    status: "Partial",
    insurer: "Summit Mutual",
    description: "Cardiac monitoring + EKG",
  },
];

export const messages = [
  {
    id: "m-1",
    from: "Dr. Marcus Webb",
    preview: "Your lab results look stable. Let's discuss at tomorrow's visit.",
    time: "10:24 AM",
    unread: true,
    thread: [
      { id: "t1", sender: "Dr. Marcus Webb", body: "Hi Amelia — I reviewed your latest panels.", time: "10:20 AM" },
      { id: "t2", sender: "Dr. Marcus Webb", body: "Your lab results look stable. Let's discuss at tomorrow's visit.", time: "10:24 AM" },
      { id: "t3", sender: "Amelia Chen", body: "Thank you, doctor. Should I continue the same dosage?", time: "10:31 AM" },
    ],
  },
  {
    id: "m-2",
    from: "Billing Support",
    preview: "Your insurance claim INV-2048 is under review.",
    time: "Yesterday",
    unread: true,
    thread: [
      { id: "t1", sender: "Billing Support", body: "Your insurance claim INV-2048 is under review.", time: "Yesterday" },
    ],
  },
  {
    id: "m-3",
    from: "Dr. Priya Shah",
    preview: "Reminder: fasting labs before your next appointment.",
    time: "Mon",
    unread: false,
    thread: [
      { id: "t1", sender: "Dr. Priya Shah", body: "Reminder: fasting labs before your next appointment.", time: "Mon" },
    ],
  },
];

export const vitals = [
  { label: "Blood pressure", value: "128/82", unit: "mmHg", trend: "stable" },
  { label: "Heart rate", value: "72", unit: "bpm", trend: "down" },
  { label: "SpO₂", value: "98", unit: "%", trend: "stable" },
  { label: "Weight", value: "142", unit: "lb", trend: "down" },
];

export const healthTrend = [
  { month: "Mar", bp: 138, hr: 78 },
  { month: "Apr", bp: 134, hr: 76 },
  { month: "May", bp: 131, hr: 74 },
  { month: "Jun", bp: 129, hr: 73 },
  { month: "Jul", bp: 128, hr: 72 },
  { month: "Aug", bp: 126, hr: 71 },
];

export const departmentStats = [
  { name: "Cardiology", patients: 182, utilization: 86 },
  { name: "Emergency", patients: 240, utilization: 94 },
  { name: "Pediatrics", patients: 156, utilization: 72 },
  { name: "Orthopedics", patients: 121, utilization: 68 },
  { name: "Radiology", patients: 98, utilization: 81 },
];

export const staff = [
  { id: "s-1", name: "Dr. Marcus Webb", role: "Cardiologist", dept: "Cardiology", status: "On duty", shift: "07:00–19:00" },
  { id: "s-2", name: "Dr. Lena Park", role: "Dermatologist", dept: "Dermatology", status: "In clinic", shift: "08:00–16:00" },
  { id: "s-3", name: "Nurse Ava Brooks", role: "RN", dept: "Emergency", status: "On duty", shift: "19:00–07:00" },
  { id: "s-4", name: "Dr. Priya Shah", role: "PCP", dept: "Primary Care", status: "Off", shift: "—" },
];

export const systemServices = [
  { name: "API Gateway", status: "Operational", latency: "42ms", uptime: "99.99%" },
  { name: "EHR Service", status: "Operational", latency: "68ms", uptime: "99.97%" },
  { name: "Telemedicine SFU", status: "Degraded", latency: "210ms", uptime: "99.82%" },
  { name: "Billing Engine", status: "Operational", latency: "55ms", uptime: "99.95%" },
  { name: "Notification Bus", status: "Operational", latency: "31ms", uptime: "99.99%" },
  { name: "Auth / MFA", status: "Operational", latency: "28ms", uptime: "100%" },
];

export const auditLogs = [
  { id: "a1", actor: "Jordan Hale", action: "Updated RBAC policy", target: "role:hospital", time: "2 min ago" },
  { id: "a2", actor: "Priya Nair", action: "Allocated beds", target: "Emergency · +6", time: "18 min ago" },
  { id: "a3", actor: "Dr. Marcus Webb", action: "Signed SOAP note", target: "MRN-88421", time: "41 min ago" },
  { id: "a4", actor: "System", action: "Backup completed", target: "region:us-east-1", time: "1 hr ago" },
];

export const alerts = [
  { id: "al1", severity: "high", title: "Telemedicine SFU latency elevated", detail: "p95 > 200ms for 12 minutes", time: "4m" },
  { id: "al2", severity: "medium", title: "Bed capacity warning", detail: "Emergency at 94% utilization", time: "22m" },
  { id: "al3", severity: "low", title: "Certificate rotation due", detail: "Auth TLS cert expires in 18 days", time: "2h" },
];

export const partners = [
  "Northshore Medical",
  "Harbor Clinics",
  "Summit Mutual",
  "BlueCare Plus",
  "MediLink Labs",
  "CareBridge Network",
];

export const testimonials = [
  {
    quote:
      "UPCHAR replaced three disconnected tools. Our clinicians spend less time clicking and more time with patients.",
    name: "Priya Nair",
    role: "Hospital Administrator, Northshore Medical",
  },
  {
    quote:
      "The telemedicine room feels purpose-built — stable video, chart context, and prescribing without tab chaos.",
    name: "Dr. Marcus Webb",
    role: "Cardiologist",
  },
  {
    quote:
      "I finally understand my appointments, bills, and messages in one calm place.",
    name: "Amelia Chen",
    role: "Patient",
  },
];

export const features = [
  {
    title: "Care coordination",
    description: "Appointments, reminders, and video visits orchestrated across roles without duplicate data entry.",
    icon: "calendar",
  },
  {
    title: "Living EHR",
    description: "SOAP notes, vitals, allergies, and labs that stay synchronized for every clinician at the bedside.",
    icon: "file",
  },
  {
    title: "Telemedicine that stays clinical",
    description: "Video, chat, screen share, and file exchange in a room designed for clinical workflows.",
    icon: "video",
  },
  {
    title: "Billing with clarity",
    description: "Invoices, insurance claims, and payment history patients and admins can actually follow.",
    icon: "receipt",
  },
  {
    title: "Operations insight",
    description: "Real-time department load, staffing, and system health — before issues become incidents.",
    icon: "activity",
  },
  {
    title: "Security by default",
    description: "JWT sessions, RBAC, MFA, and audit trails that satisfy compliance without slowing care.",
    icon: "shield",
  },
];
