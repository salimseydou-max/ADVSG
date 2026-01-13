export type AdviceCategory =
  | 'life'
  | 'career'
  | 'relationships'
  | 'mental_health'
  | 'productivity'
  | 'finance'
  | 'creativity';

export const ADVICE_CATEGORIES: { key: AdviceCategory; i18nKey: string }[] = [
  { key: 'life', i18nKey: 'categories.life' },
  { key: 'career', i18nKey: 'categories.career' },
  { key: 'relationships', i18nKey: 'categories.relationships' },
  { key: 'mental_health', i18nKey: 'categories.mental_health' },
  { key: 'productivity', i18nKey: 'categories.productivity' },
  { key: 'finance', i18nKey: 'categories.finance' },
  { key: 'creativity', i18nKey: 'categories.creativity' },
];

// Advice Slip API isn't category-aware, but its search endpoint works well with keywords.
export const CATEGORY_QUERY: Record<AdviceCategory, string> = {
  life: 'life',
  career: 'work',
  relationships: 'love',
  mental_health: 'anxiety',
  productivity: 'time',
  finance: 'money',
  creativity: 'creative',
};

