import clsx from "clsx";

interface InputProps {
  name: string;
  type: string;
  className?: string;
  placeholder: string;
  register(name:string): any
}

export default function Input({ type, name, placeholder, className, register }:InputProps) {

  return (
    <input
      className={clsx('bg-grayGCI-800 border-grayGCI-500 border-[1px] p-4 rounded-full w-full', className)}
      type={type}
      placeholder={placeholder}
      autoComplete="off"
      {...register(name)}
    />
  );
}