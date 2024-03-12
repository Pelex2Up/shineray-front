import { FC } from "react";
import styles from "./CarItemCard.module.scss";
import { Card, CardContent, Typography } from "@mui/material";
import { generatePath, useNavigate } from "react-router-dom";
import { Path } from "enum/PathE";
import { ICar } from "types/componentTypes";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { LinkButton } from "components/common/Buttons";

type CardItemT = {
  car: ICar;
};

export const CarItemCard: FC<CardItemT> = ({ car }) => {
  const isDesktopOrMobile = useMediaQuery({ minDeviceWidth: 1224 });

  return (
    <motion.a
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={
        isDesktopOrMobile
          ? { textDecoration: "none" }
          : { width: "100%", textDecoration: "none" }
      }
      href={generatePath(Path.ModelAuto, {
        carModel: `${car.id}-shineray-automobile-${car.name}`,
        category: `${car.category}-car-preview`,
      })}
    >
      <Card
        sx={{
          width: `${isDesktopOrMobile ? "260px" : "100%"}`,
          minWidth: `${isDesktopOrMobile ? "" : "100%"}`,
          height: `${isDesktopOrMobile ? "300px" : "330px"}`,
          borderRadius: "1rem",
        }}
        className={styles.autoCard}
      >
        <img
          src={`https://dev.shineray.by/media/${car.image_xl}`}
          style={
            isDesktopOrMobile
              ? { objectFit: "contain", height: "55%" }
              : { objectFit: "cover", height: "60%" }
          }
          alt={car.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center", fontSize: "20px" }}
          >
            {`Shineray ${car.name}`}
          </Typography>
          <div className={styles.autoCard_buttonsBlock}>
            <LinkButton
              text={"Подробнее"}
              className={styles.autoCard_buttonsBlock_detailsButton}
              // href={generatePath(Path.ModelAuto, {
              //   category: `${car.category}-car-preview`,
              //   carModel: `${car.id}-shineray-automobile-${car.name}`,
              // })}
            />
          </div>
        </CardContent>
      </Card>
    </motion.a>
  );
};
