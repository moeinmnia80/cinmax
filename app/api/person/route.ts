import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";
import { decrypt } from "@/lib/session";

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get("session")?.value;
  const session = (await decrypt(cookie)) || null;

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search")?.trim();

  try {
    if (!session?.userId) {
      return NextResponse.json(
        { error: "Unauthorized - Please log in to continue" },
        { status: 401 },
      );
    }

    if (!search) {
      return NextResponse.json({ success: true, persons: [] });
    }

    const persons = await db.person.findMany({
      where: {
        role: "Actor",
        name: { contains: search, mode: "insensitive" },
      },
      select: { id: true, name: true, image: true },
      take: 8,
    });

    if (!persons) {
      return NextResponse.json({ error: "person not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      persons,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
