import { FC } from "react";
import Slider from "react-slick";
import styles from "./HeaderCarousel.module.scss";
import { ISliderImage } from "types/componentTypes";
import { motion } from "framer-motion";

type HeaderSliderT = {
  images?: ISliderImage[];
  image?: string;
};

export const HeaderSlider: FC<HeaderSliderT> = ({ images, image }) => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
  };

  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.wrapper}
      id={"header-slider"}
    >
      {images ? (
        <Slider {...settings}>
          {images.map(({ image }, index) => (
            <img
              src={`http://93.177.124.158/media/${image}`}
              key={index}
              loading="lazy"
            />
          ))}
        </Slider>
      ) : (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.soloImage}
          src={`http://93.177.124.158/media/${image}`}
          loading="lazy"
        />
      )}
    </motion.div>
  );
};
