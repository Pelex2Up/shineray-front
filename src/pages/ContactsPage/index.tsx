import { FC, useEffect, useMemo, useState } from "react";
import styles from "./ContactsPage.module.scss";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { useLazyFetchContactsPageDataQuery } from "api/mirShinerayService";
import { Preloader } from "components/Preloader";
import parse from "html-react-parser";
import { HeaderSlider } from "components/HeaderCarousel";
import {
  Box,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { LinkButton } from "components/common/Buttons";

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
              </div>
            </div>
          </div>
          <img
            className={styles.pageWrapper_container_form_carsBackground}
            src={`http://93.177.124.158/media/${pageData.body.content.form_image}`}
            alt="Form image"
          />
        </div>
        d
      </div>
    </div>
  );
};
