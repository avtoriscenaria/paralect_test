import ru from "./translations.json";

export const getTranslations = (language?: string) => {
  switch (language) {
    default:
      return ru;
  }
};
