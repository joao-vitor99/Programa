import { Cell, Column, Table2 } from "@blueprintjs/table";

export const Read = () => {
  const dollarCellRenderer = (rowIndex: number) => (
    <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
  );
  const euroCellRenderer = (rowIndex: number) => (
    <Cell>{`€${(rowIndex * 10 * 0.85).toFixed(2)}`}</Cell>
  );

  return (
    <Table2 numRows={10}>
      <Column name="Dollars" cellRenderer={dollarCellRenderer} />
      <Column name="Euros" cellRenderer={euroCellRenderer} />
    </Table2>
  );
};
