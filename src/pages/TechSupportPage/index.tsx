import { Link, Typography } from "@mui/material";
import { useLazyFetchTechSupportDataQuery } from "api/ownersService";
import { HeaderSlider } from "components/HeaderCarousel";
import { Preloader } from "components/Preloader";
import { BreadcrumbsComponent } from "components/breadcrumbs";
import { Path } from "enum/PathE";
import { FC, useEffect } from "react";
import styles from "../WarrantyPage/warrantyPage.module.scss";
import parse from "html-react-parser";

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

  if (!pageData || isFetching || isLoading) {
    return <Preloader />;
  }
  
  return (
    <div className={styles.wrapper}>
      <HeaderSlider image={pageData.body.page_header.image} />
      <BreadcrumbsComponent data={breadcrumbs} />
      <div className={styles.wrapper_content}>
        <div className={styles.wrapper_content_title}>
          <h1>{pageData.body.content.title}</h1>
        </div>
        <div>{parse(pageData.body.content.content)}</div>
      </div>
    </div>
  );
};
