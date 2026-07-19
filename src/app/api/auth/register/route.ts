import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, password, university } = body;

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Nombre, email y password son obligatorios" },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "El password debe tener al menos 6 caracteres" },
      { status: 400 }
    );
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json(
      { error: "Ya existe una cuenta con este email" },
      { status: 409 }
    );
  }

  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      university: university || null,
      role: "miembro",
      status: "pending",
    },
  });

  return NextResponse.json(
    {
      message: "Registro exitoso. Tu cuenta está pendiente de aprobación por un administrador.",
    },
    { status: 201 }
  );
}
