import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const ods = await prisma.ods.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(ods);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const ods = await prisma.ods.create({ data: body });
  return NextResponse.json(ods, { status: 201 });
}
