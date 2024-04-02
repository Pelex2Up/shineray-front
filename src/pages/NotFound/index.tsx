import { FC } from "react";
import styles from "./NotFound.module.scss";
import { LinkButton } from "components/common/Buttons";
import { ArrowBack } from "@mui/icons-material";
import logo from "../../assets/logo/shineray-logo.png";
import { Path } from "enum/PathE";
import { Helmet } from "react-helmet-async";

export const NotFound404: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>404. Страница не найдена</title>
      </Helmet>
      <div className={styles.wrapper_content}>
        <img src={logo} alt="logo" />
        <h1>404. Страница не найдена</h1>
        <p>К сожалению, запрашиваемая страница не найдена </p>
        <LinkButton href={Path.Home} text={"Вернуться на главную"}>
          <ArrowBack />
        </LinkButton>
      H</div>
    </div>
  );
};
