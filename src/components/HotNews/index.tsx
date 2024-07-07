import { FC } from "react";
import styles from "./HotNews.module.scss";
import { INews } from "api/apiTypes";
import { generatePath } from "react-router-dom";
import { Path } from "enum/PathE";
import { transliterate } from "transliteration";

type HotNewsT = {
  data: INews;
};

export const HotNews: FC<HotNewsT> = ({ data }) => {
  return (
    <li className={styles.hotWrapper}>
      <a
        className={styles.hotWrapper_link}
        href={generatePath(Path.NewsDetails, { newsId: `${String(data.id)}-${transliterate(data.title.replace(/\s/g, "-")).toLowerCase()}` })}
      >
        <img
          src={`https://shineray.by/media/${data.image}`}
          alt={data.title}
        />
        <div className={styles.hotWrapper_text}>
          <p>{data.title}</p>
        </div>
      </a>
    </li>
  );
};
