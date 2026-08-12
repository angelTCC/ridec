import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { loginSchema } from "@/schemas/auth.schema";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validar datos
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Datos inválidos",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { email, password } = result.data;

    // 2. Buscar usuario
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // 3. Usuario no existe
    if (!user) {
      return NextResponse.json(
        {
          message: "Correo o contraseña incorrectos",
        },
        { status: 401 },
      );
    }

    // 4. Comparar contraseña
    const passwordValid = await bcrypt.compare(password, user.password);

    // 5. Contraseña incorrecta
    if (!passwordValid) {
      return NextResponse.json(
        {
          message: "Correo o contraseña incorrectos",
        },
        { status: 401 },
      );
    }

    // 6. Login correcto
    return NextResponse.json({
      message: "Login exitoso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Error interno del servidor",
      },
      { status: 500 },
    );
  }
}
