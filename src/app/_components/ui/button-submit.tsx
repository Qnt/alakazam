"use client";

import { useFormStatus } from "react-dom";

type ButtonSubmitProps = React.HTMLProps<HTMLButtonElement>;

export default function ButtonSubmit(props: ButtonSubmitProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={props.className}
      disabled={pending}
      name={props.name}
    >
      {pending ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        props.children
      )}
    </button>
  );
}
