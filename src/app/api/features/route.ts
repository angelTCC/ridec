import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const features = await prisma.feature.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(features);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const feature = await prisma.feature.create({ data: body });
  return NextResponse.json(feature, { status: 201 });
}
