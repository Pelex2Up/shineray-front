import { FC, useEffect, useRef, useState } from "react";
import styles from "./homePage.module.scss";
import buttonStyles from "../MirShinerayPage/MirShineray.module.scss";
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
import { MiniBlock } from "components/MiniBlocks";
import parse from "html-react-parser";
import {
  dealerNetworkIcon,
  equipmentIcon,
  guaranteeIcon,
  represetationIcon,
  serviceIcon,
  sparePartsIcon,
} from "components/MiniBlocks/assets";

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
        <div className={styles.homePageTextWrapperBlock}>
          <div className={styles.container_mainPageText}>
            <h2 className={styles.container_mainPageText_title}>
              {HomePageData.body.site_desc.title}
            </h2>
            <div className={styles.container_mainPageText_description}>
              {parse(HomePageData.body.site_desc.description)}
            </div>
          </div>
        </div>
        <ul
          className={buttonStyles.pageWrapper_index_content_buttonsBlock}
          style={{ padding: "0 2rem" }}
        >
          <li
            className={
              buttonStyles.pageWrapper_index_content_buttonsBlock_button
            }
          >
            <a
              className={
                buttonStyles.pageWrapper_index_content_buttonsBlock_button_linkWrapper
              }
              href={Path.Warranty}
            >
              <img
                src={`https://shineray.by/media/${HomePageData.body.main_sections.warranty.image_header}`}
                alt={HomePageData.body.main_sections.warranty.title}
              />
              <div
                className={
                  buttonStyles.pageWrapper_index_content_buttonsBlock_button_textWrapper
                }
              >
                <p>{HomePageData.body.main_sections.warranty.title}</p>
              </div>
            </a>
          </li>
          <li
            className={
              buttonStyles.pageWrapper_index_content_buttonsBlock_button
            }
          >
            <a
              className={
                buttonStyles.pageWrapper_index_content_buttonsBlock_button_linkWrapper
              }
              href={Path.Dealer}
            >
              <img
                src={`https://shineray.by/media/${HomePageData.body.main_sections.maintenance.image_header}`}
                alt={HomePageData.body.main_sections.maintenance.title}
              />
              <div
                className={
                  buttonStyles.pageWrapper_index_content_buttonsBlock_button_textWrapper
                }
              >
                <p>{HomePageData.body.main_sections.maintenance.title}</p>
              </div>
            </a>
          </li>
          <li
            className={
              buttonStyles.pageWrapper_index_content_buttonsBlock_button
            }
          >
            <a
              className={
                buttonStyles.pageWrapper_index_content_buttonsBlock_button_linkWrapper
              }
              href={Path.TechDocs}
            >
              <img
                src={`https://shineray.by/media/${HomePageData.body.main_sections.documentation.image_header}`}
                alt={HomePageData.body.main_sections.documentation.title}
              />
              <div
                className={
                  buttonStyles.pageWrapper_index_content_buttonsBlock_button_textWrapper
                }
              >
                <p>{HomePageData.body.main_sections.documentation.title}</p>
              </div>
            </a>
          </li>
        </ul>
        <p
          className={styles.container_carSelector_title}
          style={{ paddingTop: "1rem" }}
          id="scroll-point"
        >
          Преимущества компании и коммерческого транспорта Shineray
        </p>
        <div className={styles.miniBlocksWrapper}>
          <MiniBlock
            title="Официальное представительство"
            description="Представитель бренда Shineray имеет прямой контакт с производителем, что облегчает взаимодействие и обеспечивает оперативное решение задач."
            icon={represetationIcon}
          />
          <MiniBlock
            title="Официальная дилерская сеть"
            description="Дилерские центры расположены на всей территории страны, в том числе в Минске и областных городах. Прозрачная система заказа, поставки и покупки автомобилей."
            icon={dealerNetworkIcon}
          />
          <MiniBlock
            title="Официальная гарантия"
            description="Компания Shineray гарантирует безвозмездное устранение дефектов качества автомобиля, возникших по вине изготовителя. Гарантийный срок - 3 года или 100000 км*."
            icon={guaranteeIcon}
          />
          <MiniBlock
            title="Официальные сервисные центры"
            description="Оказание полного спектра сервисных услуг по техническому обслуживанию автомобилей Shineray, в том числе гарантийный ремонт. Быстрый сервис."
            icon={serviceIcon}
          />
          <MiniBlock
            title="Оригинальные запасные части"
            description="Официальные поставки оригинальных запасных частей с формированием большого склада, включая кузовные детали и расходные материалы. Гарантийный срок - 1 год или 20000 км*."
            icon={sparePartsIcon}
          />
          <MiniBlock
            title="Официальное переоборудование и дооборудование"
            description="Наличие возможности переоборудовать автомобиль в грузопассажирскую версию, а также дооборудовать грузовой автомобиль, в зависимости от потребностей и пожеланий клиента."
            icon={equipmentIcon}
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
