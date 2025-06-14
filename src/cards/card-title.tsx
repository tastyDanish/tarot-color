type CardTitleProps = {
  title: string;
  isShare?: boolean;
};
const CardTitle = ({ title, isShare }: CardTitleProps) => {
  return (
    <div className="text-amber-100 flex items-center md:gap-8">
      <div
        className={`h-3 w-0 ${
          isShare ? "w-20" : "md:w-20"
        } bg-amber-200 [clip-path:polygon(80%_20%,_0%_50%,_80%_80%,_100%_50%)]`}
      />
      <div className="text-3xl font-thin">{title}</div>

      <div
        className={`h-3 w-0 ${
          isShare ? "w-20" : "md:w-20"
        } bg-amber-200 [clip-path:polygon(20%_20%,_100%_50%,_20%_80%,_0%_50%)]`}
      />
    </div>
  );
};

export default CardTitle;
