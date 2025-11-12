import { NextRequest, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";
import bcrypt from "bcrypt";
import prisma from "../../../../lib/prisma";
import { parse } from "querystring";

export async function POST(req: NextRequest) {
  const appUrl = process.env.APP_URL || "http://localhost:3000";

  try {
    const contentType = req.headers.get("content-type") || "";

    let body: any;

    if (contentType.includes("application/json")) {
      body = await req.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      body = parse(text);
    } else {
      return NextResponse.redirect(`${appUrl}/password-update-failed`, 303);
    }

    const { token, password } = body;

    const decoded: any = await decode({
      token,
      secret: process.env.NEXTAUTH_SECRET || "",
    });

    if (!decoded?.email) {
      return NextResponse.redirect(`${appUrl}/password-update-failed`, 303);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email: decoded.email },
      data: { password: hashedPassword },
    });

    return NextResponse.redirect(`${appUrl}/password-updated-success`, 303);
  } catch (error) {
    return NextResponse.redirect(`${appUrl}/password-update-failed`, 303);
  }
}
