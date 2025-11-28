const IMAGES = import.meta.glob('/src/**/images/**/*', { as: 'url', eager: true });

export function resolveImage(path?: string): string {
  if (!path) return '/placeholder.png';

  const p = path.trim();

  const keyCandidates = [
    `/src${p.startsWith('/') ? p : `/${p}`}`,  // "/src/images/...."
    p,                                       
  ];

  for (const k of keyCandidates) {
    const hit = IMAGES[k];
    if (typeof hit === 'string') return hit;
  }

  return p;
}

export function resolveImages(paths?: string[]): string[] {
  const out = (paths ?? []).map(resolveImage).filter(Boolean);
  return out.length ? out : ['/placeholder.png'];
}
