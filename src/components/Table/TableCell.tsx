import { ComponentProps } from "react";

interface TableCellProps extends ComponentProps<'td'> {
  textRight?: boolean
}

export function TableCell({ textRight, ...props }: TableCellProps) {
  const style = textRight && "text-right"

  return (
    <td className={`py-3 px-4 text-sm text-zinc-300 ${style}`} {...props} />
  )
}
