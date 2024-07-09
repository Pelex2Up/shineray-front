import { FC, useEffect } from "react";
import styles from "./RepresentativeOfficePage.module.scss";
import { useLazyFetchRepresentativeOfficePageDataQuery } from "api/mirShinerayService";
import { Preloader } from "components/Preloader";
import { HeaderSlider } from "components/HeaderCarousel";
import parse from "html-react-parser";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { DriveEta, Star } from "@mui/icons-material";
import { Path } from "enum/PathE";
import { Link } from "@mui/material";
import { BreadcrumbsComponent } from "components/breadcrumbs";
import { Helmet } from "react-helmet-async";

export const RepresentativeOfficePage: FC = () => {
  const [fetchData, { data: pageData, isFetching }] =
    useLazyFetchRepresentativeOfficePageDataQuery();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href={Path.Home}>
      Главная
    </Link>,
    <Link underline="hover" key="2" color="inherit" href={Path.MirShineray}>
      Мир Shineray
    </Link>,
    <Link underline="hover" key="2" color="inherit" href={Path.AboutBelarus}>
      О нас и бренде Shineray
    </Link>,
  ];

  if (!pageData) {
    return <Preloader />;
  }

  return (
    <>
      <Helmet>
        <title>О нас и бренде Shineray в Республике Беларусь</title>
        <meta
          name="description"
          property="og:description"
          content={`О компании ООО "Лакшери Моторс групп" | Официальный представитель и эксклюзивный дистрибьютор Shineray в Республике Беларусь | Дилерская сеть Shineray`}
        />
        <meta
          name="keywords"
          property="og:keywords"
          content={`Shineray, SRM, SWM, официальный, представитель, дистрибьютор, марка, брэнд, бренд, дилер, дилерская, сеть, Республика Беларусь, Беларусь`}
        />
      </Helmet>
      <div className={styles.wrapper}>
        <HeaderSlider image={pageData.body.about_company.image_header} />
        <BreadcrumbsComponent data={breadcrumbs} />
        <div className={styles.wrapper_container}>
          <div className={styles.wrapper_container_title}>
            <h1>{pageData.body.about_company.title}</h1>
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
                className={
                  styles.wrapper_container_contentBox_pictureBox_skewed
                }
              >
                <div
                  className={
                    styles.wrapper_container_contentBox_pictureBox_skewed_picture
                  }
                  style={{
                    backgroundPosition: "center",
                    backgroundImage: `url(https://shineray.by/media/${pageData.body.about_company.image_top_content || pageData.body.about_company.image_header})`,
                  }}
                />
              </div>
            </div>
          </div>
          {pageData.body.about_company.content_2 !==
            "<p>&lt;p&gt;&lt;/p&gt;</p>" && (
            <div className={styles.wrapper_container_content2}>
              {parse(pageData.body.about_company.content_2)}
            </div>
          )}
          <div className={styles.wrapper_container_history}>
            {/* <div className={styles.wrapper_container_history_title}>
            <h2>История компании Shineray Group</h2>
          </div> */}
            <div className={styles.wrapper_container_history_content}>
              {pageData.body.histories.length > 0 && (
                <VerticalTimeline lineColor="#b8b8b8">
                  {pageData.body.histories.map((history, index) => (
                    <VerticalTimelineElement
                      className="vertical-timeline-element--work"
                      date={history.event_date.split("-")[0]}
                      dateClassName={
                        index % 2 === 0
                          ? styles.dateTimeLeft
                          : styles.dateTimeRight
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
                        src={`https://shineray.by/media/${history.image}`}
                        alt={`${history.id}_${history.text}`}
                      />
                      {parse(history.text)}
                    </VerticalTimelineElement>
                  ))}
                  <VerticalTimelineElement
                    iconStyle={{ background: "#cf2626", color: "#fff" }}
                    icon={<Star />}
                  />
                </VerticalTimeline>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
