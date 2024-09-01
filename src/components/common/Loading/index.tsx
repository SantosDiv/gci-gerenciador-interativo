import clsx from 'clsx';
import './style.css';

interface LoadingProps {
  className?: string;
}

export default function Loading({ className }:LoadingProps) {
  return(<div className={clsx("custom-loader", className)}></div>);
}