export type FormData = Record<string, string | boolean | number | null>;

export interface AdminEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  tagLabel: string;
  image: string;
  location: string | null;
  featured: boolean;
}

export interface AdminOportunidad {
  id: number;
  title: string;
  description: string;
  deadline: string | null;
  type: string;
  externalLink: string | null;
  image: string | null;
  year: number;
}

export interface AdminBlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  author: string;
  image: string | null;
  tags: string;
  published: boolean;
}

export interface Field {
  name: string;
  label: string;
  type: string;
  options?: string[];
  full?: boolean;
}

export const eventFields: Field[] = [
  { name: "title", label: "Título", type: "text" },
  { name: "date", label: "Fecha", type: "date" },
  { name: "category", label: "Categoría", type: "select", options: ["ec", "gl"] },
  { name: "tagLabel", label: "Etiqueta", type: "text" },
  { name: "location", label: "Ubicación", type: "text" },
  { name: "image", label: "Imagen (URL)", type: "text" },
  { name: "description", label: "Descripción", type: "textarea", full: true },
  { name: "featured", label: "Destacado", type: "checkbox" },
];

export const opportunityFields: Field[] = [
  { name: "title", label: "Título", type: "text" },
  { name: "type", label: "Tipo", type: "select", options: ["becas", "congresos", "traslados", "financiamientos"] },
  { name: "year", label: "Año", type: "number" },
  { name: "deadline", label: "Fecha límite", type: "date" },
  { name: "image", label: "Imagen (URL)", type: "text" },
  { name: "externalLink", label: "Link externo", type: "text" },
  { name: "description", label: "Descripción", type: "textarea", full: true },
];

export const blogFields: Field[] = [
  { name: "title", label: "Título", type: "text" },
  { name: "slug", label: "Slug", type: "text" },
  { name: "author", label: "Autor", type: "text" },
  { name: "image", label: "Imagen (URL)", type: "text" },
  { name: "tags", label: "Tags (separados por coma)", type: "text" },
  { name: "content", label: "Contenido", type: "textarea", full: true },
  { name: "published", label: "Publicado", type: "checkbox" },
];

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
