import { FC, useEffect, useState } from "react";
import styles from "./NewsDetailsPage.module.scss";
import { useLazyFetchNewsDetailsDataQuery } from "api/newsPageService";
import { useParams } from "react-router-dom";
import { Preloader } from "components/Preloader";
import { HeaderSlider } from "components/HeaderCarousel";
import parse from "html-react-parser";
import { CalendarMonth, Visibility } from "@mui/icons-material";
import { Badge, Link, Typography } from "@mui/material";
import { Path } from "enum/PathE";
import { BreadcrumbsComponent } from "components/breadcrumbs";
import { Helmet } from "react-helmet-async";

export const NewsDetailsPage: FC = () => {
  const params = useParams();
  const [date, setDate] = useState<string>("");
  const [fetchNews, { data: pageData, isFetching }] =
    useLazyFetchNewsDetailsDataQuery();

  const reverseDate = (date: string) => {
    const dateArr = date.split("-");
    return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
  };

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href={Path.Home}>
      Главная
    </Link>,
    <Link underline="hover" key="2" color="inherit" href={Path.News}>
      Новости
    </Link>,
    <Typography key="3" color="text.primary">
      {pageData?.title}
    </Typography>,
  ];

  useEffect(() => {
    if (pageData) {
      const formatedDate = pageData.publication_date.split("T");
      setDate(`${reverseDate(formatedDate[0])}`);
    }
  }, [pageData]);

  useEffect(() => {
    if (params) {
      fetchNews(Number(params.newsId?.split('-')[0]));
    }
  }, [params, fetchNews]);

  if (!pageData || isFetching) {
    return <Preloader />;
  }

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>{pageData.title}</title>
        <meta
          name="description"
          property="og:description"
          content={`${pageData.description.replace(/(<([^>]+)>)/gi, '')}`}
        />
        <meta
          name="keywords"
          property="og:keywords"
          content={`Shineray, SRM, SWM, марка, брэнд, Республика Беларусь, Беларусь, автомобили, модели, новости, информация, коммерческий, транспорт, новинки, статьи`}
        />
      </Helmet>
      <HeaderSlider image={pageData.image} />
      <BreadcrumbsComponent data={breadcrumbs} />
      <div className={styles.wrapper_content}>
        <div className={styles.wrapper_content_title}>
          <h1>{pageData.title}</h1>
          <div
            style={{
              padding: "1rem",
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.3rem",
              color: "rgb(107, 107, 107)",
            }}
          >
            <CalendarMonth />
            {date}
            <Badge
              sx={{ marginLeft: "1rem" }}
              color="error"
              badgeContent={pageData.views}
            >
              <Visibility />
            </Badge>
          </div>
        </div>
        <div className={styles.wrapper_content_body}>
          {parse(pageData.content)}
        </div>
      </div>
    </div>
  );
};
