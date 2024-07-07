import { FC } from "react";
import styles from "./PreviewModal.module.scss";
import { ISliderImage } from "types/componentTypes";
import {
  ArrowLeftRounded,
  ArrowRightRounded,
  Close,
} from "@mui/icons-material";
import { motion } from "framer-motion";

type PreviewModalT = {
  slides: ISliderImage[];
  changeIndex: React.Dispatch<React.SetStateAction<number>>;
  toggleModal: () => void;
  currentIndex: number;
  imagePreview: boolean;
};

export const PreviewModal: FC<PreviewModalT> = ({
  slides,
  changeIndex,
  toggleModal,
  currentIndex,
  imagePreview,
}) => {
  const handleNext = () => {
    changeIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  const handlePrev = () => {
    changeIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  return (
    imagePreview && (
      <motion.div className={styles.modalWrapper}>
        <ArrowRightRounded
          onClick={handleNext}
          className={styles.modalWrapper_btnNext}
        />
        <ArrowLeftRounded
          onClick={handlePrev}
          className={styles.modalWrapper_btnPrev}
        />
        <Close onClick={toggleModal} className={styles.modalWrapper_btnClose} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeIn", duration: 0.5 }}
          className={styles.modalWrapper_fullScreenImage}
        >
          <img
            className={styles["modalWrapper_fullScreenImage_image"]}
            onClick={toggleModal}
            src={`https://shineray.by/media/${slides[currentIndex].image}`}
            alt={slides[currentIndex].name}
          />
        </motion.div>
      </motion.div>
    )
  );
};
