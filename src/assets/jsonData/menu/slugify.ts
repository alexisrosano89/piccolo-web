const accentMap: Record<string, string> = {
    "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u", "ñ": "n", "ü": "u",
};

export const slugify = (text: string): string => {
    const lower = text.toLowerCase().replace(/[áéíóúñü]/g, (char) => accentMap[char] || char);
    return lower.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};
