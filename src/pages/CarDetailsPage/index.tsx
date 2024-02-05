import { useLazyFetchCarModelDataQuery } from "api/carDetailsPageService";
import styles from "./CarDetailsPage.module.scss";
import { motion } from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { HeaderSlider } from "components/HeaderCarousel";
import { Swiper, SwiperSlide, SwiperRef, SwiperClass } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import parse from "html-react-parser";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export const CarDetailsPage: FC = () => {
  const params = useParams();
  const { carModel } = params;
  const [fetchData, { data: AutoModel, isSuccess }] =
    useLazyFetchCarModelDataQuery();
  const [currentCar, setCurrentCar] = useState<number>(0);
  const [instance, setInstance] = useState<SwiperClass | null>(null);
  const [instance2, setInstance2] = useState<SwiperClass | null>(null);
  const swiperRef = useRef<SwiperRef | null>(null);
  const thumbsRef = useRef<SwiperRef | null>(null);

  const btnNext = document.querySelectorAll(".swiper-button-next");
  btnNext.forEach(
    (el: Element) => ((el as HTMLElement).style.transition = "ease-in 0.3s"),
  );
  const btnPrev = document.querySelectorAll(".swiper-button-prev");
  btnPrev.forEach(
    (el: Element) => ((el as HTMLElement).style.transition = "ease-in 0.3s"),
  );

  useEffect(() => {
    if (carModel) {
      const urlList = carModel.split("-");
      const id = urlList[0];
      if (id) {
        fetchData(id);
      }
    }
  }, [carModel]);

  return (
    <motion.div className={styles.wrapper}>
      {AutoModel && <HeaderSlider image={AutoModel.header_image} />}
      <div className={styles.wrapper_main}>
        <div className={styles.wrapper_main_preview}>
          <div className={styles.wrapper_main_preview_swiper}>
            {AutoModel && (
              <>
                <Swiper
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  centeredSlides={true}
                  ref={swiperRef}
                  normalizeSlideIndex
                  onSwiper={setInstance}
                  modules={[Navigation, Thumbs]}
                  className={styles.swiper}
                  onSlideChange={(swiper) => {
                    setCurrentCar(swiper.realIndex);
                    instance2?.slideTo(swiper.realIndex);
                  }}
                >
                  {AutoModel.slider_1.images.map((el, index) => (
                    <SwiperSlide key={el.id + el.name}>
                      <img
                        style={{
                          objectFit: "cover",
                          height: "100%",
                          width: "100%",
                          border: "1px solid rgba(193, 193, 193, 0.6)",
                          borderRadius: "0.3rem",
                        }}
                        src={`http://93.177.124.158/media/${el.image}`}
                        alt={`Slide ${index + 1}`}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  onSwiper={setInstance2}
                  ref={thumbsRef}
                  normalizeSlideIndex
                  slidesPerView={5}
                  centeredSlides={true}
                  centeredSlidesBounds={true}
                  className={styles.thumbsWrapper}
                >
                  {AutoModel?.slider_1.images.map((el, index) => (
                    <SwiperSlide key={el.image}>
                      <img
                        className={`${styles.thumbsWrapper_thumbs} ${currentCar === index ? styles.active : ""}`}
                        src={`http://93.177.124.158/media/${el.image}`}
                        alt={`Thumb ${index + 1}`}
                        onClick={() => {
                          instance?.slideTo(
                            index + 1 === AutoModel?.slider_1.images.length
                              ? 0
                              : index + 1,
                          );
                          instance2?.slideTo(index);
                          setCurrentCar(index);
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            )}
          </div>
          <div className={styles.wrapper_main_preview_shortDescription}>
            <h1 className={styles.wrapper_main_preview_shortDescription_title}>
              {AutoModel?.description}
            </h1>
            <hr></hr>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "22px",
                  marginBottom: "15px",
                  padding: "5px 15px",
                  borderRadius: "5px",
                  border: "3px dashed rgba(255, 0, 0, .55)",
                }}
              >
                Краткие технические характеристики:{" "}
              </p>
            </div>
            <ul className={styles.wrapper_main_preview_shortDescription_tech}>
              {AutoModel?.name && (
                <li>
                  <strong>Модель: </strong>
                  Shineray {AutoModel.name}
                </li>
              )}
              {AutoModel?.engine && (
                <li>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <strong>{"Двигатель: "}</strong>
                    <div className={styles.engines}>
                      {AutoModel.engine.split(";").map((engine, index) => (
                        <p>{engine}</p>
                      ))}
                    </div>
                  </div>
                </li>
              )}
              {AutoModel?.drive && (
                <li>
                  <strong>Привод: </strong>
                  {AutoModel.drive}
                </li>
              )}
              {AutoModel?.transmission && (
                <li>
                  <strong>Трансмиссия: </strong>
                  {AutoModel.transmission}
                </li>
              )}
              {AutoModel?.range && (
                <li>
                  <strong>Запас хода: </strong>
                  {AutoModel.range}
                </li>
              )}
              {AutoModel?.dimensions && (
                <li>
                  <strong>Размеры: </strong>
                  {AutoModel.dimensions}
                </li>
              )}
              {AutoModel?.cargo_size && (
                <li>
                  <strong>Размер грузового отсека: </strong>
                  {AutoModel.cargo_size}
                </li>
              )}
              {AutoModel?.seats && (
                <li>
                  <strong>Количество мест: </strong>
                  {AutoModel.seats}
                </li>
              )}
              {AutoModel?.certification_standard && (
                <li>
                  <strong>Сертификат: </strong>
                  {AutoModel.certification_standard}
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className={styles.wrapper_main_proText}>
          <h3 className={styles.wrapper_main_proText_title}>Описание модели</h3>
          <div className={styles.wrapper_main_proText_description}>
            {parse(String(AutoModel?.big_text_description))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
