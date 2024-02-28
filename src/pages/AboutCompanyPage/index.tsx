import { FC, useEffect, useRef, useState } from "react";
import styles from "./AboutCompanyPage.module.scss";
import { HeaderSlider } from "components/HeaderCarousel";
import parse from "html-react-parser";
import { useLazyFetchAboutCompanyPageDataQuery } from "api/mirShinerayService";
import { Preloader } from "components/Preloader";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ISliderImage } from "types/componentTypes";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Star, DriveEta } from "@mui/icons-material";
import { Path } from "enum/PathE";
import { Link } from "@mui/material";
import { BreadcrumbsComponent } from "components/breadcrumbs";

export const AboutCompanyPage: FC = () => {
  const [fetchData, { data: pageData }] =
    useLazyFetchAboutCompanyPageDataQuery();
  const sliderRef = useRef<SwiperRef | null>(null);
  const [groupedSlides, setGroupedSlides] = useState<ISliderImage[][]>();

  useEffect(() => {
    fetchData()
      .unwrap()
      .then((data) => (document.title = data.body.about_company.title));
  }, [fetchData]);

  useEffect(() => {
    if (pageData) {
      const sorted: ISliderImage[][] =
        pageData.body.about_company.slider_1.images.reduce(
          (result: ISliderImage[][], image: ISliderImage, index: number) => {
            const groupIndex = Math.floor(index / 5);
            if (!result[groupIndex]) {
              result[groupIndex] = [];
            }
            result[groupIndex].push(image);
            return result;
          },
          [],
        );

      if (sorted.length) {
        setGroupedSlides(sorted);
      }
    }
  }, [pageData]);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href={Path.Home}>
      Главная
    </Link>,
    <Link underline="hover" key="2" color="inherit" href={Path.MirShineray}>
      Мир Shineray
    </Link>,
    <Link underline="hover" key="2" color="inherit" href={Path.AboutCompany}>
      О компании Shineray Group
    </Link>,
  ];

  if (!pageData || !groupedSlides) {
    return <Preloader />;
  }

  return (
    <div className={styles.wrapper}>
      <HeaderSlider image={pageData.body.about_company.image_header} />
      <BreadcrumbsComponent data={breadcrumbs} />
      <div className={styles.wrapper_container}>
        <div className={styles.wrapper_container_title}>
          <h3>{pageData.body.about_company.title}</h3>
        </div>
        <div className={styles.wrapper_container_contentBox}>
          <div className={styles.wrapper_container_contentBox_description}>
            <div
              className={styles.wrapper_container_contentBox_description_text}
            >
              {parse(pageData.body.about_company.content_1)}
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
                  backgroundImage: `url(https://dev.shineray.by/media/${pageData.body.about_company.image_top_content})`,
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.wrapper_container_content2}>
          {parse(pageData.body.about_company.content_2)}
        </div>
        <div className={styles.wrapper_container_title}>
          <h1>Производство автомобилей</h1>
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
            autoplay={true}
            speed={500}
            modules={[Navigation]}
            className={styles.wrapper_container_factory_swiper}
          >
            {groupedSlides?.map((el, index) => (
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
                                src={`https://dev.shineray.by/media/${element.image}`}
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
                        src={`https://dev.shineray.by/media/${el[el.length - 1].image}`}
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
              {pageData.body.histories.map((history, index) => (
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  date={history.event_date.split("-")[0]}
                  dateClassName={
                    index % 2 === 0 ? styles.dateTimeLeft : styles.dateTimeRight
                  }
                  contentArrowStyle={
                    index % 2 === 0
                      ? {
                          borderRight: "7px solid  #cf2626",
                        }
                      : {
                          borderLeft: "7px solid  #cf2626",
                          transform: "rotate(180deg)",
                        }
                  }
                  iconStyle={{
                    background: "#cf2626",
                    color: "#fff",
                  }}
                  icon={<DriveEta />}
                  key={index}
                >
                  <img
                    style={{ width: "100%", borderRadius: "1rem" }}
                    src={`https://dev.shineray.by/media/${history.image}`}
                    alt={`${history.id + history.title}`}
                  />
                  {parse(history.text)}
                </VerticalTimelineElement>
              ))}
              <VerticalTimelineElement
                iconStyle={{ background: "#cf2626", color: "#fff" }}
                icon={<Star />}
              />
            </VerticalTimeline>
          </div>
        </div>
        B
      </div>
    </div>
  );
};
