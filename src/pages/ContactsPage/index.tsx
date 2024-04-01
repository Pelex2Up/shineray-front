import { FC, FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./ContactsPage.module.scss";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import {
  useLazyFetchContactsPageDataQuery,
  useSendContactsMutation,
} from "api/mirShinerayService";
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
import { CommonButton } from "components/common/Buttons";
import { Path } from "enum/PathE";
import formLogo from "../../assets/logo/formLogo.png";
import { BreadcrumbsComponent } from "components/breadcrumbs";
import InputMask from "react-input-mask";

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
  const [sendForm, { isSuccess }] = useSendContactsMutation();
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

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    sendForm(formData);
  };

  if (!pageData || isFetching) {
    return <Preloader />;
  }

  return (
    <div className={styles.pageWrapper}>
      <HeaderSlider image={pageData.body.page_header.image} />
      <BreadcrumbsComponent data={breadcrumbs} />
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
              style={{ width: "100% !important" }}
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
            background: `url(https://shineray.by/media/${pageData.body.content.form_image_background}) no-repeat`,
            backgroundSize: "cover",
          }}
        >
          <div className={styles.pageWrapper_container_form_content}>
            <div className={styles.pageWrapper_container_form_content_logo}>
              <img src={formLogo} alt="Logo" />
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
                  <form onSubmit={handleForm}>
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
                          <InputMask
                            mask="+375 (99) 999-99-99"
                            id="phone-number"
                            name="phone_number"
                          >
                            <Input
                              sx={{
                                color: "black !important",
                                borderBottomColor: "gray !important",
                              }}
                              type="tel"
                              required
                            />
                          </InputMask>
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
                            type="text"
                            name="name"
                            id="user-fullname"
                            required
                          />
                        </FormControl>
                      </div>
                      <div>
                        <FormControl fullWidth variant="standard">
                          <InputLabel
                            sx={{ color: "black !important" }}
                            htmlFor="city"
                          >
                            Из какого Вы города?
                          </InputLabel>
                          <Input
                            name="city"
                            sx={{
                              color: "black !important",
                              borderBottomColor: "gray !important",
                            }}
                            required
                            id="city"
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
                            type="email"
                            name="email"
                            id="email"
                            required
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
                            required
                            sx={{
                              color: "black !important",
                              borderBottomColor: "gray !important",
                            }}
                            id="text"
                            name="message_text"
                            multiline
                            rows={4}
                          />
                        </FormControl>
                      </div>
                      <CommonButton
                        disabled={isSuccess}
                        type="submit"
                        style={
                          isSuccess
                            ? {
                                marginTop: "2rem",
                                backgroundColor: "#6fd242",
                                cursor: "default",
                              }
                            : { marginTop: "2rem" }
                        }
                        text={
                          isSuccess
                            ? "Заявка успешно отправлена!"
                            : "Отправить запрос"
                        }
                      />
                    </Box>
                  </form>
                </ThemeProvider>
              </div>
            </div>
          </div>
          <img
            className={styles.pageWrapper_container_form_carsBackground}
            src={`https://shineray.by/media/${pageData.body.content.form_image}`}
            alt="Form bg"
          />
        </div>
      </div>
    </div>
  );
};
