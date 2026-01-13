type TranslateRequestBody = {
  text?: string;
  targetLanguage?: string;
  sourceLanguage?: string;
};

/**
 * Minimal translation endpoint for Vercel.
 *
 * Default behavior (no secrets required):
 * - Uses LibreTranslate (public endpoint) if available.
 * - Falls back to returning the original text if translation fails.
 *
 * Recommended production setup:
 * - Set `LIBRETRANSLATE_URL` to your own hosted LibreTranslate instance (or a paid provider).
 * - If your instance requires a key, set `LIBRETRANSLATE_API_KEY` (server-side only).
 */
export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  let body: TranslateRequestBody = {};
  try {
    body = (await req.json()) as TranslateRequestBody;
  } catch {
    // ignore
  }

  const text = body.text?.trim();
  const target = body.targetLanguage?.trim();
  const source = body.sourceLanguage?.trim() ?? 'en';

  if (!text || !target) {
    return Response.json({ translatedText: text ?? '' }, { status: 200 });
  }

  if (source === target) {
    return Response.json({ translatedText: text }, { status: 200 });
  }

  const url = process.env.LIBRETRANSLATE_URL ?? 'https://libretranslate.de/translate';
  const apiKey = process.env.LIBRETRANSLATE_API_KEY;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        q: text,
        source,
        target,
        format: 'text',
        api_key: apiKey,
      }),
    });

    if (!res.ok) {
      return Response.json({ translatedText: text }, { status: 200 });
    }

    const json = (await res.json()) as { translatedText?: string };
    return Response.json({ translatedText: json.translatedText ?? text }, { status: 200 });
  } catch {
    return Response.json({ translatedText: text }, { status: 200 });
  }
}

