export const PLACEHOLDER = "/images/placeholder.png";

export function fixSrc(src: string) {
  // Si es una imagen base64 o ya tiene protocolo, retornarla tal cual
  if (src.startsWith("data:") || src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  // Si no, agregar la barra al inicio para rutas relativas
  return src.startsWith("/") ? src : `/${src}`;
}

export function firstImage(p: { image?: string; images?: string[] }) {
  const src =
    p.image ??
    (Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : undefined);

  return fixSrc(src ?? PLACEHOLDER);
}
