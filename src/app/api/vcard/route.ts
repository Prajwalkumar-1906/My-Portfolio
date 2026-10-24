import { NextResponse } from "next/server";
import { generateVCardString } from "@/lib/vcard";

export async function GET() {
  const vcard = generateVCardString();
  return new NextResponse(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Prajwalkumar_Madiwal.vcf"',
      "Cache-Control": "public, max-age=86400"
    }
  });
}
