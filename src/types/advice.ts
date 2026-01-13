import type { AdviceCategory } from '../constants/categories';

export type AdviceSource = 'adviceSlip' | 'offline';

export type AdviceItem = {
  id: string;
  text: string;
  language: string;
  category: AdviceCategory;
  source: AdviceSource;
  createdAt: number;
};

