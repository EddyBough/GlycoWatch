import { NextRequest, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";
import bcrypt from "bcrypt";
import prisma from "../../../../lib/prisma";
import { parse } from "querystring";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let body: any;

    if (contentType.includes("application/json")) {
      body = await req.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      body = parse(text);
    } else {
      return NextResponse.redirect(
        `${process.env.APP_URL}/password-update-failed`
      );
    }

    const { token, password } = body;

    const decoded: any = await decode({
      token,
      secret: process.env.NEXTAUTH_SECRET || "",
    });

    if (!decoded?.email) {
      return NextResponse.redirect(
        `${process.env.APP_URL}/password-update-failed`
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email: decoded.email },
      data: { password: hashedPassword },
    });

    return NextResponse.redirect(
      `${process.env.APP_URL}/password-updated-success`
    );
  } catch (error) {
    console.error("Erreur :", error);
    return NextResponse.redirect(
      `${process.env.APP_URL}/password-update-failed`
    );
  }
}
