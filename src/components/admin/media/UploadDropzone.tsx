'use client';

import { useState } from 'react';
import { MAX_UPLOAD_BYTES } from '@/config/constants';

export function UploadDropzone() {
  const [message, setMessage] = useState('');
  async function upload(form: FormData) {
    const file = form.get('file');
    if (!(file instanceof File)) return;
    if (!file.type.startsWith('image/') || file.type === 'image/svg+xml' || file.size > MAX_UPLOAD_BYTES) return setMessage('Use a JPG, PNG, WebP, or AVIF image under 5 MB.');
    const sign = await fetch('/api/upload/sign', { method: 'POST', body: JSON.stringify({ name: file.name, mime: file.type, size: file.size, folder: 'other' }) });
    if (!sign.ok) return setMessage('Could not prepare upload.');
    const { path, token } = await sign.json();
    const complete = await fetch('/api/upload/complete', { method: 'POST', body: JSON.stringify({ path, token, alt: form.get('alt'), folder: 'other' }) });
    setMessage(complete.ok ? 'Upload complete.' : 'Could not save upload.');
  }
  return <form className="upload-dropzone" action={upload}><label>Image<input name="file" type="file" accept="image/jpeg,image/png,image/webp,image/avif" required /></label><label>Alt text<input name="alt" required /></label><button>Upload</button>{message && <p role="status">{message}</p>}</form>;
}
