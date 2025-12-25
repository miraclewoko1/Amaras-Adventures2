const translationCache = new Map<string, string>();
const pendingTranslations = new Map<string, Promise<string>>();

export async function translateText(text: string): Promise<string> {
  if (translationCache.has(text)) {
    return translationCache.get(text)!;
  }

  if (pendingTranslations.has(text)) {
    return pendingTranslations.get(text)!;
  }

  const promise = (async () => {
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          texts: [{ key: "text", text }],
        }),
      });

      if (!response.ok) {
        throw new Error("Translation failed");
      }

      const data = await response.json();
      const translated = data.translations?.[0]?.text || text;
      translationCache.set(text, translated);
      return translated;
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    } finally {
      pendingTranslations.delete(text);
    }
  })();

  pendingTranslations.set(text, promise);
  return promise;
}

export async function translateWithName(
  templateType: "help" | "learnedAbout",
  name: string
): Promise<string> {
  const cacheKey = `${templateType}:${name}`;
  
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  if (pendingTranslations.has(cacheKey)) {
    return pendingTranslations.get(cacheKey)!;
  }

  const englishText = templateType === "help" 
    ? `Help ${name}!`
    : `Amazing! You learned about ${name}!`;

  const promise = (async () => {
    try {
      const response = await fetch("/api/translate-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateType,
          name,
          englishText,
        }),
      });

      if (!response.ok) {
        throw new Error("Translation failed");
      }

      const data = await response.json();
      const translated = data.translation || englishText;
      translationCache.set(cacheKey, translated);
      return translated;
    } catch (error) {
      console.error("Template translation error:", error);
      return englishText;
    } finally {
      pendingTranslations.delete(cacheKey);
    }
  })();

  pendingTranslations.set(cacheKey, promise);
  return promise;
}

export async function translateMultiple(
  texts: { key: string; text: string }[]
): Promise<Record<string, string>> {
  const uncached = texts.filter((t) => !translationCache.has(t.text));
  
  if (uncached.length > 0) {
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: uncached }),
      });

      if (response.ok) {
        const data = await response.json();
        for (const t of data.translations || []) {
          const original = uncached.find((u) => u.key === t.key);
          if (original) {
            translationCache.set(original.text, t.text);
          }
        }
      }
    } catch (error) {
      console.error("Batch translation error:", error);
    }
  }

  const result: Record<string, string> = {};
  for (const t of texts) {
    result[t.key] = translationCache.get(t.text) || t.text;
  }
  return result;
}

export function clearTranslationCache(): void {
  translationCache.clear();
  pendingTranslations.clear();
}
