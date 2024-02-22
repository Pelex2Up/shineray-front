import { FC, useEffect, useState } from "react";
import styles from "./NewsItem.module.scss";
import { INews } from "api/apiTypes";
import { CalendarMonth } from "@mui/icons-material";

type NewsItemT = {
  data: INews;
} & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const NewsItem: FC<NewsItemT> = ({ data, ...restProps }) => {
  const { image, title, description, created_date } = data;
  const [date, setDate] = useState<string>("");

  const reverseDate = (date: string) => {
    const dateArr = date.split('-')
    return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`
  };

  useEffect(() => {
    const formatedDate = created_date.split("T");
    setDate(`${reverseDate(formatedDate[0])} ${formatedDate[1].split(".")[0]}`);
  }, [data]);

  return (
    <a {...restProps} className={styles.container}>
      <img src={`http://93.177.124.158/media/${image}`} alt={`${title}`} />
      <div className={styles.container_description}>
        <h1 className={styles.container_description_title}>{title}</h1>
        <p className={styles.container_description_text}>
          {description.slice(0, 100)}
          {description.length > 100 ? "..." : ""}
        </p>
        <p className={styles.container_description_date}>
          <CalendarMonth />
          {date}
        </p>
      </div>
    </a>
  );
};
