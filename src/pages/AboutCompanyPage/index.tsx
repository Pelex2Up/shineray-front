import { FC, useEffect, useRef } from "react";
import styles from "./AboutCompanyPage.module.scss";
import { HeaderSlider } from "components/HeaderCarousel";
import parse from "html-react-parser";
import { useFetchAboutCompanyPageDataQuery } from "api/mirShinerayService";
import { Preloader } from "components/Preloader";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ISliderImage } from "types/componentTypes";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { WorkHistory, Star } from "@mui/icons-material";

export const AboutCompanyPage: FC = () => {
  const {
    data: PageData,
    isFetching,
    isSuccess,
  } = useFetchAboutCompanyPageDataQuery();
  const sliderRef = useRef<SwiperRef | null>(null);
  const groupedSlides: Array<Array<ISliderImage>> = [];

  useEffect(() => {
    if (isSuccess && PageData && PageData.body) {
      for (
        let i = 0;
        i < PageData.body.about_company.slider_1.images.length;
        i += 5
      ) {
        groupedSlides.push(
          PageData.body.about_company.slider_1.images.slice(i, i + 5),
        );
      }
    }
  }, [PageData, isSuccess]);

  if (!PageData || isFetching || !groupedSlides.length) {
    return <Preloader />;
  }

  return (
    <div className={styles.wrapper}>
      <HeaderSlider image={PageData.body.about_company.image_header} />
      <div className={styles.wrapper_container}>
        <h3>{PageData.body.about_company.title}</h3>
        <div className={styles.wrapper_container_contentBox}>
          <div className={styles.wrapper_container_contentBox_description}>
            <div
              className={styles.wrapper_container_contentBox_description_text}
            >
              {parse(PageData.body.about_company.content_1)}
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
                  backgroundImage: `url(http://93.177.124.158/media/${PageData.body.about_company.image_top_content})`,
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.wrapper_container_content2}>
          {parse(PageData.body.about_company.content_2)}
        </div>
        <h1>Производство автомобилей</h1>
        <div className={styles.wrapper_container_factory}>
          <Swiper
            spaceBetween={10}
            navigation={true}
            centeredSlides={true}
            ref={sliderRef}
            slidesPerView={1}
            lazyPreloadPrevNext={1}
            normalizeSlideIndex
            autoplay={true}
            speed={500}
            modules={[Navigation]}
            className={styles.wrapper_container_factory_swiper}
          >
            {groupedSlides.map((el, index) => (
              <SwiperSlide key={index}>
                <div
                  className={styles.wrapper_container_factory_swiper_imageBox}
                  key={el[index].order}
                >
                  <ul>
                    {el.map((element, index) => {
                      if (index === el.length - 1) {
                        return null;
                      } else {
                        return (
                          <li key={el[index].id}>
                            <div>
                              <img
                                src={`http://93.177.124.158/media/${element.image}`}
                                alt="Factory small"
                              />
                            </div>
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
                    <div>
                      <img
                        src={`http://93.177.124.158/media/${el[el.length - 1].image}`}
                        alt="Factory Big"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.wrapper_container_history}>
          <div className={styles.wrapper_container_history_title}>
            <h2>История компании Shineray Group</h2>
          </div>
          <div className={styles.wrapper_container_history_content}>
            <VerticalTimeline lineColor="#b8b8b8">
              {PageData.body.histories.map((history, index) => (
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  date={history.event_date}
                  contentArrowStyle={
                    index % 2 === 0
                      ? {
                          borderRight: "7px solid  rgb(33, 150, 243)",
                        }
                      : {
                          borderLeft: "7px solid  rgb(233, 30, 99)",
                          transform: "rotate(180deg)",
                        }
                  }
                  iconStyle={{
                    background:
                      index % 2 === 0
                        ? "rgb(33, 150, 243)"
                        : "rgb(233, 30, 99)",
                    color: "#fff",
                  }}
                  icon={<WorkHistory />}
                  key={index}
                >
                  <img
                    style={{ width: "100%", borderRadius: "1rem" }}
                    src={`http://93.177.124.158/media/${history.image}`}
                  />
                  {parse(history.text)}
                </VerticalTimelineElement>
              ))}
              <VerticalTimelineElement
                iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
                icon={<Star />}
              />
            </VerticalTimeline>
          </div>
        </div>
      </div>
    </div>
  );
};
