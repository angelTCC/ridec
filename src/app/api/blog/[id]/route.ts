import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { id: Number(id) },
  });

  if (!post) {
    return NextResponse.json({ error: "Post no encontrado" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const post = await prisma.blogPost.update({
    where: { id: Number(id) },
    data: {
      title: body.title,
      slug: body.slug,
      content: body.content,
      author: body.author,
      image: body.image,
      tags: body.tags,
      published: body.published,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.blogPost.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
