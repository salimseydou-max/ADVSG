import type { AdviceCategory } from '../constants/categories';
import { CATEGORY_QUERY } from '../constants/categories';

type AdviceSlipSearchResponse =
  | { message: { type: string; text: string } }
  | { total_results: string; query: string; slips: { id: number; advice: string }[] };

type AdviceSlipRandomResponse = { slip: { id: number; advice: string } };

function withTimeout(ms: number): AbortController {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller;
}

/**
 * Advice Slip API aggressively caches responses; adding a cache buster prevents
 * duplicate advice when users tap refresh quickly.
 */
function cacheBuster() {
  return `t=${Date.now()}`;
}

export async function fetchAdviceSlipForCategory(category: AdviceCategory): Promise<{ id: string; text: string }> {
  const q = encodeURIComponent(CATEGORY_QUERY[category]);
  const controller = withTimeout(6500);

  const url = `https://api.adviceslip.com/advice/search/${q}?${cacheBuster()}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    signal: controller.signal,
  });

  const json = (await res.json()) as AdviceSlipSearchResponse;

  // When no results, Advice Slip returns { message: { type, text } }.
  if ('message' in json) {
    return await fetchRandomAdviceSlip();
  }

  const slips = json.slips ?? [];
  if (slips.length === 0) return await fetchRandomAdviceSlip();

  const picked = slips[Math.floor(Math.random() * slips.length)];
  return { id: String(picked.id), text: picked.advice };
}

export async function fetchRandomAdviceSlip(): Promise<{ id: string; text: string }> {
  const controller = withTimeout(6500);
  const url = `https://api.adviceslip.com/advice?${cacheBuster()}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    signal: controller.signal,
  });
  const json = (await res.json()) as AdviceSlipRandomResponse;
  return { id: String(json.slip.id), text: json.slip.advice };
}

