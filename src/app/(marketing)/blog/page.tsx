import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="section-light__inner py-16 space-y-8">
      <section>
        <h1 className="section-header__title mb-4">Blog</h1>
        <p className="text-slate-500">
          Noticias, artículos y reflexiones sobre ciencias básicas en Iberoamérica.
        </p>
      </section>

      <section className="grid-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="event-card">
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={200}
                className="event-card__img"
              />
            )}
            <div className="event-card__body">
              <div className="event-card__date">
                {new Date(post.createdAt).toLocaleDateString("es-PE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <h3 className="event-card__title">{post.title}</h3>
              <p className="event-card__text" style={{ marginBottom: "0.5rem" }}>
                Por {post.author}
              </p>
              {post.tags && (
                <div className="flex gap-1 flex-wrap">
                  {post.tags.split(",").map((tag) => (
                    <span key={tag} className="event-card__tag event-card__tag--ec">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </section>

      {posts.length === 0 && (
        <p className="text-slate-500">Próximamente publicaremos artículos.</p>
      )}
    </div>
  );
}
