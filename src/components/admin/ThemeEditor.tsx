'use client';

import { useState } from 'react';
import { saveTheme } from '@/lib/theme/actions';

export function ThemeEditor() {
  const [message, setMessage] = useState('');
  async function submit(form: FormData) {
    const result = await saveTheme({ accent: form.get('accent'), ink: form.get('ink'), muted: form.get('muted'), hero: form.get('hero'), animation: form.get('animation') });
    setMessage(result.ok ? 'Theme saved.' : result.error);
  }
  return <form className="admin-form" action={submit}><label>Accent color<input name="accent" type="color" defaultValue="#c8f135" /></label><label>Ink color<input name="ink" type="color" defaultValue="#171817" /></label><label>Muted color<input name="muted" type="color" defaultValue="#686b67" /></label><label>Hero<select name="hero"><option value="editorial">Editorial</option><option value="rail">3D rail</option></select></label><label>Animation<select name="animation"><option value="full">Full</option><option value="reduced">Reduced</option><option value="off">Off</option></select></label><button>Save appearance</button>{message && <p role="status">{message}</p>}</form>;
}
