"use client";

import { type Collection } from "@prisma/client";
import { forwardRef, useImperativeHandle, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { deleteCollection } from "../actions";
import ButtonSubmit from "./ui/button-submit";

type ModalConfirmProps = {
  collection: Collection;
  children: ReactNode;
};

const ModalConfirm = forwardRef<HTMLDialogElement, ModalConfirmProps>(
  function ModalConfirm({ collection, children }, ref) {
    const innerRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => innerRef.current!, []);

    return createPortal(
      <dialog
        id="confirm_modal"
        className="modal modal-bottom sm:modal-middle"
        ref={innerRef}
      >
        <div className="modal-box">
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            onClick={() => {
              innerRef.current?.close();
            }}
          >
            ✕
          </button>
          <form
            className="form-control gap-4"
            action={deleteCollection.bind(null, collection.id)}
          >
            <h3 className="text-lg font-bold">Подтвердите действие</h3>
            {children}
            <ButtonSubmit className="btn btn-warning">Удалить</ButtonSubmit>
            <button
              className="btn"
              type="button"
              onClick={() => {
                innerRef.current?.close();
              }}
            >
              Отменить
            </button>
          </form>
        </div>
      </dialog>,
      document.body,
    );
  },
);

export default ModalConfirm;
