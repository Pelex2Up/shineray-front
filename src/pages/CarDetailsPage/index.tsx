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
import { CommonButton, LinkButton } from "components/common/Buttons";
import { Email, PictureAsPdf } from "@mui/icons-material";
import { Path } from "enum/PathE";
import { Link, Modal, Typography } from "@mui/material";
import { BreadcrumbsComponent } from "components/breadcrumbs";
import { Helmet } from "react-helmet-async";
import { FindDealerForm } from "components/modal/findDealerForm";
import parse from "html-react-parser";

import styles from "./CarDetailsPage.module.scss";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export const CarDetailsPage: FC = () => {
  const params = useParams();
  const { carModel } = params;
  const [fetchData, { data: AutoModel, isLoading }] =
    useFetchCarModelDataMutation();
  const [imagePreview, { onToggle: toggleImage }] = useBoolean(false);
  const [galleryPreview, { onToggle: toggleGallery }] = useBoolean(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [galleryIndex, setGalleryIndex] = useState<number>(0);
  const [instanceModel, setInstanceModel] = useState<SwiperClass | null>(null);
  const [instanceThumb, setInstanceThumb] = useState<SwiperClass | null>(null);
  const swiperRefModel = useRef<SwiperRef | null>(null);
  const thumbsRefModel = useRef<SwiperRef | null>(null);
  const swiper2RefGallery = useRef<SwiperRef | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

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
    if (imagePreview || galleryPreview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    }
  }, [imagePreview, galleryPreview]);

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

  if (!AutoModel) {
    return <Preloader />;
  }

  return (
    <motion.div className={styles.wrapper}>
      <Helmet>
        <title>{AutoModel.title}</title>
        <meta
          name="description"
          property="og:description"
          content={`${AutoModel.title}. ${AutoModel.description.replace(/(<([^>]+)>)/gi, "")} Узнайте о модели больше!`}
        />
        <meta
          name="keywords"
          property="og:keywords"
          content={`Shineray, SRM, ${AutoModel.name}, коммерческий, автомобиль, транспорт, модель, пассажирский, грузовой, фургон, карго, логистика, перевозки, минивэн, микроавтобус, описание, технические характеристики, фото`}
        />
      </Helmet>
      <PreviewModal
        slides={AutoModel.slider_1.images}
        toggleModal={toggleImage}
        changeIndex={setCurrentIndex}
        currentIndex={currentIndex}
        imagePreview={imagePreview}
      />
      <PreviewModal
        slides={AutoModel.slider_2.images}
        toggleModal={toggleGallery}
        changeIndex={setGalleryIndex}
        currentIndex={galleryIndex}
        imagePreview={galleryPreview}
      />
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
                          cursor: "pointer",
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
            <div style={{ fontWeight: "400", fontSize: "18px" }}>
              {parse(AutoModel?.description)}
            </div>
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
                  {AutoModel.brand
                    ? `${AutoModel.brand} ${AutoModel.name}`
                    : AutoModel.name}
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
                href={`https://shineray.by/media/${AutoModel.tech_pdf}`}
                target="_blank"
                rel="norefferrer"
              >
                <PictureAsPdf style={{ marginRight: "0.3rem" }} />
              </LinkButton>
            )}
            <CommonButton
              className={styles.techButton}
              text="Запросить предложение"
              onClick={() => setShowModal(true)}
            >
              <Email style={{ marginRight: "0.3rem" }} />
            </CommonButton>
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
              onSlideChange={(swiper) => {
                setGalleryIndex(swiper.realIndex);
              }}
            >
              {AutoModel.slider_2.images.map((el, index) => (
                <SwiperSlide key={el.id + el.order}>
                  <img
                    onClick={() => {
                      toggleGallery();
                      setGalleryIndex(index);
                    }}
                    style={{
                      objectFit: "cover",
                      cursor: "pointer",
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
      {showModal && (
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          aria-labelledby="modal-modal-dealer-message"
          aria-describedby="modal-modal-dealer-message"
        >
          <FindDealerForm closeModal={() => setShowModal(false)} />
        </Modal>
      )}
    </motion.div>
  );
};
