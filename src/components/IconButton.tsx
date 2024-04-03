import { ComponentProps } from "react";

interface IconButtonProps extends ComponentProps<'button'> {
  transparent?: boolean
}

export function IconButton({ transparent, ...props }: IconButtonProps) {
  const style = transparent ? 'bg-black/20' : 'bg-white/10'

  return (
    <button {...props} className={`${style} border border-white/10 rounded-md p-1.5 disabled:opacity-60 disabled:cursor-not-allowed`} />
  )
}
