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
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const body: TranslateRequestBody =
    typeof req.body === 'string'
      ? (() => {
          try {
            return JSON.parse(req.body) as TranslateRequestBody;
          } catch {
            return {};
          }
        })()
      : (req.body ?? {});

  const text = body.text?.trim();
  const target = body.targetLanguage?.trim();
  const source = body.sourceLanguage?.trim() ?? 'en';

  if (!text || !target || source === target) {
    res.status(200).json({ translatedText: text ?? '' });
    return;
  }

  const url = process.env.LIBRETRANSLATE_URL ?? 'https://libretranslate.de/translate';
  const apiKey = process.env.LIBRETRANSLATE_API_KEY;

  try {
    const upstream = await fetch(url, {
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

    if (!upstream.ok) {
      res.status(200).json({ translatedText: text });
      return;
    }

    const json = (await upstream.json()) as { translatedText?: string };
    res.status(200).json({ translatedText: json.translatedText ?? text });
  } catch {
    res.status(200).json({ translatedText: text });
  }
}

