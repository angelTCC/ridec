import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          message: "No autenticado",
        },
        {
          status: 401,
        },
      );
    }

    const payload = await verifyToken(token);

    const userId = Number(payload.sub);

    if (!userId) {
      return NextResponse.json(
        {
          message: "Token inválido",
        },
        {
          status: 401,
        },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Usuario no encontrado",
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.json({
      user,
    });
  } catch (error) {
    console.error("Error en /api/auth/me:", error);

    return NextResponse.json(
      {
        message: "Sesión inválida",
      },
      {
        status: 401,
      },
    );
  }
}
