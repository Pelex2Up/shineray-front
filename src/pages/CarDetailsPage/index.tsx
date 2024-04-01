import { useFetchCarModelDataMutation } from "api/carDetailsPageService";
import { motion } from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { HeaderSlider } from "components/HeaderCarousel";
import { Swiper, SwiperSlide, SwiperRef, SwiperClass } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { useBoolean } from "customHooks/useBoolean";
import { PreviewModal } from "components/modal/PreviewModal";
import { Preloader } from "components/Preloader";
import { LinkButton } from "components/common/Buttons";
import { PictureAsPdf } from "@mui/icons-material";
import parse from "html-react-parser";

import styles from "./CarDetailsPage.module.scss";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Path } from "enum/PathE";
import { Link, Typography } from "@mui/material";
import { BreadcrumbsComponent } from "components/breadcrumbs";

export const CarDetailsPage: FC = () => {
  const params = useParams();
  const { carModel } = params;
  const [fetchData, { data: AutoModel, isLoading }] =
    useFetchCarModelDataMutation();
  const [imagePreview, { onToggle: toggleImage }] = useBoolean(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [instanceModel, setInstanceModel] = useState<SwiperClass | null>(null);
  const [instanceThumb, setInstanceThumb] = useState<SwiperClass | null>(null);
  const swiperRefModel = useRef<SwiperRef | null>(null);
  const thumbsRefModel = useRef<SwiperRef | null>(null);
  const swiper2RefGallery = useRef<SwiperRef | null>(null);

  useEffect(() => {
    if (carModel) {
      const urlList = carModel.split("-");
      const id = urlList[0];
      if (id) {
        fetchData(id);
      }
    }
  }, [carModel, fetchData]);

  useEffect(() => {
    if (imagePreview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    }
  }, [imagePreview]);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href={Path.Home}>
      Главная
    </Link>,
    <Link underline="hover" key="2" color="inherit" href={Path.Cars}>
      Модельный ряд
    </Link>,
    <Typography key="3" color="text.primary">
      {AutoModel?.title}
    </Typography>,
  ];

  if (!AutoModel || isLoading) {
    return <Preloader />;
  }

  return (
    <motion.div className={styles.wrapper}>
      <PreviewModal
        slides={AutoModel.slider_1.images}
        toggleModal={toggleImage}
        changeIndex={setCurrentIndex}
        currentIndex={currentIndex}
        imagePreview={imagePreview}
      />
      {/* {imagePreview && AutoModel && (
        <PreviewModal
          slides={AutoModel.slider_2.images}
          toggleModal={toggleImage}
          changeIndex={setCurrentIndex}
          currentIndex={currentIndex}
        />
      )} */}
      <HeaderSlider image={AutoModel.header_image} />
      <BreadcrumbsComponent data={breadcrumbs} />
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
                  ref={swiperRefModel}
                  speed={500}
                  lazyPreloadPrevNext={1}
                  normalizeSlideIndex
                  onSwiper={setInstanceModel}
                  modules={[Navigation, Thumbs]}
                  className={styles.swiperStyle}
                  onSlideChange={(swiper) => {
                    if (!instanceThumb?.destroyed) {
                      setCurrentIndex(swiper.realIndex);
                      instanceThumb?.slideTo(swiper.realIndex);
                    }
                  }}
                >
                  {AutoModel.slider_1.images.map((el, index) => (
                    <SwiperSlide key={el.id + el.name}>
                      <img
                        onClick={toggleImage}
                        style={{
                          cursor: "zoom-in",
                          objectFit: "cover",
                          height: "100%",
                          width: "100%",
                          border: "1px solid rgba(193, 193, 193, 0.6)",
                          borderRadius: "10px",
                        }}
                        src={`https://shineray.by/media/${el.image}`}
                        alt={`Slide ${el.name} ${index + 1}`}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  onSwiper={setInstanceThumb}
                  ref={thumbsRefModel}
                  normalizeSlideIndex
                  speed={500}
                  slidesPerView={5}
                  centeredSlides={true}
                  centeredSlidesBounds={true}
                  className={styles.thumbsWrapper}
                >
                  {AutoModel?.slider_1.images.map((el, index) => (
                    <SwiperSlide key={el.image}>
                      <img
                        className={`${styles.thumbsWrapper_thumbs} ${currentIndex === index ? styles.active : ""}`}
                        src={`https://shineray.by/media/${el.image}`}
                        alt={`Thumb ${el.name} ${index + 1}`}
                        onClick={() => {
                          instanceModel?.slideTo(
                            index + 1 === AutoModel?.slider_1.images.length
                              ? 0
                              : index + 1,
                          );
                          instanceThumb?.slideTo(index);
                          setCurrentIndex(index);
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
              {AutoModel.title}
            </h1>
            <h4 style={{ fontWeight: "400" }}>
              {parse(AutoModel?.description)}
            </h4>
            <hr></hr>
            <div
              style={{
                display: "flex",
              }}
            >
              <p
                style={{
                  fontSize: "24px",
                  marginBottom: "15px",
                  fontWeight: "800",
                  borderBottom: "3px solid rgb(255, 0, 0)",
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
                        <p key={engine + index}>{engine}</p>
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
            {AutoModel.tech_pdf && (
              <LinkButton
                className={styles.techButton}
                text={`Технические характеристики`}
                href={`https://shineray.by/pdf/${AutoModel.tech_pdf}`}
                target="_blank"
                rel="norefferrer"
              >
                <PictureAsPdf style={{ marginRight: "0.2rem" }} />
              </LinkButton>
            )}
          </div>
        </div>
        <div className={styles.wrapper_main_proText}>
          <h3 className={styles.wrapper_main_proText_title}>Описание модели</h3>
          <div className={styles.wrapper_main_proText_description}>
            {parse(String(AutoModel?.big_text_description))}
          </div>
        </div>
        <div className={styles.wrapper_main_beautifulSlides}>
          <h2 className={styles.wrapper_main_beautifulSlides_title}>Галерея</h2>
          {AutoModel && (
            <Swiper
              spaceBetween={10}
              navigation={true}
              ref={swiper2RefGallery}
              normalizeSlideIndex
              slidesPerView={2}
              speed={500}
              modules={[Navigation]}
              className={styles.swiper}
            >
              {AutoModel.slider_2.images.map((el, index) => (
                <SwiperSlide key={el.id + el.order}>
                  <img
                    style={{
                      objectFit: "cover",
                      height: "100%",
                      width: "100%",
                      border: "1px solid rgba(193, 193, 193, 0.6)",
                      borderRadius: "0.5rem",
                    }}
                    src={`https://shineray.by/media/${el.image}`}
                    alt={`Slide ${index + 1}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </motion.div>
  );
};
