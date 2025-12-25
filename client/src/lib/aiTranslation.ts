const translationCache = new Map<string, string>();

export async function translateText(text: string): Promise<string> {
  if (translationCache.has(text)) {
    return translationCache.get(text)!;
  }

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
  }
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
}
