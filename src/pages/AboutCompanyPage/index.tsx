import { FC, useRef } from "react";
import styles from "./AboutCompanyPage.module.scss";
import { HeaderSlider } from "components/HeaderCarousel";
import parse from "html-react-parser";
import { useFetchAboutCompanyPageDataQuery } from "api/mirShinerayService";
import { Preloader } from "components/Preloader";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ISlider, ISliderImage } from "types/componentTypes";

export const AboutCompanyPage: FC = () => {
  const { data: PageData, isFetching } = useFetchAboutCompanyPageDataQuery();
  const sliderRef = useRef<SwiperRef | null>(null);

  const groupedSlides: Array<Array<ISliderImage>> = [];

  if (PageData) {
    for (let i = 0; i < PageData?.slider_1.images.length; i += 5) {
      groupedSlides.push(PageData?.slider_1.images.slice(i, i + 5));
    }
  }

  if (!PageData || isFetching) {
    return <Preloader />;
  }

  return (
    <div className={styles.wrapper}>
      <HeaderSlider image={PageData.image_header} />
      <div className={styles.wrapper_container}>
        <h3>{PageData.title}</h3>
        <div className={styles.wrapper_container_contentBox}>
          <div className={styles.wrapper_container_contentBox_description}>
            <div
              className={styles.wrapper_container_contentBox_description_text}
            >
              {parse(PageData.content_1.split("Миссия Shineray Group")[0])}
            </div>
          </div>
          <div className={styles.wrapper_container_contentBox_pictureBox}>
            <div
              className={styles.wrapper_container_contentBox_pictureBox_skewed}
            >
              <div
                className={
                  styles.wrapper_container_contentBox_pictureBox_skewed_picture
                }
                style={{
                  backgroundImage: `url(http://93.177.124.158/media/${PageData.image_top_content})`,
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.wrapper_container_factory}>
          <Swiper
            spaceBetween={10}
            navigation={true}
            centeredSlides={true}
            ref={sliderRef}
            slidesPerView={1}
            lazyPreloadPrevNext={1}
            normalizeSlideIndex
            autoplay
            modules={[Navigation]}
            className={styles.wrapper_container_factory_swiper}
          >
            {groupedSlides.map((el, index) => (
              <SwiperSlide key={index}>
                <div
                  className={styles.wrapper_container_factory_swiper_imageBox}
                >
                  <ul>
                    {el.map((element, index) => {
                      if (index === el.length - 1) {
                        return null;
                      } else {
                        console.log(el.length - 1);
                        console.log(index);
                        return (
                          <li>
                            <a>
                              <img
                                src={`http://93.177.124.158/media/${element.image}`}
                                alt="Factory small image"
                              />
                            </a>
                          </li>
                        );
                      }
                    })}
                  </ul>
                  <div
                    className={
                      styles.wrapper_container_factory_swiper_imageBox_bigImage
                    }
                  >
                    <a>
                      <img
                        src={`http://93.177.124.158/media/${el[el.length - 1].image}`}
                      />
                    </a>
                  </div>
                </div>
                {/* <img
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                    border: "1px solid rgba(193, 193, 193, 0.6)",
                    borderRadius: "0.3rem",
                  }}
                  src={`http://93.177.124.158/media/${el.image}`}
                  alt={`Slide ${el.name} ${index + 1}`}
                /> */}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.wrapper_container_factory2}></div>
      </div>
    </div>
  );
};
