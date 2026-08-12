import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { role } = body;

  const data: Record<string, string> = {};
  if (role) data.role = role;

  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.user.delete({ where: { id: parseInt(id) } });

  return NextResponse.json({ message: "Usuario eliminado" });
}
