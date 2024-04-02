import { FC, useEffect, useMemo } from "react";
import styles from "./legalInformation.module.scss";
import { useLazyFetchLegalInfoPageDataQuery } from "api/mirShinerayService";
import { Preloader } from "components/Preloader";
import { HeaderSlider } from "components/HeaderCarousel";
import { Outlet, generatePath, useParams } from "react-router-dom";
import { Path } from "enum/PathE";
import { BreadcrumbsComponent } from "components/breadcrumbs";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Link,
  Typography,
} from "@mui/material";
import { transliterate } from "transliteration";
import { useMediaQuery } from "react-responsive";
import { ExpandMore } from "@mui/icons-material";
import { Helmet } from "react-helmet-async";

export const LegalInformationPage: FC = () => {
  const isDesktopOrMobile = useMediaQuery({ minDeviceWidth: 1224 });
  const params = useParams();
  const [fetchPage, { data: pageData, isFetching }] =
    useLazyFetchLegalInfoPageDataQuery();

  const breadcrumbs = useMemo(
    () => [
      <Link underline="hover" key="1" color="inherit" href={Path.Home}>
        Главная
      </Link>,
      <Link underline="hover" key="2" color="inherit" href={Path.MirShineray}>
        Мир Shineray
      </Link>,
      <Link
        underline="hover"
        key="3"
        color="inherit"
        href={Path.LegalInformation}
      >
        Юридическая информация
      </Link>,
    ],
    [],
  );

  useEffect(() => {
    if (params && params.infoId && pageData) {
      breadcrumbs.push(
        <Typography key={breadcrumbs.length + 1} color="text.primary">
          {pageData.body.content.map((obj) => {
            if (obj.id === Number(params.infoId)) {
              return obj.title;
            } else return <></>;
          })}
        </Typography>,
      );
    }
  }, [params, params.infoId, breadcrumbs, pageData]);

  useEffect(() => {
    if (!pageData && !isFetching) {
      fetchPage();
    }
  }, [fetchPage, pageData, isFetching]);

  if (!pageData || isFetching) {
    return <Preloader />;
  }

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>
          {params.infoId
            ? pageData.body.content.map((obj) => {
                if (obj.id === Number(params.infoId)) {
                  return obj.title;
                }
              })
            : pageData.body.page_header.title}
        </title>
      </Helmet>
      <HeaderSlider image={pageData.body.page_header.image} />
      <BreadcrumbsComponent data={breadcrumbs} />
      <div className={styles.wrapper_pageContent}>
        <div className={styles.wrapper_pageContent_container}>
          {isDesktopOrMobile ? (
            <div className={styles.wrapper_pageContent_container_navMenu}>
              <div
                className={styles.wrapper_pageContent_container_navMenu_body}
              >
                <div
                  className={
                    styles.wrapper_pageContent_container_navMenu_body_content
                  }
                >
                  <h2>Содержание</h2>
                  {pageData.body.content.map((el, index) => (
                    <a
                      style={
                        Number(params?.infoId) === el.id
                          ? {
                              borderBottom: "2px solid #cf2626",
                              fontWeight: "600",
                            }
                          : {}
                      }
                      href={generatePath(
                        Path.LegalInformation + Path.InfoElement,
                        {
                          infoId: el.id,
                          infoLabel: transliterate(el.title)
                            .split(" ")
                            .join("-")
                            .toLowerCase(),
                        },
                      )}
                    >
                      {el.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Accordion
              sx={{
                width: "100%",
                backgroundColor: "rgba(169, 169, 169, 0.2)",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMore sx={{ color: "black", fontWeight: "600" }} />
                }
                aria-controls="panel1-content"
                id="panel1-header"
                key={"models"}
              >
                <strong>Содержание</strong>
              </AccordionSummary>
              <AccordionDetails
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                {pageData.body.content.map((el, index) => (
                  <a
                    key={el.title + "_" + index}
                    href={generatePath(
                      Path.LegalInformation + Path.InfoElement,
                      {
                        infoId: el.id,
                        infoLabel: transliterate(el.title)
                          .split(" ")
                          .join("-")
                          .toLowerCase(),
                      },
                    )}
                    rel="nofollow"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      lineHeight: "3rem",
                    }}
                  >
                    {el.title}
                    <span />
                  </a>
                ))}
              </AccordionDetails>
            </Accordion>
          )}
          <div className={styles.wrapper_pageContent_container_legalContent}>
            <div className={styles.wrapper_pageContent_title}>
              <h1>
                {params.infoId
                  ? pageData.body.content.map((obj) => {
                      if (obj.id === Number(params.infoId)) {
                        return obj.title;
                      }
                    })
                  : pageData.body.page_header.title}
              </h1>
            </div>
            {params.infoId ? (
              <Outlet />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <p>
                  В данном разделе Вы можете ознакомиться с основной правовой и
                  юридической информацией, а также правилами посещения и
                  использования информации, размещенной на интернет-сайте нашей
                  организации.
                </p>
                <p style={{ fontWeight: "bold" }}>ООО "Лакшери Моторс групп"</p>
                <p>
                  Официальный представитель и эксклюзивный дистрибьютор Shineray
                  в Республике Беларусь.
                </p>{" "}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <p>УНП 193695595</p>
                  <p>
                    Зарегистрировано в Минском городском исполнительном
                    комитете.
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <p>
                    Юридический адрес: 220004, г. Минск, ул. Немига, д. 40, пом.
                    33, каб. 27
                  </p>{" "}
                  <p>
                    Почтовый адрес: 220004, г. Минск, ул. Немига, д. 40, оф. 405
                  </p>{" "}
                  <p>
                    E-mail:{" "}
                    <a
                      href="https://info@shineray.by"
                      target="_blank"
                      type="email"
                      rel="noreferrer"
                    >
                      info@shineray.by
                    </a>
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <p>Режим работы: </p>
                  <p>Пн-Пт: 9:00 - 17:30</p>
                  <p>Сб-Вс: выходной</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
