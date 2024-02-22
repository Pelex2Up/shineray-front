import { FC, useEffect } from "react";
import styles from "./NewsPage.module.scss";
import { useLazyFetchNewsPageDataQuery } from "api/newsPageService";
import { HeaderSlider } from "components/HeaderCarousel";
import { Preloader } from "components/Preloader";
import { NewsPreview } from "components/NewsPreview";
import { Pagination } from "@mui/material";
import { HotNews } from "components/HotNews";

export const NewsPage: FC = () => {
  const [fetchData, { data: pageData, isFetching, isSuccess }] =
    useLazyFetchNewsPageDataQuery();

  function scrollToElement(elementId: string) {
    var element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!pageData || isFetching) {
    return <Preloader />;
  }

  return (
    <div className={styles.wrapper}>
      <HeaderSlider image={pageData.body.page_header.image} />
      <div className={styles.wrapper_content}>
        <div className={styles.wrapper_content_title}>
          <h1 id={"header-title"}>{pageData.body.page_header.title}</h1>
        </div>
        <div className={styles.wrapper_content_body}>
          <div className={styles.wrapper_content_body_news}>
            {pageData.body.news.map((news, index) => (
              <NewsPreview key={`${index}_news`} data={news} />
            ))}
          </div>
          <div className={styles.wrapper_content_body_navigations}>
            <div className={styles.wrapper_content_body_navigations_title}>
              <h2>
                <span>Главные новости</span>
              </h2>
            </div>
            <div className={styles.wrapper_content_body_navigations_hotNews}>
              {pageData.body.news.map((news, index) => (
                <HotNews key={`${news.id}_${index}_hotNews`} data={news} />
              ))}
            </div>
          </div>
        </div>
        <Pagination
          onChange={() => scrollToElement("header-title")}
          sx={{ marginTop: "30px" }}
          count={3}
          shape="rounded"
        />
      </div>
    </div>
  );
};
