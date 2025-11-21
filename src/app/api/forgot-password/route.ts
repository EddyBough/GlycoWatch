import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { sendResetEmail } from "../../../../lib/sendResetEmail";

export async function POST(req: NextRequest) {
  const appUrl = process.env.APP_URL || "http://localhost:3000";

  try {
    let email: string;

    // verification if content is JSON or x-www-form-urlencoded
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = await req.json();
      email = body.email;
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      email = formData.get("email") as string;
    } else {
      return NextResponse.redirect(`${appUrl}/error-unsupported-format`, 303);
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.redirect(`${appUrl}/user-not-found`, 303);
    }

    await sendResetEmail(email);

    return NextResponse.redirect(`${appUrl}/email-sent-success`, 303);
  } catch (error) {
    return NextResponse.redirect(`${appUrl}/`, 303);
  }
}
