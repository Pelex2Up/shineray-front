import { FC, useEffect, useMemo, useState } from "react";
import styles from "./ContactsPage.module.scss";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { useLazyFetchContactsPageDataQuery } from "api/mirShinerayService";
import { Preloader } from "components/Preloader";
import parse from "html-react-parser";
import { HeaderSlider } from "components/HeaderCarousel";
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

export const ContactsPage: FC = () => {
  const [fetchData, { data: pageData, isFetching }] =
    useLazyFetchContactsPageDataQuery();
  const [zoom, setZoom] = useState(17);

  useEffect(() => {
    fetchData();
  }, []);

  const mapState = useMemo(
    () => ({
      center: [53.899546, 27.543074],
      zoom,
      controls: ["zoomControl", "fullscreenControl"],
    }),
    [zoom],
  );

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href={Path.Home}>
      Главная
    </Link>,
    <Link underline="hover" key="2" color="inherit" href={Path.Contacts}>
      Контакты
    </Link>,
  ];

  if (!pageData || isFetching) {
    return <Preloader />;
  }

  return (
    <div className={styles.pageWrapper}>
      <HeaderSlider image={pageData.body.page_header.image} />
      <div className={styles.pageWrapper_container}>
        <div className={styles.pageWrapper_container_title}>
          <h1>Контакты</h1>
        </div>
        <div className={styles.pageWrapper_container_content}>
          <div className={styles.pageWrapper_container_content_contactsInfo}>
            {parse(pageData.body.content.content)}
          </div>
          <div className={styles.pageWrapper_container_content_map}>
            <YMaps
              query={{
                ns: "use-load-option",
                load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
              }}
            >
              <Map defaultState={mapState} width={"100%"} height={"440px"}>
                <Placemark
                  defaultGeometry={[53.899546, 27.543074]}
                  properties={{
                    balloonContentBody: `ООО «Лакшери моторс групп» ул. Немига, 40, пом.33, каб.27`,
                  }}
                />
              </Map>
            </YMaps>
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
                <p>Связаться с нами</p>
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
            src={`http://93.177.124.158/media/${pageData.body.content.form_image}`}
            alt="Form image"
          />
        </div>
      </div>
    </div>
  );
};
