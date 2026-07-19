import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  const published = searchParams.get("published");

  const where: Record<string, unknown> = {};
  if (published !== "false") where.published = true;
  if (tag) where.tags = { contains: tag };

  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const slug = body.slug || body.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const post = await prisma.blogPost.create({
    data: {
      title: body.title,
      slug,
      content: body.content,
      author: body.author,
      image: body.image || null,
      tags: body.tags || "",
      published: body.published ?? false,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
