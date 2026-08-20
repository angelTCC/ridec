export type EventCategory = "ec" | "gl";

export type OportunidadType =
  | "becas"
  | "traslados"
  | "congresos"
  | "financiamientos";

export interface Contacto {
  id: number;
  nombre: string;
  email: string;
  mensaje: string;
  createdAt: Date;
}

export interface Evento {
  id: number;
  title: string;
  description: string;
  date: Date;
  category: EventCategory;
  tagLabel: string;
  image: string;
  location?: string | null;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Oportunidad {
  id: number;
  title: string;
  description: string;
  deadline?: Date | null;
  type: OportunidadType;
  externalLink?: string | null;
  image?: string | null;
  year: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  author: string;
  image?: string | null;
  tags: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Stat {
  id: number;
  number: string;
  label: string;
  order: number;
}

export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  href?: string | null;
  order: number;
}

export interface Ods {
  id: number;
  number: number;
  title: string;
  description: string;
  image: string;
  order: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  order: number;
}
