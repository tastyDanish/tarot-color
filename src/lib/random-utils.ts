export function getRandomItem<T>(items: T[]): T {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

export function getRandomItemArray<T>(items: T[], count: number): T[] {
  if (count > items.length) {
    throw new Error(
      `Cannot draw ${count} items from an array of length ${items.length}`,
    );
  }

  const deck = [...items];

  for (let i = 0; i < count; i++) {
    const j = i + Math.floor(Math.random() * (deck.length - i));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck.slice(0, count);
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

export function choose<T>(myList: T[]) {
  if (myList.length === 0) return null;

  const random = Math.floor(Math.random() * myList.length);
  if (random < myList.length) {
    return myList[random];
  } else {
    return myList[0];
  }
}
