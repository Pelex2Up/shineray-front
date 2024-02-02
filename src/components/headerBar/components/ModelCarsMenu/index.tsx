import { FC, useState } from "react";
import styles from "./ModelCarsMenu.module.scss";
import { HeaderT } from "types/componentTypes";
import { generatePath, useNavigate } from "react-router-dom";
import { Path } from "enum/PathE";

export const ModelCarsMenu: FC<HeaderT> = ({ data }) => {
  const [currentType, setCurrentType] = useState<number>(0);
  const navigate = useNavigate();

  return (
    <div className={styles.menuWrapper}>
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
          <div
            className={styles.modelCars_car}
            key={index + car.id}
            onClick={() =>
              navigate(
                generatePath(Path.ModelAuto, {
                  carModel: `${car.id}-shineray-automobile-${car.name}`,
                }),
              )
            }
          >
            <img
              className={styles.modelCars_car_carImg}
              src={`http://93.177.124.158/media/${car.image}`}
            />
            <span className={styles.modelCars_car_carName}>{car.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
