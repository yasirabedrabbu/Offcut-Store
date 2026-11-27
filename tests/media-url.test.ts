import { describe, expect, it } from 'vitest';
import { mediaUrl } from '../src/lib/storage/mediaUrl';

describe('mediaUrl', () => {
  it('creates a resized public URL', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    expect(mediaUrl('store/image.webp', 400)).toContain('width=400');
  });
});
