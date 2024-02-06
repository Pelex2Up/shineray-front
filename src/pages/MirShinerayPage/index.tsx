import { FC, memo } from "react";
import styles from "./MirShineray.module.scss";
import { HeaderSlider } from "components/HeaderCarousel";

export const MirShinerayPage: FC = memo(() => {
  return (
    <div className={styles.pageWrapper}>
      <HeaderSlider image="uploads/headers/about_header.jpg" />
      <div className={styles.pageWrapper_index}>
        <div className={styles.pageWrapper_index_content}>
          <ul className={styles.pageWrapper_index_content_buttonsBlock}>
            <li
              className={styles.pageWrapper_index_content_buttonsBlock_button}
            >
              <a
                className={
                  styles.pageWrapper_index_content_buttonsBlock_button_linkWrapper
                }
                href="#"
              >
                <img
                  src="https://www.shineray.com/upload/sort/1648688801826070.jpg"
                  alt="Shineray about"
                />
                <div
                  className={
                    styles.pageWrapper_index_content_buttonsBlock_button_textWrapper
                  }
                >
                  <p>О компании</p>
                </div>
              </a>
            </li>
            <li
              className={styles.pageWrapper_index_content_buttonsBlock_button}
            >
              <a
                className={
                  styles.pageWrapper_index_content_buttonsBlock_button_linkWrapper
                }
                href="#"
              >
                <img
                  src="https://www.shineray.com/upload/sort/1679415923164074.jpg"
                  alt="Shineray history"
                />
                <div
                  className={
                    styles.pageWrapper_index_content_buttonsBlock_button_textWrapper
                  }
                >
                  <p>История компании</p>
                </div>
              </a>
            </li>
            <li
              className={styles.pageWrapper_index_content_buttonsBlock_button}
            >
              <a
                className={
                  styles.pageWrapper_index_content_buttonsBlock_button_linkWrapper
                }
                href="#"
              >
                <img
                  src="https://www.shineray.com/upload/sort/1679449587137329.jpg"
                  alt="Shineray legal information"
                />
                <div
                  className={
                    styles.pageWrapper_index_content_buttonsBlock_button_textWrapper
                  }
                >
                  <p>Юридическая информация</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});
