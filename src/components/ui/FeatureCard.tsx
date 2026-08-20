import Link from "next/link";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string | null;
}

export default function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
  const content = (
    <>
      <div className="feature-card__icon">{icon}</div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__text">{description}</p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="feature-card">
        {content}
      </Link>
    );
  }

  return <div className="feature-card">{content}</div>;
}
