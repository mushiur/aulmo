export type ChatQA = {
  question: string;
  answer: string;
  href?: string;
  hrefLabel?: string;
};

export const CHAT_INTRO =
  "Hi, I'm the AULMO desk assistant. Pick a question below and I'll answer right away.";

const MAPS_QUERY = "Aulmo Electric Company, Nawabpur Road, Dhaka 1100, Bangladesh";
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;
const PHONE_TEL = "tel:+8801720310552";

// Fixed, client-supplied Q&A — same real details already used on the Contact
// page (src/app/contact/page.tsx). Kept in sync manually since this is a
// small, static set; not worth a shared data module for four lines.
export const CHAT_QA: ChatQA[] = [
  {
    question: "Where is your shop located?",
    answer: "Khaza Electric Market, 153 Nawabpur Rd, Dhaka 1100, Bangladesh.",
    href: MAPS_LINK,
    hrefLabel: "Open in Google Maps",
  },
  {
    question: "What's your contact number?",
    answer: "01720-310552 — call anytime during business hours.",
    href: PHONE_TEL,
    hrefLabel: "Call now",
  },
  {
    question: "Who is the owner?", 
    answer: "Baiged Ahmed Pranto, Owner of AULMO Electric Company.",
  },
  {
    question: "Can I get a product catalog?",
    answer: "Please call or visit our shop for the full catalog.",
    href: PHONE_TEL,
    hrefLabel: "Call now",
  },
];
