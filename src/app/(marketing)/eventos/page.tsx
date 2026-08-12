import { prisma } from "@/lib/prisma";
import EventosClient from "./EventosClient";

export default async function EventosPage() {
  const eventos = await prisma.evento.findMany({
    orderBy: { date: "desc" },
  });

  const serialized = eventos.map((e) => ({
    ...e,
    date: e.date.toISOString(),
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }));

  return <EventosClient eventos={serialized} />;
}
