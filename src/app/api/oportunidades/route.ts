import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year");
  const type = searchParams.get("type");

  const where: Record<string, unknown> = {};
  if (year) where.year = Number(year);
  if (type) where.type = type;

  const oportunidades = await prisma.oportunidad.findMany({
    where,
    orderBy: { deadline: "asc" },
  });

  return NextResponse.json(oportunidades);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const oportunidad = await prisma.oportunidad.create({
    data: {
      title: body.title,
      description: body.description,
      deadline: body.deadline ? new Date(body.deadline) : null,
      type: body.type,
      externalLink: body.externalLink || null,
      image: body.image || null,
      year: body.year,
    },
  });

  return NextResponse.json(oportunidad, { status: 201 });
}
