import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "thirty";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  icon?: any;
  variant?: Variant;
  className?: string;
}

export default function CustomButton({ value, icon, className, variant='primary', ...props }: CustomButtonProps) {
  return (
    <button
      className={clsx(
        className,
        'flex gap-4 items-center  font-bold py-2 px-5 rounded-2xl w-full border-[1px] justify-between hover:bg-grayGCI-800 hover:text-white  transition-colors',
        {
          'bg-white text-grayGCI-800 border-grayGCI-500': variant === 'primary',
          'bg-grayGCI-700 text-grayGCI-200 border-grayGCI-500': variant === 'secondary',
          'bg-blueGCI-500 text-white border-blueGCI-500': variant === 'thirty'
        }
      )}
      {...props}
    >
      {value} {icon}
    </button>
  )
}