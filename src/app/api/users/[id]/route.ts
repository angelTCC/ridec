import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { status, role } = body;

  const data: Record<string, string> = {};
  if (status) data.status = status;
  if (role) data.role = role;

  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      university: true,
      role: true,
      status: true,
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
