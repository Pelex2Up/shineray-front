import { FC, useCallback, useEffect, useState } from "react";
import styles from "./CarModelsPage.module.scss";
import { HeaderSlider } from "components/HeaderCarousel";
import { CarItemCard } from "components/CarItemCard";
import { useLazyUseFetchModelsPageDataQuery } from "api/carModelsPageService";
import { motion } from "framer-motion";
import { Preloader } from "components/Preloader";
import parse from "html-react-parser";
import { Path } from "enum/PathE";
import { Link, Typography } from "@mui/material";
import { BreadcrumbsComponent } from "components/breadcrumbs";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { transliterate } from "transliteration";
import { Helmet } from "react-helmet-async";

export const CarModelsPage: FC = () => {
  const [fetchData, { data: carModels, isFetching: isLoadingPage, error }] =
    useLazyUseFetchModelsPageDataQuery();
  const params = useParams();
  const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState<number>(0);

  const handleRefresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (params && params.category) {
      setCurrentCategory(Number(params.category.split("-")[0]));
    }
  }, [params]);

  useEffect(() => {
    if (!carModels && !isLoadingPage) {
      handleRefresh();
    }
  }, []);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href={Path.Home}>
      Главная
    </Link>,
    <Link underline="hover" key="2" color="inherit" href={Path.Cars}>
      Модельный ряд
    </Link>,
  ];

  useEffect(() => {
    if (breadcrumbs.length === 2 && currentCategory !== 0) {
      breadcrumbs.push(
        <Typography key="3" color="text.primary">
          {carModels?.body.categories[currentCategory - 1].name}
        </Typography>,
      );
    } else if (breadcrumbs.length === 3 && currentCategory !== 0) {
      breadcrumbs[2] = (
        <Typography key="3" color="text.primary">
          {carModels?.body.categories[currentCategory - 1].name}
        </Typography>
      );
    } else {
      breadcrumbs.pop();
    }
  }, [currentCategory, carModels?.body.categories]);

  if (!carModels) {
    return <Preloader />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.carsPageWrapper}
    >
      <Helmet>
        <title>
          {currentCategory === 0
            ? `Модельный ряд Shineray в Республике Беларусь`
            : `${carModels.body.categories[currentCategory !== 0 ? currentCategory - 1 : currentCategory].name} бренда Shineray`}
        </title>
        <meta
          name="description"
          property="og:description"
          content={
            "Модельный ряд бренда Shineray представлен коммерческой линейкой автомобилей: минивэны, микроавтобусы, электромобили, мини-грузовики. Узнайте о коммерческом транспорте Shineray больше!"
          }
        />
        <meta
          name="keywords"
          property="og:keywords"
          content="Shineray, SRM, коммерческий, автомобиль, транспорт, модель, пассажирский, грузовой, фургон, карго, логистика, перевозки, минивэн, микроавтобус, электромобиль, электрический, Республика Беларусь, Беларусь, купить, продажа"
        />
      </Helmet>
      {carModels && (
        <HeaderSlider
          image={
            currentCategory !== 0
              ? carModels.body.categories[currentCategory - 1].image
              : carModels.body.page_header.image
          }
        />
      )}
      <BreadcrumbsComponent data={breadcrumbs} />
      <div className={styles.carsPageWrapper_content}>
        <div className={styles.carsPageWrapper_content_title}>
          <h1>
            {currentCategory === 0
              ? `Модельный ряд Shineray в Республике Беларусь`
              : `${carModels.body.categories[currentCategory - 1].name}`}
          </h1>
          <span>{parse(carModels.body.car_models_page.content)}</span>
        </div>
        <div className={styles.carsPageWrapper_content_container}>
          <div className={styles.carsPageWrapper_content_container_leftNavMenu}>
            <h3
              className={
                styles.carsPageWrapper_content_container_leftNavMenu_title
              }
            >
              Модельный ряд
            </h3>
            <ul>
              <li
                className={`${styles.carsPageWrapper_content_container_leftNavMenu_category} ${currentCategory === 0 ? styles.active : ""}`}
                key={"all-categories"}
                onClick={() => {
                  setCurrentCategory(0);
                  navigate(Path.Cars);
                }}
              >
                {"Все автомобили"}
              </li>
              {carModels.body.categories.map((item, index) => (
                <li
                  className={`${styles.carsPageWrapper_content_container_leftNavMenu_category} ${currentCategory === index + 1 ? styles.active : ""}`}
                  key={index + item.id}
                  onClick={() => {
                    navigate(
                      generatePath(Path.CarsCategory, {
                        category: `${index + 1}-${transliterate(item.name).toLowerCase()}`,
                      }),
                    );
                    setCurrentCategory(index + 1);
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          {carModels ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={
                styles.carsPageWrapper_content_container_rightModelsBlock
              }
            >
              {currentCategory !== 0
                ? carModels.body.categories[currentCategory - 1].car_models.map(
                    (car, index) => (
                      <CarItemCard key={index + car.name} car={car} />
                    ),
                  )
                : carModels.body.categories.map((category, indexCat) =>
                    category.car_models.map((car, index) => (
                      <CarItemCard
                        key={index + car.name + "_" + indexCat}
                        car={car}
                      />
                    )),
                  )}
            </motion.div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </motion.div>
  );
};
