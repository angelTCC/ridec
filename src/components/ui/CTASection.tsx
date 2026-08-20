import Button from "./Button";

interface CTASectionProps {
  title: string;
  text: string;
  primaryBtn: { label: string; href: string };
  secondaryBtn?: { label: string; href: string };
}

export default function CTASection({
  title,
  text,
  primaryBtn,
  secondaryBtn,
}: CTASectionProps) {
  return (
    <div className="cta-block">
      <h2 className="cta-block__title">{title}</h2>
      <p className="cta-block__text">{text}</p>
      <div className="cta-block__actions">
        <Button href={primaryBtn.href} variant="primary">
          {primaryBtn.label}
        </Button>
        {secondaryBtn && (
          <Button href={secondaryBtn.href} variant="outline">
            {secondaryBtn.label}
          </Button>
        )}
      </div>
    </div>
  );
}
