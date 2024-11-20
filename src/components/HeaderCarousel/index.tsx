import { FC, useState } from "react";
import Slider from "react-slick";
import styles from "./HeaderCarousel.module.scss";
import { ISliderImage } from "types/componentTypes";
import { motion } from "framer-motion";
import { CommonButton, LinkButton } from "components/common/Buttons";

type HeaderSliderT = {
  images?: ISliderImage[];
  image?: string;
};

export const HeaderSlider: FC<HeaderSliderT> = ({ images, image }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    adaptiveHeight: true,
    zIndex: 100,
    afterChange: (current: number) => setCurrentSlide(current),
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
        {images.map(({ image, url, name, description }, index) => (
          <a
            className={styles.imageBox}
            key={image + index}
            href={url}
            rel="noreferrer"
            target="_blank"
          >
            <img
              src={`https://shineray.by/media/${image}`}
              key={index}
              width={"100%"}
              rel="preload"
              alt={name}
            />
            {name && name.length > 0 && (
              <motion.div className={styles.imageBox_textBox}>
                <motion.p
                  className={styles.imageBox_textBox_title}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={
                    currentSlide === index
                      ? { y: 0, opacity: 1 }
                      : { y: "100%", opacity: 0 }
                  }
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  {name}
                </motion.p>
                <motion.p
                  className={styles.imageBox_textBox_description}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={
                    currentSlide === index
                      ? { y: 0, opacity: 1 }
                      : { y: "100%", opacity: 0 }
                  }
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  {description}
                </motion.p>
                {url && url.length > 0 && (
                  <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={
                      currentSlide === index
                        ? { y: 0, opacity: 1 }
                        : { y: "100%", opacity: 0 }
                    }
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    <CommonButton text="Узнать подробнее" />
                  </motion.div>
                )}
              </motion.div>
            )}
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
