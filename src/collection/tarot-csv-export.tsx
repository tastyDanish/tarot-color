import type { TarotCardStats } from "@/stores/use-collection-store";

export type TarotCardExport = Omit<TarotCardStats, "words" | "image">;

const toCsv = (rows: TarotCardExport[]) => {
  if (rows.length === 0) return "";

  const headers = Object.keys(rows[0]) as (keyof TarotCardExport)[];

  const escapeCell = (value: unknown) => {
    const str = String(value);
    // wrap in quotes if it contains a comma, quote, or newline
    if (/[",\n]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const lines = rows.map((row) =>
    headers.map((key) => escapeCell(row[key])).join(",")
  );

  return [headers.join(","), ...lines].join("\n");
};

export const TarotCsvExport = ({ cards }: { cards: TarotCardStats[] }) => {
  const downloadHandler = () => {
    const exportData: TarotCardExport[] = cards.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ image, words, ...rest }) => rest
    );

    const csv = toCsv(exportData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "tarot-collection.csv";
    link.click();

    URL.revokeObjectURL(url);
  };
  return (
    <button
      onClick={downloadHandler}
      className="text-sm underline decoration-amber-950/50 hover:decoration-amber-950 mt-3 self-center cursor-pointer">
      Download your records
    </button>
  );
};
