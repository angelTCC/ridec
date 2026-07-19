import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const evento = await prisma.evento.findUnique({
    where: { id: Number(id) },
  });

  if (!evento) {
    return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
  }

  return NextResponse.json(evento);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const evento = await prisma.evento.update({
    where: { id: Number(id) },
    data: {
      title: body.title,
      description: body.description,
      date: body.date ? new Date(body.date) : undefined,
      category: body.category,
      tagLabel: body.tagLabel,
      image: body.image,
      location: body.location,
      featured: body.featured,
    },
  });

  return NextResponse.json(evento);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.evento.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
