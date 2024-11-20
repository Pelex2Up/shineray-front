import { FC } from "react";
import { MiniBlockPropsT } from "types/componentTypes";
import styles from "./miniBlock.module.scss";

export const MiniBlock: FC<MiniBlockPropsT> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className={styles.wrapper}>
      <img
        src={icon}
        className={styles.wrapper_iconWrapper}
        alt={title + "_icon"}
      />
      <div className={styles.wrapper_textWrapper}>
        <div className={styles.wrapper_textWrapper_title}>{title}</div>
        <div className={styles.wrapper_textWrapper_description}>
          {description}
        </div>
      </div>
    </div>
  );
};
