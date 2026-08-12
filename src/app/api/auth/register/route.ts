import { NextResponse } from "next/server";
import { registerSchema } from "@/schemas/auth.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Datos inválidos",
          errors: result.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const data = result.data;

    console.log("Usuario válido:", data);

    return NextResponse.json(
      {
        message: "Registro recibido correctamente",
        user: {
          name: data.name,
          email: data.email,
        },
      },
      {
        status: 201,
      },
    );
  } catch {
    return NextResponse.json(
      {
        message: "Error interno del servidor",
      },
      {
        status: 500,
      },
    );
  }
}
