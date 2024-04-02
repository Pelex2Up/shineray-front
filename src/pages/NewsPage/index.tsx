import { FC, useEffect, useState } from "react";
import styles from "./NewsPage.module.scss";
import { useLazyFetchNewsPageDataQuery } from "api/newsPageService";
import { HeaderSlider } from "components/HeaderCarousel";
import { Preloader } from "components/Preloader";
import { NewsPreview } from "components/NewsPreview";
import { Link, Pagination } from "@mui/material";
import { HotNews } from "components/HotNews";
import { Path } from "enum/PathE";
import { BreadcrumbsComponent } from "components/breadcrumbs";
import { Helmet } from "react-helmet-async";

export const NewsPage: FC = () => {
  const [fetchData, { data: pageData, isFetching }] =
    useLazyFetchNewsPageDataQuery();
  const [currentPage, setCurrentPage] = useState<number>(1);

  function scrollToElement(elementId: string) {
    var element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  const handlePaginate = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page) {
      fetchData(page)
        .unwrap()
        .then((data) => {
          setCurrentPage(page);
          scrollToElement("header-title");
        });
    }
  };

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href={Path.Home}>
      Главная
    </Link>,
    <Link underline="hover" key="2" color="inherit" href={Path.News}>
      Новости
    </Link>,
  ];

  useEffect(() => {
    if (currentPage) {
      fetchData(currentPage);
    }
  }, [fetchData, currentPage]);

  if (!pageData || isFetching) {
    return <Preloader />;
  }

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>{pageData.results.body.page_header.title}</title>
      </Helmet>
      <HeaderSlider image={pageData.results.body.page_header.image} />
      <BreadcrumbsComponent data={breadcrumbs} />
      <div className={styles.wrapper_content} id={"header-title"}>
        <div className={styles.wrapper_content_title}>
          <h1>{pageData.results.body.page_header.title}</h1>
        </div>
        <div className={styles.wrapper_content_body}>
          <div className={styles.wrapper_content_body_news}>
            {pageData.results.body.news.map((news, index) => (
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
              {pageData.results.body.top_3.map((news, index) => (
                <HotNews key={`${news.id}_${index}_hotNews`} data={news} />
              ))}
            </div>
          </div>
        </div>
        <Pagination
          onChange={handlePaginate}
          page={currentPage}
          sx={{ marginTop: "30px" }}
          count={Math.ceil(pageData.count / 6)}
          shape="rounded"
        />
      </div>
    </div>
  );
};
