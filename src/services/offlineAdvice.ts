import type { AdviceCategory } from '../constants/categories';

/**
 * Small offline fallback set (English).
 * This keeps the app useful when the network or API is unavailable.
 */
const OFFLINE_ADVICE: Record<AdviceCategory, string[]> = {
  life: [
    'Focus on what you can control today, not what might happen tomorrow.',
    'If it’s worth doing, it’s worth doing calmly and consistently.',
    'Make a small promise to yourself and keep it.',
    'Choose progress over perfection.',
    'Say no to make room for what matters.',
  ],
  career: [
    'Do the work that makes future work easier.',
    'Write down what you’re learning—your future self will thank you.',
    'Ask one clarifying question before you start; it saves hours.',
    'Build trust by being reliable, not loud.',
    'Invest in skills that compound: writing, communication, systems thinking.',
  ],
  relationships: [
    'Assume good intent, then ask for clarity.',
    'Listen to understand, not to win.',
    'Name the feeling before the problem.',
    'Apologize quickly and specifically.',
    'Celebrate the small things—consistency builds connection.',
  ],
  mental_health: [
    'Breathe out a little longer than you breathe in.',
    'You don’t have to solve everything today—just take the next kind step.',
    'When your mind races, come back to your senses: see, hear, feel.',
    'Rest is productive when it restores you.',
    'Talk to someone you trust; you don’t need to carry it alone.',
  ],
  productivity: [
    'Pick one “must-do” and finish it before anything else.',
    'Make tasks smaller until you can start in under two minutes.',
    'Schedule breaks like meetings—they’re part of the plan.',
    'Remove one distraction instead of adding one more app.',
    'Start messy; refine later.',
  ],
  finance: [
    'Track spending for one week—awareness beats guesswork.',
    'Save a little automatically; consistency matters more than amount.',
    'Buy time, not things, when you can.',
    'Avoid lifestyle inflation after a raise—keep your old budget for a month.',
    'Pay down high-interest debt first; it’s a guaranteed return.',
  ],
  creativity: [
    'Create a rough draft, then make it better—drafts are where ideas live.',
    'Collect inspiration daily, even if you don’t create daily.',
    'Constraints can be fuel: limit time, tools, or scope.',
    'Share early with a trusted person to build momentum.',
    'Make something small you can finish today.',
  ],
};

export function getOfflineAdvice(category: AdviceCategory): string {
  const list = OFFLINE_ADVICE[category];
  return list[Math.floor(Math.random() * list.length)];
}

