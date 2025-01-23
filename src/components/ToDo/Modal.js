import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../features/todos/modalSlice";

const Modal = () => {
  const modalElement = document.getElementById("modal");

  const theme = useSelector((state) => state.theme.currentTheme);
  const modalContent = useSelector((state) => state.modal.modalContent);

  const dispatch = useDispatch();

  const handleOverlayClick = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" || event.key === "Enter") {
        dispatch(closeModal());
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]); 
  let modalContentJSX = null; 

switch (modalContent.modalType){
  case "taskContent" :(
    modalContentJSX = (
           
      <div
        className={`modalContent ${theme}`}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="textModalContent">{modalContent.text}</p>
        <button className="closeButton" onClick={()=>dispatch(closeModal())}>
          Close
        </button>
      </div>
    
    
    )
  )
  break;

  default:
    modalContentJSX = null;
}



  return createPortal(
    <div className={`modalOverlay ${theme}`} onClick={handleOverlayClick}>
      {modalContentJSX}
    </div>,
    modalElement
  );
};
export default Modal;
