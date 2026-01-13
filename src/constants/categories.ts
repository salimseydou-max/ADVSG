export type AdviceCategory =
  | 'life'
  | 'career'
  | 'relationships'
  | 'mental_health'
  | 'productivity'
  | 'finance'
  | 'creativity';

export const ADVICE_CATEGORIES: { key: AdviceCategory; labelKey: string }[] = [
  { key: 'life', labelKey: 'Life' },
  { key: 'career', labelKey: 'Career' },
  { key: 'relationships', labelKey: 'Relationships' },
  { key: 'mental_health', labelKey: 'Mental Health' },
  { key: 'productivity', labelKey: 'Productivity' },
  { key: 'finance', labelKey: 'Finance' },
  { key: 'creativity', labelKey: 'Creativity' },
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

