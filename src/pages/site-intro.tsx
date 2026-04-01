// import { useDailyIntro } from "@/hooks/use-daily-intro";
import { choose } from "@/lib/utils";
import { motion } from "motion/react";

const SiteIntrouction = () => {
  // const intros = [
  //   "Unfold today's secrets, one card and color at a time.",
  //   "What do the cards and colors have in store for you today?",
  //   "A fortune a day keeps the dispair at bay.",
  //   "Take a break dear traveller and reflect.",
  //   "Your stars look especially bright today",
  //   "The color of your energy is inspiring.",
  //   "The fortunes favor you this day. Seize it.",
  //   "A gaze into the world's possibility.",
  // ];
  // const intro = useDailyIntro(intros);

  const goblinIntros = [
    "The goblins see all. Most of it is fine.",
    "Greetings. The goblins have been expecting you.",
    "The goblins do not judge. Much.",
  ];
  const intro = choose(goblinIntros);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center w-full flex flex-col gap-3 pt-4 pb-2 px-4 md:px-0 body-font text-green-200">
      <h3>⚠ This site has been seized by goblins ⚠</h3>
      <h1 className="font-bold">{intro}</h1>
    </motion.header>
  );
};

export default SiteIntrouction;
