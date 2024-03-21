import Card from "../Card";

const OrderTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-center text-lg font-bold">
      <h3>{title}</h3>
    </div>
  );
};

interface OrderColumnProps {
  title: string;
  children?: React.ReactNode;
}

const OrderColumn = (props: OrderColumnProps) => {
  return (
    <div className="flex flex-col items-center justify-start w-full">
      <OrderTitle title={props.title} />

      <div className="flex flex-col gap-2 w-full mt-4">{props.children}</div>
    </div>
  );
};

const orderColumns = [
  {
    title: "Pedidos",
    color: "bg-gray2",
    qty: 18,
  },
  {
    title: "Em andamento",
    color: "bg-cerulean1",
    qty: 8,
  },
  {
    title: "Saiu para entrega",
    color: "bg-gold4",
    qty: 4,
  },
  {
    title: "Finalizado",
    color: "bg-forest4",
    qty: 9,
  },
] as const;

export const Read = () => {
  return (
    <div className="flex flex-row w-full gap-1">
      <div className="flex w-full gap-4 justify-between">
        {orderColumns.map((oc) => (
          <OrderColumn title={oc.title} key={oc.title}>
            {Array.from({ length: oc.qty })
              .map((_i, idx) => idx + 1)
              .map((d) => (
                <Card color={oc.color} key={d} />
              ))}
          </OrderColumn>
        ))}
      </div>
    </div>
  );
};
