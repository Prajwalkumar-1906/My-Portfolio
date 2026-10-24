export interface GuestbookEntry {
  id: string;
  name: string;
  handle?: string;
  avatarColor: string;
  note: string;
  date: string;
  isApproved: boolean;
}

export const APPROVED_GUESTBOOK_ENTRIES: GuestbookEntry[] = [
  {
    id: "wish-1",
    name: "Engineering Peer",
    handle: "RRCE 2026",
    avatarColor: "bg-red-600",
    note: "Great keynote on GenAI and prompt pipelines during the Dream Den workshop! Really inspired our batch.",
    date: "Oct 2026",
    isApproved: true
  },
  {
    id: "wish-2",
    name: "Hackathon Teammate",
    handle: "Vibe2ship Finalist",
    avatarColor: "bg-blue-600",
    note: "PlaceWise architecture is super clean. The Fairlearn equalized odds implementation is top tier.",
    date: "Sep 2026",
    isApproved: true
  },
  {
    id: "wish-3",
    name: "Community Volunteer",
    handle: "OWOF Mission",
    avatarColor: "bg-emerald-600",
    note: "Prajwal's dedication to child welfare and values-based leadership is deeply inspiring.",
    date: "Aug 2026",
    isApproved: true
  }
];
