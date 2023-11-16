export type NobelRes = {
  awardYear: string;
  category: { en: string };
  laureates: [{ id: string; knownName: { en: string }; motivation: { en: string } }];
  links: { href: string };
};
