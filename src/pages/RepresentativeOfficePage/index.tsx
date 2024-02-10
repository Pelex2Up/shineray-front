import { FC, useEffect } from "react";
import styles from "./RepresentativeOfficePage.module.scss";
import { useLazyFetchRepresentativeOfficePageDataQuery } from "api/mirShinerayService";
import { Preloader } from "components/Preloader";
import { HeaderSlider } from "components/HeaderCarousel";
import parse from "html-react-parser";
import { VerticalTimeline } from "react-vertical-timeline-component";

export const RepresentativeOfficePage: FC = () => {
  const [fetchData, { data: pageData, isFetching }] =
    useLazyFetchRepresentativeOfficePageDataQuery();

  useEffect(() => {
    fetchData();
  }, []);

  if (!pageData || isFetching) {
    return <Preloader />
  }

  return (
    <div className={styles.wrapper}>
      <HeaderSlider image={pageData.image_header} />
      <div className={styles.wrapper_container}>
        <div className={styles.wrapper_container_title}>
          <h3>{pageData.title}</h3>
        </div>
        <div className={styles.wrapper_container_contentBox}>
          <div className={styles.wrapper_container_contentBox_description}>
            <div
              className={styles.wrapper_container_contentBox_description_text}
            >
              {parse(pageData.content_1)}
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
                  backgroundImage: `url(http://93.177.124.158/media/${pageData.image_top_content || pageData.image_header})`,
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.wrapper_container_content2}>
          {parse(pageData.content_2)}
        </div>
        <div className={styles.wrapper_container_history}>
          {/* <div className={styles.wrapper_container_history_title}>
            <h2>История компании Shineray Group</h2>
          </div> */}
          {/* <div className={styles.wrapper_container_history_content}>
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
                    src={`http://93.177.124.158/media/${history.image}`}
                  />
                  {parse(history.text)}
                </VerticalTimelineElement>
              ))}
              <VerticalTimelineElement
                iconStyle={{ background: "#cf2626", color: "#fff" }}
                icon={<Star />}
              />
            </VerticalTimeline>
          </div> */}
        </div>
      </div>
    </div>
  );
};
