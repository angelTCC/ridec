import { prisma } from "@/lib/prisma";
import OportunidadesClient from "./OportunidadesClient";

export default async function OportunidadesPage() {
  const oportunidades = await prisma.oportunidad.findMany({
    orderBy: { deadline: "asc" },
  });

  const serialized = oportunidades.map((o) => ({
    ...o,
    deadline: o.deadline?.toISOString() ?? null,
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
  }));

  return <OportunidadesClient oportunidades={serialized} />;
}
