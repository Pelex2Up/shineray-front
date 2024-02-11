import { FC, useEffect } from "react";
import styles from "./BecomeDealerPage.module.scss";
import { HeaderSlider } from "components/HeaderCarousel";
import parse from "html-react-parser";
import { useLazyFetchBecomeDealerPageDataQuery } from "api/mirShinerayService";
import { Preloader } from "components/Preloader";
import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { LinkButton } from "components/common/Buttons";

export const BecomeDealerPage: FC = () => {
  const [fetchData, { data: pageData, isFetching }] =
    useLazyFetchBecomeDealerPageDataQuery();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(pageData);

  if (!pageData || isFetching) {
    return <Preloader />;
  }

  return (
    <div className={styles.pageWrapper}>
      <HeaderSlider image={pageData.body.page_header.image} />
      <div className={styles.pageWrapper_container}>
        <div className={styles.pageWrapper_container_content}>
          <div className={styles.pageWrapper_container_content_title}>
            <h1>{pageData.body.content.title}</h1>
          </div>
          <div className={styles.pageWrapper_container_content_dealersInfo}>
            {parse(pageData.body.content.content)}
          </div>
        </div>
        <div
          className={styles.pageWrapper_container_form}
          style={{
            background: `url(http://93.177.124.158/media/${pageData.body.content.form_image_background}) no-repeat`,
            backgroundSize: "cover",
          }}
        >
          <div className={styles.pageWrapper_container_form_content}>
            <div className={styles.pageWrapper_container_form_content_logo}>
              <img
                src="https://www.shineray.com/template/pc/default/images/businesslogo.png"
                alt="Logo"
              />
            </div>
            <div
              className={styles.pageWrapper_container_form_content_formWrapper}
            >
              <div
                className={
                  styles.pageWrapper_container_form_content_formWrapper_title
                }
              >
                <p>Стать дилером</p>
              </div>
              <div
                className={
                  styles.pageWrapper_container_form_content_formWrapper_body
                }
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  <div>
                    <FormControl fullWidth variant="standard">
                      <InputLabel
                        sx={{ color: "black !important" }}
                        htmlFor="phone-number"
                      >
                        Номер телефона
                      </InputLabel>
                      <Input
                        sx={{ borderBottomColor: "gray !important" }}
                        error
                        id="phone-number"
                        startAdornment={
                          <InputAdornment position="start">+375</InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth variant="standard">
                      <InputLabel
                        sx={{ color: "black !important" }}
                        htmlFor="user-fullname"
                      >
                        ФИО
                      </InputLabel>
                      <Input
                        sx={{ borderBottomColor: "gray !important" }}
                        error
                        id="user-fullname"
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth variant="standard">
                      <InputLabel
                        sx={{ color: "black !important" }}
                        htmlFor="company"
                      >
                        Организация которую вы представляете
                      </InputLabel>
                      <Input
                        sx={{ borderBottomColor: "gray !important" }}
                        error
                        id="company"
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth variant="standard">
                      <InputLabel
                        sx={{ color: "black !important" }}
                        htmlFor="email"
                      >
                        Email
                      </InputLabel>
                      <Input
                        sx={{ borderBottomColor: "gray !important" }}
                        error
                        id="email"
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth variant="standard">
                      <InputLabel
                        sx={{ color: "black !important" }}
                        htmlFor="text"
                      >
                        Текст сообщения
                      </InputLabel>
                      <Input
                        sx={{ borderBottomColor: "gray !important" }}
                        error
                        id="text"
                        multiline
                        rows={4}
                      />
                    </FormControl>
                  </div>
                  <LinkButton
                    style={{ marginTop: "2rem" }}
                    text="Отправить запрос"
                  />
                </Box>
              </div>
            </div>
          </div>
          <img
            className={styles.pageWrapper_container_form_carsBackground}
            src={`http://93.177.124.158/media/${pageData.body.content.form_image}`}
            alt="Form image"
          />
        </div>
      </div>
    </div>
  );
};
