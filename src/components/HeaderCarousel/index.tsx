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
    adaptiveHeight: true,
  };

  return images ? (
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
      <Slider {...settings}>
        {images.map(({ image, url, name }, index) => (
          <a
            key={image + index}
            href={url}
            rel="noreferrer"
            target="_blank"
            style={{ width: "100%", cursor: "pointer" }}
          >
            <img
              src={`https://shineray.by/media/${image}`}
              key={index}
              width={"100%"}
              rel="preload"
              alt={name}
            />
          </a>
        ))}
      </Slider>
    </motion.div>
  ) : (
    <motion.img
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.soloImage}
      id={"header-slider"}
      src={`https://shineray.by/media/${image}`}
      rel="preload"
    />
  );
};
