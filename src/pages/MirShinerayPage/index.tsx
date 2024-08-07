import { FC, useEffect } from "react";
import styles from "./MirShineray.module.scss";
import { HeaderSlider } from "components/HeaderCarousel";
import { Path } from "enum/PathE";
import { useLazyFetchMirShinerayPageDataQuery } from "api/mirShinerayService";
import { Preloader } from "components/Preloader";
import { BreadcrumbsComponent } from "components/breadcrumbs";
import { Link } from "@mui/material";
import { Helmet } from "react-helmet-async";

export const MirShinerayPage: FC = () => {
  const [fetchData, { data: MirShineray, isFetching }] =
    useLazyFetchMirShinerayPageDataQuery();

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
  ];

  if (!MirShineray) {
    return <Preloader />;
  }

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>Мир Shineray | Информация о компании | История | Юридическая информация</title>
        <meta
          name="description"
          property="og:description"
          content={`Информация о компании и бренде Shineray в Республике Беларусь. Юридическая и правовая информация. Узнайте подробнее.`}
        />
        <meta
          name="keywords"
          property="og:keywords"
          content={`Shineray, SRM, SWM, официальный, представитель, дистрибьютор, марка, брэнд, бренд, Республика Беларусь, Беларусь, контакты, информация, контактная`}
        />
      </Helmet>
      <HeaderSlider image={MirShineray.body.page_header.image} />
      <BreadcrumbsComponent data={breadcrumbs} />
      <div className={styles.pageWrapper_index}>
        <div className={styles.pageWrapper_index_content}>
          <div className={styles.pageWrapper_index_title}>
            <h1>{'Мир Shineray'}</h1>
          </div>
          <ul className={styles.pageWrapper_index_content_buttonsBlock}>
            <li
              className={styles.pageWrapper_index_content_buttonsBlock_button}
            >
              <a
                className={
                  styles.pageWrapper_index_content_buttonsBlock_button_linkWrapper
                }
                href={Path.AboutCompany}
              >
                <img
                  src={`https://shineray.by/media/${MirShineray.body.content.about_company.image_header}`}
                  alt="Shineray about"
                />
                <div
                  className={
                    styles.pageWrapper_index_content_buttonsBlock_button_textWrapper
                  }
                >
                  <p>{MirShineray.body.content.about_company.title}</p>
                </div>
              </a>
            </li>
            <li
              className={styles.pageWrapper_index_content_buttonsBlock_button}
            >
              <a
                className={
                  styles.pageWrapper_index_content_buttonsBlock_button_linkWrapper
                }
                href={Path.AboutBelarus}
              >
                <img
                  src={`https://shineray.by/media/${MirShineray.body.content.about_us.image_header}`}
                  alt="Shineray belarus"
                />
                <div
                  className={
                    styles.pageWrapper_index_content_buttonsBlock_button_textWrapper
                  }
                >
                  <p>{MirShineray.body.content.about_us.title}</p>
                </div>
              </a>
            </li>
            <li
              className={styles.pageWrapper_index_content_buttonsBlock_button}
            >
              <a
                className={
                  styles.pageWrapper_index_content_buttonsBlock_button_linkWrapper
                }
                href={Path.LegalInformation}
              >
                <img
                  src={`https://shineray.by/media/${MirShineray.body.content.legal_information.image_header}`}
                  alt="Shineray legal information"
                />
                <div
                  className={
                    styles.pageWrapper_index_content_buttonsBlock_button_textWrapper
                  }
                >
                  <p>{MirShineray.body.content.legal_information.title}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
