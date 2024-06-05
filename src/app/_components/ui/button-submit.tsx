"use client";

import { useFormStatus } from "react-dom";

type ButtonSubmitProps = React.HTMLProps<HTMLButtonElement>;

export default function ButtonSubmit(props: ButtonSubmitProps) {
  const { pending } = useFormStatus();

  return (
    <button {...props} type="submit">
      {pending ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        props.children
      )}
    </button>
  );
}
