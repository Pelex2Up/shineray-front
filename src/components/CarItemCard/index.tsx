import { FC } from "react";
import styles from "./CarItemCard.module.scss";
import { Card, CardContent, Typography } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { generatePath } from "react-router-dom";
import { Path } from "enum/PathE";
import { ICar } from "types/componentTypes";
import { motion } from "framer-motion";

type CardItemT = {
  car: ICar;
};

export const CarItemCard: FC<CardItemT> = ({ car }) => {
  const isDesktopOrMobile = useMediaQuery({ minDeviceWidth: 1224 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          width: `${isDesktopOrMobile ? "260px" : "100%"}`,
          minWidth: `${isDesktopOrMobile ? "" : "100%"}`,
          borderRadius: "1rem",
        }}
        className={styles.autoCard}
      >
        <img src={`http://93.177.124.158/media/${car.image_xl}`} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {`Shineray ${car.name}`}
          </Typography>
          <div className={styles.autoCard_buttonsBlock}>
            <a
              className={styles.autoCard_buttonsBlock_detailsButton}
              href={generatePath(Path.ModelAuto, {
                carModel: `${car.name}?=${car.id}`,
              })}
            >
              Подробнее
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
