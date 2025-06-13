type CardTitleProps = {
  title: string;
};
const CardTitle = ({ title }: CardTitleProps) => {
  return <div className="color-bg-amber-100 text-xl">{title}</div>;
};

export default CardTitle;
