import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const team = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(team);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const member = await prisma.teamMember.create({ data: body });
  return NextResponse.json(member, { status: 201 });
}
