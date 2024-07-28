const Modal = ({ onClose, status = "success", title, description }) => {
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <h3 className={`font-bold text-lg text-${status}-content`}>{title}</h3>
        <p className="py-4">{description}</p>
      </div>
    </dialog>
  );
};

export default Modal;
