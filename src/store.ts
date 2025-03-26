import { create } from 'zustand';

export type SectionType = {
  id: string;
  isEdit?: boolean;
  comment: string;
  children: SectionType[];
};

type SectionStore = {
  section: SectionType[];
  setSection: (val: SectionType[]) => void;
};

export const useSectionStore = create<SectionStore>((set) => ({
  section: [],
  setSection: (val) => {
    set({ section: val });
  },
}));
