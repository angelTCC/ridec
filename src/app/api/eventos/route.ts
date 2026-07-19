import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year");
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  const where: Record<string, unknown> = {};

  if (year) {
    where.date = {
      gte: new Date(`${year}-01-01`),
      lt: new Date(`${Number(year) + 1}-01-01`),
    };
  }
  if (category) where.category = category;
  if (featured === "true") where.featured = true;

  const eventos = await prisma.evento.findMany({
    where,
    orderBy: { date: "desc" },
  });

  return NextResponse.json(eventos);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const evento = await prisma.evento.create({
    data: {
      title: body.title,
      description: body.description,
      date: new Date(body.date),
      category: body.category,
      tagLabel: body.tagLabel,
      image: body.image,
      location: body.location || null,
      featured: body.featured ?? false,
    },
  });

  return NextResponse.json(evento, { status: 201 });
}
