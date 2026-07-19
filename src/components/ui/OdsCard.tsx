import Image from "next/image";

interface OdsCardProps {
  number: number;
  title: string;
  description: string;
  image: string;
}

export default function OdsCard({ number, title, description, image }: OdsCardProps) {
  return (
    <div className="ods-card">
      <Image src={image} alt={`ODS ${number}`} width={64} height={64} className="ods-card__img" />
      <h4 className="ods-card__title">ODS {number} · {title}</h4>
      <p className="ods-card__text">{description}</p>
    </div>
  );
}
