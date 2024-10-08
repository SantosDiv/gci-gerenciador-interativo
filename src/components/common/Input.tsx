import { InputHTMLAttributes, MutableRefObject } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  className?: string;
  placeholder: string;
  ref?: MutableRefObject<null>
  register(name:string): any
}

export default function Input({ type, name, placeholder, className, register, ref, ...props }:InputProps) {

  return (
    <input
      className={clsx('bg-grayGCI-700 border-grayGCI-500 border-[1px] p-4 rounded-full', className)}
      type={type}
      placeholder={placeholder}
      autoComplete="off"
      ref={ref}
      { ...props }
      {...register(name)}
    />
  );
}