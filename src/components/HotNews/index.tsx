import { FC } from "react";
import styles from "./HotNews.module.scss";
import { INews } from "api/apiTypes";
import { generatePath } from "react-router-dom";
import { Path } from "enum/PathE";

type HotNewsT = {
  data: INews;
};

export const HotNews: FC<HotNewsT> = ({ data }) => {
  return (
    <li className={styles.hotWrapper}>
      <a
        className={styles.hotWrapper_link}
        href={generatePath(Path.NewsDetails, { newsId: String(data.id) })}
      >
        <img
          src={`https://dev.shineray.by/media/${data.image}`}
          alt={`${data.id}_hotNewsImage`}
        />
        <div className={styles.hotWrapper_text}>
          <p>{data.title}</p>
        </div>
      </a>
    </li>
  );
};
