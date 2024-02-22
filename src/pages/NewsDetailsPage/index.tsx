import { FC, useEffect } from "react";
import styles from "./NewsDetailsPage.module.scss";
import { useLazyFetchNewsDetailsDataQuery } from "api/newsPageService";
import { useParams } from "react-router-dom";
import { Preloader } from "components/Preloader";
import { HeaderSlider } from "components/HeaderCarousel";
import parse from "html-react-parser";

export const NewsDetailsPage: FC = () => {
  const params = useParams();

  const [fetchNews, { data: pageData, isFetching, isSuccess }] =
    useLazyFetchNewsDetailsDataQuery();

  useEffect(() => {
    if (params) {
      fetchNews(Number(params.newsId));
    }
  }, [params]);

  console.log(pageData);

  if (!pageData || isFetching) {
    return <Preloader />;
  }

  return (
    <div className={styles.wrapper}>
      <HeaderSlider image={pageData.image} />
      <div className={styles.wrapper_content}>
        <div className={styles.wrapper_content_title}>
          <h1>{pageData.title}</h1>
        </div>
        <div className={styles.wrapper_content_body}>
          {parse(pageData.content)}
        </div>
      </div>
    </div>
  );
};
