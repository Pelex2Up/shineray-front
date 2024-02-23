import { FC, useEffect, useState } from "react";
import styles from "./NewsPreview.module.scss";
import { INews } from "api/apiTypes";
import { Path } from "enum/PathE";
import { generatePath } from "react-router-dom";
import { CalendarMonth } from "@mui/icons-material";
import { LinkButton } from "components/common/Buttons";

type NewsPreviewT = {
  data: INews;
};

export const NewsPreview: FC<NewsPreviewT> = ({ data }) => {
  const [date, setDate] = useState<string>("");

  const reverseDate = (date: string) => {
    const dateArr = date.split("-");
    return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
  };

  useEffect(() => {
    const formatedDate = data.created_date.split("T");
    setDate(`${reverseDate(formatedDate[0])} ${formatedDate[1].split(".")[0]}`);
  }, [data]);

  return (
    <div className={styles.cardWrapper}>
      <a
        href={generatePath(Path.NewsDetails, { newsId: String(data.id) })}
        className={styles.cardWrapper_cardImage}
      >
        <img
          src={`http://93.177.124.158/media/${data.image}`}
          alt={data.title}
        />
      </a>
      <div className={styles.cardWrapper_newsContent}>
        <div className={styles.cardWrapper_newsContent_upper}>
          <a
            href={generatePath(Path.NewsDetails, { newsId: String(data.id) })}
            className={styles.cardWrapper_newsContent_upper_title}
          >
            {data.title}
          </a>
          <p className={styles.cardWrapper_newsContent_upper_description}>
            {data.description}
          </p>
          <div style={{ marginTop: "1rem" }}>
            <div className={styles.cardWrapper_newsContent_upper_date}>
              <CalendarMonth />
              {date}
            </div>
          </div>
        </div>
        <div className={styles.cardWrapper_newsContent_lower}>
          <LinkButton href={generatePath(Path.NewsDetails, {newsId: String(data.id)})} text={"Читать далее"} />
        </div>
      </div>
    </div>
  );
};