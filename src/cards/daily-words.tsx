import { capitalize } from "@/lib/string-utils";

type DailyWordsProps = {
  words: string[];
};
const DailyWords = ({ words }: DailyWordsProps) => {
  return words.slice(0, 3).map((word) => (
    <div
      className="text-xl font-medium"
      key={word}>
      <span>{capitalize(word)}</span>
    </div>
  ));
};

export default DailyWords;
