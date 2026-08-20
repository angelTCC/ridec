import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const oportunidad = await prisma.oportunidad.findUnique({
    where: { id: Number(id) },
  });

  if (!oportunidad) {
    return NextResponse.json({ error: "Oportunidad no encontrada" }, { status: 404 });
  }

  return NextResponse.json(oportunidad);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const oportunidad = await prisma.oportunidad.update({
    where: { id: Number(id) },
    data: {
      title: body.title,
      description: body.description,
      deadline: body.deadline ? new Date(body.deadline) : null,
      type: body.type,
      externalLink: body.externalLink,
      image: body.image,
      year: body.year,
    },
  });

  return NextResponse.json(oportunidad);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.oportunidad.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
