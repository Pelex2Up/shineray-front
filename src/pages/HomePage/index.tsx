import { FC, useEffect, useRef, useState } from "react";
import styles from "./homePage.module.scss";
import { HeaderSlider } from "components/HeaderCarousel";
import { NewsItem } from "components/NewsItem";
import { useLazyFetchHomePageDataQuery } from "api/homePageService";
import { generatePath } from "react-router-dom";
import { Path } from "enum/PathE";
import { LinkButton } from "components/common/Buttons";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Preloader } from "components/Preloader";
import { transliterate } from "transliteration";

export const HomePage: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fetchData, { data: HomePageData, isFetching }] =
    useLazyFetchHomePageDataQuery();
  const swiperRef = useRef<SwiperRef | null>(null);
  const [instance, setInstance] = useState<SwiperClass | null>(null);

  var isScrolling = false;

  function scrollToElement(elementId: string, scrollPosition: number) {
    if (isScrolling) return;
    isScrolling = true;
    var element = document.getElementById(elementId);
    if (element) {
      var coordinates = element.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + coordinates.top + scrollPosition,
        behavior: "smooth",
      });
    }
    setTimeout(function () {
      isScrolling = false;
    }, 1000);
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleClickModel = (index: number) => {
    if (HomePageData) {
      if (index > 0) {
        setCurrentIndex(index);
      } else {
        setCurrentIndex(0);
      }
      instance?.slideTo(
        index !== HomePageData.body.car_models.length - 1 ? index + 1 : 0,
      );
      scrollToElement("scroll-point", -120);
    }
  };

  if (!HomePageData) {
    return <Preloader />;
  }

  return (
    <div className={styles.container}>
      <HeaderSlider images={HomePageData.body.main_slider.images} />
      <div className={styles.container_carSelector}>
        <h1 style={{ display: "none" }}>
          Shineray.by - официальный представитель Shineray в Республике Беларусь
        </h1>
        <p className={styles.container_carSelector_title} id="scroll-point">
          Модельный ряд
        </p>
        <div className={styles.container_carSelector_models}>
          {HomePageData.body.car_models.map(({ name }, index) => (
            <span
              className={`${styles.container_carSelector_models_carModel} ${
                currentIndex === index
                  ? `${styles.container_carSelector_models_carModel_active}`
                  : ""
              }`}
              id={String(index)}
              key={`${index}_${name}`}
              onClick={() =>
                handleClickModel(
                  currentIndex === index ? currentIndex - 1 : index - 1,
                )
              }
            >
              {name}
            </span>
          ))}
        </div>
        <div className={styles.container_carSelector_modelPreview}>
          <Swiper
            navigation={true}
            ref={swiperRef}
            normalizeSlideIndex
            speed={500}
            spaceBetween={100}
            modules={[Navigation]}
            className={styles.swiper}
            onSwiper={setInstance}
            centeredSlides
            onSlideChange={(swiper) => {
              setCurrentIndex(swiper.realIndex);
            }}
          >
            {HomePageData.body.car_models.map((el, index) => (
              <SwiperSlide
                key={el.id + el.order}
                className={styles.container_carSelector_modelPreview_slider}
              >
                <img
                  style={{
                    objectFit: "contain",
                    height: "100%",
                    width: "100%",
                  }}
                  src={`https://shineray.by/media/${el.image_xl}`}
                  alt={`Slide ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <LinkButton
            text={"Подробнее о модели"}
            href={generatePath(Path.ModelAuto, {
              category: `${HomePageData.body.car_models[currentIndex && currentIndex > 0 ? currentIndex : 0].category}-car-preview`,
              carModel: `${HomePageData.body.car_models[currentIndex && currentIndex > 0 ? currentIndex : 0].id}${HomePageData.body.car_models[currentIndex && currentIndex > 0 ? currentIndex : 0].brand ? `-${HomePageData.body.car_models[currentIndex && currentIndex > 0 ? currentIndex : 0].brand}` : ""}-automobile-${HomePageData?.body.car_models[currentIndex && currentIndex > 0 ? currentIndex : 0].name}`,
            })}
            className={styles.modelCarDetail}
            key={currentIndex + "_details"}
          />
        </div>
        <div className={styles.newsWrapper}>
          <p className={styles.container_news_title}>Новости</p>
          <div className={styles.container_news}>
            {HomePageData.body.latest_news.map((data, index) => (
              <NewsItem
                data={data}
                key={index}
                href={generatePath(Path.NewsDetails, {
                  newsId: `${String(data.id)}-${transliterate(data.title.replace(/\s/g, "-")).toLowerCase()}`,
                })}
              />
            ))}
          </div>
          <LinkButton
            href={Path.News}
            style={{ maxWidth: "fit-content" }}
            text="Все новости"
          />
        </div>
      </div>
    </div>
  );
};
