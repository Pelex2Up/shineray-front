import { FC, useEffect } from "react";
import styles from "../MirShinerayPage/MirShineray.module.scss";
import { useLazyFetchForOwnersDataQuery } from "api/ownersService";
import { Preloader } from "components/Preloader";
import { HeaderSlider } from "components/HeaderCarousel";
import { Path } from "enum/PathE";
import { BreadcrumbsComponent } from "components/breadcrumbs";
import { Link } from "@mui/material";
import { Helmet } from "react-helmet-async";

export const ForOwnersPage: FC = () => {
  const [fetchData, { data: pageData, isFetching, isLoading }] =
    useLazyFetchForOwnersDataQuery();

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href={Path.Home}>
      Главная
    </Link>,
    <Link underline="hover" key="2" color="inherit" href={Path.Owners}>
      Владельцам
    </Link>,
  ];

  useEffect(() => {
    if (!pageData && !isFetching && !isLoading) {
      fetchData();
    }
  }, [fetchData, pageData, isFetching, isLoading]);

  if (!pageData) {
    return <Preloader />;
  }

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>Информация для владельцев автомобилей Shineray</title>
        <meta
          name="description"
          property="og:description"
          content={`Информация для владельцев автомобилей бренда Shineray: гарантийная политика, техническое обслуживание, техническая документация на автомобили Shineray. Узнайте больше!`}
        />
        <meta
          name="keywords"
          property="og:keywords"
          content={`Shineray, SRM, брэнд, бренд, марка, гарантия, гарантийная, политика, обязательства, условия, техническое обслуживание, ТО, документация`}
        />
      </Helmet>
      <HeaderSlider image={pageData.body.page_header.image} />
      <BreadcrumbsComponent data={breadcrumbs} />
      <div className={styles.pageWrapper_index}>
        <div className={styles.pageWrapper_index_content}>
          <div className={styles.pageWrapper_index_title}>
            <h1>{"Владельцам"}</h1>
          </div>
          <ul className={styles.pageWrapper_index_content_buttonsBlock}>
            <li
              className={styles.pageWrapper_index_content_buttonsBlock_button}
            >
              <a
                className={
                  styles.pageWrapper_index_content_buttonsBlock_button_linkWrapper
                }
                href={Path.Warranty}
              >
                <img
                  src={`https://shineray.by/media/${pageData.body.content.warranty.image_header}`}
                  alt="Warranty page"
                />
                <div
                  className={
                    styles.pageWrapper_index_content_buttonsBlock_button_textWrapper
                  }
                >
                  <p>{pageData.body.content.warranty.title}</p>
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
                href={Path.TechSupport}
              >
                <img
                  src={`https://shineray.by/media/${pageData.body.content.maintenance.image_header}`}
                  alt="Maintenance page"
                />
                <div
                  className={
                    styles.pageWrapper_index_content_buttonsBlock_button_textWrapper
                  }
                >
                  <p>{pageData.body.content.maintenance.title}</p>
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
                href={Path.TechDocs}
              >
                <img
                  src={`https://shineray.by/media/${pageData.body.content.documentation.image_header}`}
                  alt="Technical documentation page"
                />
                <div
                  className={
                    styles.pageWrapper_index_content_buttonsBlock_button_textWrapper
                  }
                >
                  <p>{pageData.body.content.documentation.title}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
