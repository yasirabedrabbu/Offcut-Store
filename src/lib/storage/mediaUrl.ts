export function mediaUrl(path: string, width?: number): string {
  const base = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/render/image/public/media/${path}`;
  return width ? `${base}?width=${Math.round(width)}&resize=contain` : base;
}

export function mediaLoader({ src, width }: { src: string; width: number }) {
  return mediaUrl(src, width);
}
