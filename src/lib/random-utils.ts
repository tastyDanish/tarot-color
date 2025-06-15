export function getRandomItem<T>(items: T[]): T {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Return a random subset of `size` items from the input array
export function getRandomSubSet<T>(items: T[], size: number): T[] {
  const shuffled = shuffleArray(items);
  return shuffled.slice(0, Math.min(size, items.length));
}
