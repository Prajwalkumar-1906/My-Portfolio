import { PROFILE } from "@/data/profile";

export function generateVCardString(): string {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${PROFILE.fullName}`,
    `N:Madiwal;Prajwalkumar;;;`,
    `TITLE:${PROFILE.title}`,
    `ORG:ABB (AI Intern) / Rajarajeswari College of Engineering`,
    `EMAIL;TYPE=INTERNET,PREF:${PROFILE.email}`,
    `URL;TYPE=LinkedIn:${PROFILE.linkedin}`,
    `URL;TYPE=GitHub:${PROFILE.github}`,
    `URL;TYPE=Instagram:${PROFILE.instagram}`,
    `URL;TYPE=Twitter/X:${PROFILE.twitter}`,
    `ADR;TYPE=WORK,POSTAL,PARCEL:;;Bengaluru;Karnataka;;India`,
    `NOTE:AI/ML & Full-Stack Engineer | Data & Business Analyst | Public Speaker | PlaceWise & Chukta Architect`,
    "END:VCARD"
  ].join("\r\n");
}

export function downloadVCard(): void {
  if (typeof window === "undefined") return;
  const vcard = generateVCardString();
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Prajwalkumar_Madiwal.vcf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
