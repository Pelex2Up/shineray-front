import { FC } from "react";
import { ICar } from "types/componentTypes";
import {
  Card,
  CardContent,
  CardMedia,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import styles from "./CarElement.module.scss";
import { useMediaQuery } from "react-responsive";

type ICarElement = {
  car: ICar;
  selected: boolean;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "all ease-in 0.3s",
          cursor: "pointer",
          boxShadow: "none",
          border: "1px solid #e0e0e0",
          borderRadius: "10px",
        },
      },
    },
  },
});

export const CarElement: FC<ICarElement> = ({ car, selected, ...props }) => {
  const isDesktopOrMobile = useMediaQuery({ minDeviceWidth: 1224 });
  return (
    <div
      {...props}
      style={
        isDesktopOrMobile
          ? { width: "min-content", minWidth: "24%" }
          : { width: "47%" }
      }
    >
      <ThemeProvider theme={theme}>
        <Card
          sx={isDesktopOrMobile ? { maxWidth: 345 } : { width: "100%" }}
          className={`${styles.carCard} ${selected ? styles.selected : ""}`}
        >
          <CardMedia
            sx={
              isDesktopOrMobile
                ? { height: 180, backgroundSize: "cover" }
                : { height: 100, backgroundSize: "contain" }
            }
            image={`https://dev.shineray.by/media/${car.image_xl}`}
            title={car.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant={isDesktopOrMobile ? "h5" : "inherit"}
              component="div"
              sx={{ textAlign: "center", height: "4rem" }}
            >
              {car.title}
            </Typography>
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
};
