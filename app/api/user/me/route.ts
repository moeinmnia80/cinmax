import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";
import { decrypt } from "@/lib/session";

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get("session")?.value;
  const session = (await decrypt(cookie)) || null;

  try {
    if (!session?.userId) {
      return NextResponse.json(
        { error: "Unauthorized - Please log in to continue" },
        { status: 401 },
      );
    }

    const userId = session.userId as string;

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
