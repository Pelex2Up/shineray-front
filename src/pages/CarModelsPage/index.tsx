import { FC, useEffect, useState } from "react";
import styles from "./CarModelsPage.module.scss";
import { HeaderSlider } from "components/HeaderCarousel";
import { CarItemCard } from "components/CarItemCard";
import { useLazyUseFetchModelsPageDataQuery } from "api/carModelsPageService";
import { motion } from "framer-motion";
import { Preloader } from "components/Preloader";
import parse from "html-react-parser";

export const CarModelsPage: FC = () => {
  const [fetchData, { data: carModels, isFetching: isLoadingPage }] =
    useLazyUseFetchModelsPageDataQuery();
  const [currentCategory, setCurrentCategory] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!carModels || isLoadingPage) {
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
      {carModels && (
        <HeaderSlider
          image={carModels.body.categories[currentCategory].image}
        />
      )}
      <div className={styles.carsPageWrapper_content}>
        <div className={styles.carsPageWrapper_content_title}>
          <h1>Модельный ряд Shineray в Республике Беларусь</h1>
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
              {carModels.body.categories.map((item, index) => (
                <li
                  className={`${styles.carsPageWrapper_content_container_leftNavMenu_category} ${currentCategory === index ? styles.active : ""}`}
                  key={index + item.id}
                  onClick={() => setCurrentCategory(index)}
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
              {carModels.body.categories[currentCategory].car_models.map(
                (car, index) => (
                  <CarItemCard key={index + car.name} car={car} />
                ),
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
