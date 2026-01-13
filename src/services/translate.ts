import { Platform } from 'react-native';

type TranslateResponse = {
  translatedText: string;
  detectedSourceLanguage?: string;
};

function getTranslateEndpoint(): string | null {
  // On web we can call same-origin serverless functions (Vercel) by default.
  if (Platform.OS === 'web') return process.env.EXPO_PUBLIC_TRANSLATE_ENDPOINT ?? '/api/translate';

  // On native, relative URLs do not work; require a full base URL in env.
  // Example: https://your-vercel-domain.vercel.app/api/translate
  return process.env.EXPO_PUBLIC_TRANSLATE_ENDPOINT ?? null;
}

export async function translateText(params: {
  text: string;
  targetLanguage: string;
  sourceLanguage?: string;
}): Promise<{ text: string; didTranslate: boolean }> {
  const endpoint = getTranslateEndpoint();
  if (!endpoint) return { text: params.text, didTranslate: false };

  // Don't translate English->English.
  const src = params.sourceLanguage ?? 'en';
  if (src === params.targetLanguage) return { text: params.text, didTranslate: false };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        text: params.text,
        targetLanguage: params.targetLanguage,
        sourceLanguage: src,
      }),
    });

    if (!res.ok) return { text: params.text, didTranslate: false };
    const json = (await res.json()) as TranslateResponse;
    if (!json?.translatedText) return { text: params.text, didTranslate: false };
    return { text: json.translatedText, didTranslate: true };
  } catch {
    return { text: params.text, didTranslate: false };
  }
}

