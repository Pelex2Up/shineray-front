import { FC, memo } from "react";
import styles from "./MirShineray.module.scss";
import { HeaderSlider } from "components/HeaderCarousel";
import { Path } from "enum/PathE";
import { useFetchMirShinerayPageDataQuery } from "api/mirShinerayService";
import { Preloader } from "components/Preloader";

export const MirShinerayPage: FC = memo(() => {
  const { data: MirShineray, isFetching } = useFetchMirShinerayPageDataQuery();

  if (!MirShineray || isFetching) {
    return <Preloader />;
  }
  console.log(MirShineray);
  return (
    <div className={styles.pageWrapper}>
      <HeaderSlider image={MirShineray.body.page_header.image} />
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
                href={Path.AboutCompany}
              >
                <img
                  src={`http://93.177.124.158/media/${MirShineray.body.content.about_company.image_header}`}
                  alt="Shineray about"
                />
                <div
                  className={
                    styles.pageWrapper_index_content_buttonsBlock_button_textWrapper
                  }
                >
                  <p>{MirShineray.body.content.about_company.title}</p>
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
                href={Path.AboutBelarus}
              >
                <img
                  src={`http://93.177.124.158/media/${MirShineray.body.content.about_us.image_header}`}
                  alt="Shineray belarus"
                />
                <div
                  className={
                    styles.pageWrapper_index_content_buttonsBlock_button_textWrapper
                  }
                >
                  <p>{MirShineray.body.content.about_us.title}</p>
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
                href={Path.LegalInformation}
              >
                <img
                  src={`http://93.177.124.158/media/${MirShineray.body.content.legal_information.image_header}`}
                  alt="Shineray legal information"
                />
                <div
                  className={
                    styles.pageWrapper_index_content_buttonsBlock_button_textWrapper
                  }
                >
                  <p>{MirShineray.body.content.legal_information.title}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});
