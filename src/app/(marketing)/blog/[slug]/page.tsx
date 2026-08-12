import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  });

  if (!post) notFound();

  return (
    <div className="section-light__inner py-16 space-y-8" style={{ maxWidth: "800px" }}>
      <Link href="/blog" className="btn btn--ghost btn--sm" style={{ color: "var(--c-secondary)" }}>
        ← Volver al blog
      </Link>

      <article>
        <h1 className="section-header__title" style={{ textAlign: "left" }}>
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-slate-500 text-sm" style={{ marginBottom: "1.5rem" }}>
          <span>Por {post.author}</span>
          <span>·</span>
          <span>
            {new Date(post.createdAt).toLocaleDateString("es-PE", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={400}
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius-lg)", marginBottom: "1.5rem" }}
          />
        )}

        {post.tags && (
          <div className="flex gap-2 flex-wrap" style={{ marginBottom: "1.5rem" }}>
            {post.tags.split(",").map((tag) => (
              <span key={tag} className="event-card__tag event-card__tag--ec">
                {tag.trim()}
              </span>
            ))}
          </div>
        )}

        <div
          className="blog-content"
          style={{ lineHeight: "1.8", color: "var(--c-text)" }}
          dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
        />
      </article>
    </div>
  );
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 style="margin-top:1.5rem;margin-bottom:0.5rem;font-weight:700;">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="margin-top:2rem;margin-bottom:0.75rem;font-weight:700;font-size:1.5rem;">$1</h2>')
    .replace(/^> (.+)$/gm, '<blockquote style="border-left:3px solid var(--c-cyan);padding-left:1rem;color:var(--c-text-secondary);margin:1rem 0;">$1</blockquote>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li style="margin-left:1.5rem;margin-bottom:0.25rem;">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li style="margin-left:1.5rem;margin-bottom:0.25rem;">$2</li>')
    .replace(/\n\n/g, '<br/><br/>');
}
