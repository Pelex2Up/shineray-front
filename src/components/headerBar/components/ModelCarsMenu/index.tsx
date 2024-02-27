import { FC, useState } from "react";
import styles from "./ModelCarsMenu.module.scss";
import { HeaderT } from "types/componentTypes";
import { generatePath } from "react-router-dom";
import { Path } from "enum/PathE";
import { motion } from "framer-motion";

export const ModelCarsMenu: FC<HeaderT> = ({ data }) => {
  const [currentType, setCurrentType] = useState<number>(0);

  return (
    <motion.div
      className={styles.menuWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.typeTabs}>
        {data.menu.automobile.map((obj, index) => (
          <span
            key={obj.id}
            onClick={() => setCurrentType(index)}
            className={`${styles.typeTabs_tab} ${currentType === index ? styles.active : ""}`}
          >
            {obj.name}
          </span>
        ))}
      </div>
      <div className={styles.modelCars}>
        {data.menu.automobile[currentType].car_models.map((car, index) => (
          <a
            style={{ textDecoration: "none" }}
            key={index + car.id}
            href={generatePath(Path.ModelAuto, {
              carModel: `${car.id}-shineray-automobile-${car.name}`,
            })}
          >
            <div className={styles.modelCars_car}>
              <img
                className={styles.modelCars_car_carImg}
                loading="lazy"
                src={`https://shineray.by/media/${car.image}`}
              />
              <span className={styles.modelCars_car_carName}>{car.name}</span>
            </div>
          </a>
        ))}
      </div>
    </motion.div>
  );
};
