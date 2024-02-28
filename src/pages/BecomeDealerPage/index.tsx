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
  Link,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { LinkButton } from "components/common/Buttons";
import { Path } from "enum/PathE";
import { BreadcrumbsComponent } from "components/breadcrumbs";

const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "rgba(0, 0, 0, 0.4)",
          "&.Mui-focused": {
            color: "rgba(0, 0, 0, 0.6)",
          },
          fontSize: "16px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          ":before": {
            color: "rgba(0, 0, 0, 0.4)",
          },
          "&.Mui-focused": {
            color: "rgba(0, 0, 0, 0.4)",
            borderColor: "rgba(0, 0, 0, 0.4)",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          ":after": {
            borderColor: "rgba(0, 0, 0, 0.6)",
          },
        },
      },
    },
  },
});

export const BecomeDealerPage: FC = () => {
  const [fetchData, { data: pageData, isFetching }] =
    useLazyFetchBecomeDealerPageDataQuery();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href={Path.Home}>
      Главная
    </Link>,
    <Link underline="hover" key="2" color="inherit" href={Path.MirShineray}>
      Мир Shineray
    </Link>,
    <Link underline="hover" key="3" color="inherit" href={Path.BecomeDealer}>
      Стать дилером
    </Link>,
  ];

  if (!pageData || isFetching) {
    return <Preloader />;
  }

  return (
    <div className={styles.pageWrapper}>
      <HeaderSlider image={pageData.body.page_header.image} />
      <BreadcrumbsComponent data={breadcrumbs} />
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
            background: `url(https://dev.shineray.by/media/${pageData.body.content.form_image_background}) no-repeat`,
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
                <ThemeProvider theme={theme}>
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
                          sx={{
                            color: "black !important",
                            borderBottomColor: "gray !important",
                          }}
                          id="phone-number"
                          startAdornment={
                            <InputAdornment position="start">
                              +375
                            </InputAdornment>
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
                          sx={{
                            color: "black !important",
                            borderBottomColor: "gray !important",
                          }}
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
                          sx={{
                            color: "black !important",
                            borderBottomColor: "gray !important",
                          }}
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
                          sx={{
                            color: "black !important",
                            borderBottomColor: "gray !important",
                          }}
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
                          sx={{
                            color: "black !important",
                            borderBottomColor: "gray !important",
                          }}
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
                </ThemeProvider>
              </div>
            </div>
          </div>
          <img
            className={styles.pageWrapper_container_form_carsBackground}
            src={`https://dev.shineray.by/media/${pageData.body.content.form_image}`}
            alt="Form-background"
          />
        </div>        
      </div>
    </div>
  );
};
