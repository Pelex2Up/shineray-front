import { FC, useRef } from "react";
import styles from "./AboutCompanyPage.module.scss";
import { HeaderSlider } from "components/HeaderCarousel";
import parse from "html-react-parser";
import { useFetchAboutCompanyPageDataQuery } from "api/mirShinerayService";
import { Preloader } from "components/Preloader";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ISliderImage } from "types/componentTypes";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { WorkHistory, Star } from "@mui/icons-material";

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
        <div className={styles.wrapper_container_factory2}>
          <VerticalTimeline>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              contentArrowStyle={{
                borderRight: "7px solid  rgb(33, 150, 243)",
              }}
              date="2023.2"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<WorkHistory />}
            >
              <img
                style={{ width: "100%" }}
                src="https://www.shineray.com/upload/ad/1678211770659886.jpg"
              />
              <p>
                The SWM G03F EDi Is Officially Launched, Postioned As An
                Extended-Range-7-Seat SUV ,Will Soon Be Available In Multiple
                Countries In South America.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2022.11"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<WorkHistory />}
            >
              <img
                style={{ width: "100%" }}
                src="https://www.shineray.com/upload/ad/1678211605494386.jpg"
              />
              <p>
                The G01F-DCT Model Was Officially Launched For Sale In Germany.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2022.7"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<WorkHistory />}
            >
              <img
                style={{ width: "100%" }}
                src="https://www.shineray.com/upload/ad/1678211555992581.jpg"
              />
              <p>
                Shineray Group Initiated Strategic Cooperation With CATL To
                Jointly Build The First Brand Of New Energy Intra-City
                Distribution Logistics.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="2022.7"
              iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
              icon={<WorkHistory />}
            >
              <img
                style={{ width: "100%" }}
                src="https://www.shineray.com/upload/ad/1678211998868139.jpg"
              />
              <p>
                X30L EV Was Officially Launched In Korea Andsoldin Many
                Countries : Korea, Spain, Italy, Ecuador, Poland, Singapore And
                Malaysia.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="2021.10"
              iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
              icon={<WorkHistory />}
            >
              <img
                src="https://www.shineray.com/upload/ad/1678211445209349.jpg"
                style={{ width: "100%" }}
              />
              <p>
                Vehicles Of SHINERAY Brand Began To Be Sold In Nigeria And The
                Nigerian Subsidiary Was Established On June 1 Of The Same Year.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="2021.9"
              iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
              icon={<WorkHistory />}
            >
              <img
                src="https://www.shineray.com/upload/ad/1678211391939550.jpg"
                style={{ width: "100%" }}
              />
              <p>
                The First Multi-Purpose MPV Of Shineray Group, M5, Was
                Officially Launched On The Market.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="2021.6"
              iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
              icon={<WorkHistory />}
            >
              <img
                src="https://www.shineray.com/upload/ad/1678211275795454.jpg"
                style={{ width: "100%" }}
              />
              <p>The Brand SHINERAY Successfully Accessed The Kenyan Market.</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="2021.4"
              iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
              icon={<WorkHistory />}
            >
              <img
                src="https://www.shineray.com/upload/ad/1678210975109094.jpg"
                style={{ width: "100%" }}
              />
              <p>The SWM G01F DCT Was Officially Launched.</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="2020.10"
              iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
              icon={<WorkHistory />}
            >
              <img
                src="https://www.shineray.com/upload/ad/1650962373316657.jpg"
                style={{ width: "100%" }}
              />
              <p>
                Shineray Group Co., Ltd. And Qingling Motors Co., Ltd. Started
                Joint Venture Cooperation.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="2019.7"
              iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
              icon={<WorkHistory />}
            >
              <img
                src="https://www.shineray.com/upload/ad/1650962350795703.jpg"
                style={{ width: "100%" }}
              />
              <p>
                Shineray Established Growth Sports Culture (Chongqing) Co., Ltd.
                Through Acquisition.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
              icon={<Star />}
            />
          </VerticalTimeline>
        </div>
      </div>
    </div>
  );
};
