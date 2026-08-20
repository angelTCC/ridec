import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const stats = await prisma.stat.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(stats);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const stat = await prisma.stat.create({ data: body });
  return NextResponse.json(stat, { status: 201 });
}
