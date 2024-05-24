"use client";

import { type ReactNode } from "react";
import { useFormStatus } from "react-dom";

type ButtonSubmitProps = {
  className: string;
  children: ReactNode;
};

export default function ButtonSubmit({
  className,
  children,
}: ButtonSubmitProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={className} disabled={pending}>
      {pending ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        children
      )}
    </button>
  );
}
