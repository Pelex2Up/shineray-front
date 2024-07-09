import { Link, Typography } from "@mui/material";
import { useLazyFetchTechSupportDataQuery } from "api/ownersService";
import { HeaderSlider } from "components/HeaderCarousel";
import { Preloader } from "components/Preloader";
import { BreadcrumbsComponent } from "components/breadcrumbs";
import { Path } from "enum/PathE";
import { FC, useEffect } from "react";
import styles from "../WarrantyPage/warrantyPage.module.scss";
import parse from "html-react-parser";
import { Helmet } from "react-helmet-async";

export const TechSupportPage: FC = () => {
  const [fetchData, { data: pageData, isFetching, isLoading }] =
    useLazyFetchTechSupportDataQuery();

  useEffect(() => {
    if (!pageData) {
      fetchData();
    }
  }, [fetchData, pageData]);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href={Path.Home}>
      Главная
    </Link>,
    <Link underline="hover" key="2" color="inherit" href={Path.Owners}>
      Владельцам
    </Link>,
    <Typography key="3" color="text.primary">
      {pageData?.body.content.title}
    </Typography>,
  ];

  if (!pageData) {
    return <Preloader />;
  }

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>Техническое обслуживание автомобилей Shineray</title>
        <meta
          name="description"
          property="og:description"
          content={`Периодическое техническое обслуживание (ТО) автомобилей Shineray: цели, задачи, регламент, перечень работ, периодичность проведения.`}
        />
        <meta
          name="keywords"
          property="og:keywords"
          content={`Shineray, SRM, брэнд, бренд, марка, гарантия, гарантийная, политика, обязательства, условия, техническое обслуживание, ТО, документация`}
        />
      </Helmet>
      <HeaderSlider image={pageData.body.page_header.image} />
      <BreadcrumbsComponent data={breadcrumbs} />
      <div className={styles.wrapper_content}>
        <div className={styles.wrapper_content_title}>
          <h1>{pageData.body.content.title}</h1>
        </div>
        <div>{parse(pageData.body.content.content)}</div>
        <ul className={styles.wrapper_content_buttonsBlock}>
          <li className={styles.wrapper_content_buttonsBlock_button}>
            <a
              className={styles.wrapper_content_buttonsBlock_button_linkWrapper}
              href={Path.TechDocs}
            >
              <img
                src={`https://shineray.by/media/${pageData.body.urls.documentation.image_header}`}
                alt="Техническая документация"
              />
              <div
                className={
                  styles.wrapper_content_buttonsBlock_button_textWrapper
                }
              >
                <p>{pageData.body.urls.documentation.title}</p>
              </div>
            </a>
          </li>
          <li className={styles.wrapper_content_buttonsBlock_button}>
            <a
              className={styles.wrapper_content_buttonsBlock_button_linkWrapper}
              href={Path.Dealer}
            >
              <img
                src={`https://shineray.by/media/${pageData.body.urls.find_a_dealer.image_header}`}
                alt="Найти дилера"
              />
              <div
                className={
                  styles.wrapper_content_buttonsBlock_button_textWrapper
                }
              >
                <p>{pageData.body.urls.find_a_dealer.title}</p>
              </div>
            </a>
          </li>
          <li className={styles.wrapper_content_buttonsBlock_button}>
            <a
              className={styles.wrapper_content_buttonsBlock_button_linkWrapper}
              href={Path.Warranty}
            >
              <img
                src={`https://shineray.by/media/${pageData.body.urls.maintenance.image_header}`}
                alt="Гарантия"
              />
              <div
                className={
                  styles.wrapper_content_buttonsBlock_button_textWrapper
                }
              >
                <p>{pageData.body.urls.maintenance.title}</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
