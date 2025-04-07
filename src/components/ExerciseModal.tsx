import { useRef } from "react";

export default function ExerciseModal() {
  const modalRef = useRef<HTMLDialogElement>(null);

  modalRef.current?.showModal();

  return (
    <>
      <button
        onClick={() => modalRef.current?.showModal()}
        className="btn btn-primary ml-2 "
      >
        New Exercise
      </button>
      <dialog id="modal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
