import { FC, useState } from "react";
import styles from "./CarModelsPage.module.scss";
import { HeaderSlider } from "components/HeaderCarousel";
import { CarItemCard } from "components/CarItemCard";
import { useFetchCategoryDataQuery } from "api/carModelsPageService";
import { motion } from "framer-motion";

const ModelHeader = [
  { image: "https://www.shineray.com/upload/sort/1679365664565824.jpg" },
];
const cars = [
  {
    id: 1,
    name: "G01",
    image:
      "https://www.shineray.com/upload/images/310_200/1678964537963553.jpg",
  },
  {
    id: 2,
    name: "G01F",
    image:
      "https://www.shineray.com/upload/images/310_200/1677226251780981.jpg",
  },
  {
    id: 3,
    name: "G03",
    image:
      "https://www.shineray.com/upload/images/310_200/1668999505403821.jpg",
  },
  {
    id: 4,
    name: "G03F",
    image:
      "https://www.shineray.com/upload/images/310_200/1678366216128336.jpg",
  },
];

export const CarModelsPage: FC = () => {
  const { data: CarModels } = useFetchCategoryDataQuery();
  const [currentCategory, setCurrentCategory] = useState<number>(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.carsPageWrapper}
    >
      {CarModels && <HeaderSlider image={CarModels[currentCategory].image} />}
      <div className={styles.carsPageWrapper_container}>
        <div className={styles.carsPageWrapper_container_leftNavMenu}>
          <h3 className={styles.carsPageWrapper_container_leftNavMenu_title}>
            Модельный ряд
          </h3>
          <ul>
            {CarModels?.map((item, index) => (
              <li
                className={`${styles.carsPageWrapper_container_leftNavMenu_category} ${currentCategory === index ? styles.active : ""}`}
                key={index + item.id}
                onClick={() => setCurrentCategory(index)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        {CarModels ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.carsPageWrapper_container_rightModelsBlock}
          >
            {CarModels[currentCategory].car_models.map((car, index) => (
              <CarItemCard key={index + car.name} car={car} />
            ))}
          </motion.div>
        ) : (
          <></>
        )}
      </div>
    </motion.div>
  );
};
