import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/modal.module.css";
import { hideModal } from "@/redux/reducers/modal";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function Modal() {
  let dispatch = useDispatch();
  const content = useSelector((state) => state.modal.content);

  function closeModal() {
    dispatch(hideModal());
  }

  return (
    <div
      onClick={(e) => {
        if (e.target.classList.contains(`${styles.modal__background}`)) {
          closeModal();
        }
      }}
      className={`${styles.modal__background} ${content ? "d-flex" : "d-none"}`}
    >
      <div className={`${styles.modal__content}`}>
        <IconButton
          onClick={closeModal}
          className={styles.modal__content__close}
        >
          <Close />
        </IconButton>
        {content}
      </div>
    </div>
  );
}
