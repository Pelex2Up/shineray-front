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

const News = [
  {
    source: "source",
    imageUrl: "https://www.shineray.com/upload/news/1697181377223443.jpg",
    title:
      "Shineray Motors Its Presence in Uzbek Market with Debut of New Generation Product",
    description: `On September 26, the Shineray Motors Brand Launch and T3 Debut Event was held at the NAVRO'Z Hotel in Tashkent, the capital of Uzbekistan. Media representatives and distinguished guests from various sectors of Uzbek society witnessed this historic moment for Shineray.`,
    date: "date",
  },
  {
    source: "source",
    imageUrl: "https://www.shineray.com/upload/news/1700535542272496.jpg",
    title: `China's SWM will hit the road in December`,
    description: `China's Automotive Giant Shineray Group's Italian brand SWM will enter the Turkish market`,
    date: "date",
  },
  {
    source: "source",
    imageUrl: "https://www.shineray.com/upload/news/1700535016462634.jpg",
    title:
      "Shineray Forges Official Partnership with Inter to Boost Its Globalization!",
    description:
      "On September 29, 2023, Shineray Motors (Shineray) andInter Milan Football Club(Inter) officially announced their official partnership in Milan, Italy. Shineray has become the official global car partner of Inter. Shineray Director Xie Yong, Inter CEO Alessandro Antonello, and Inter legend Fabio Galante attended the signing ceremony, to witness this historic moment. This marks the second time Shineray has partnered with Inter since their first official strategic cooperation in 2017. The collaboration is a win-win and mutually beneficial prospect. Shineray stated that the partnership would further enhance its global influence, boost its international business strategy, and accelerate its brand-building process.",
    date: "date",
  },
  {
    source: "source",
    imageUrl: "https://www.shineray.com/upload/product/1677031677823980.jpg",
    title: "title",
    description: "description",
    date: "date",
  },
];

export const HomePage: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fetchData, { data: HomePageData, isFetching }] =
    useLazyFetchHomePageDataQuery();
  const swiperRef = useRef<SwiperRef | null>(null);
  const [instance, setInstance] = useState<SwiperClass | null>(null);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleClickModel = (index: number) => {
    if (HomePageData) {
      setCurrentIndex(index);
      instance?.slideTo(
        index !== HomePageData.body.car_models.length - 1 ? index + 1 : 0,
      );
    }
  };

  if (!HomePageData || isFetching) {
    return <Preloader />;
  }

  return (
    <div className={styles.container}>
      <HeaderSlider images={HomePageData.body.main_slider.images} />
      <div className={styles.container_carSelector}>
        <p className={styles.container_carSelector_title}>Модельный ряд</p>
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
              onClick={() => handleClickModel(index - 1)}
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
                  src={`http://93.177.124.158/media/${el.image_xl}`}
                  alt={`Slide ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <LinkButton
            text={"Подробнее о модели"}
            href={generatePath(Path.ModelAuto, {
              carModel: `${HomePageData.body.car_models[currentIndex ? currentIndex : 0].id}-shineray-automobile-${HomePageData?.body.car_models[currentIndex ? currentIndex : 0].name}`,
            })}
            className={styles.modelCarDetail}
            key={currentIndex}
          />
        </div>
        <div className={styles.newsWrapper}>
          <p className={styles.container_news_title}>Новости</p>
          <div className={styles.container_news}>
            {HomePageData.body.latest_news.map((data, index) => (
              <NewsItem
                data={data}
                key={index}
                href={generatePath(Path.NewsDetails, { newsId: String(data.id) })}
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
