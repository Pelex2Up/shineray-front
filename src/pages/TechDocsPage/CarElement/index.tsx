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
  return (
    <div {...props} style={{ width: "max-content" }}>
      <ThemeProvider theme={theme}>
        <Card
          sx={{ maxWidth: 345 }}
          className={`${styles.carCard} ${selected ? styles.selected : ""}`}
        >
          <CardMedia
            sx={{ height: 180, backgroundSize: "cover" }}
            image={`https://dev.shineray.by/media/${car.image_xl}`}
            title={car.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "center" }}
            >
              {car.title}
            </Typography>
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
};
