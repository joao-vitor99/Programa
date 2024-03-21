import { cn } from "../utils";

interface CardProps {
  color?: string;
}

const Card = (props: CardProps) => {
  return (
    <div
      className={cn(
        "text-white w-full h-full min-h-[40px] rounded-lg shadow-md flex flex-row justify-between p-2 items-center transition-all cursor-pointer",
        props.color ?? ""
      )}
    >
      <div>Pedido #{Math.floor(Math.random() * 1000).toFixed(0)}</div>

      <div>Fulano de Tal</div>
    </div>
  );
};

export default Card;
