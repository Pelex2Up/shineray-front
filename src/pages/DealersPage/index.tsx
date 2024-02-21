import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import styles from "./DealersPage.module.scss";
import { HeaderSlider } from "components/HeaderCarousel";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { useLazyFetchDealersPageDataQuery } from "api/dealersPageService";
import { Preloader } from "components/Preloader";
import { CommonButton, LinkButton } from "components/common/Buttons";
import { Construction, DirectionsCar, NoCrash } from "@mui/icons-material";
import { Path } from "enum/PathE";
import { generatePath } from "react-router-dom";
import { DealersPageT } from "api/apiTypes";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const theme = createTheme({
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: "#cf2626",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "black",
          "&.Mui-focused": {
            color: "black",
          },
          fontSize: "20px",
        },
      },
    },
  },
});

const mapEndpoints: {
  city: string;
  center: number[];
  zoom: number;
  controls: string[];
}[] = [
  {
    city: "Минск",
    center: [53.902735, 27.555696],
    zoom: 11,
    controls: ["zoomControl", "fullscreenControl"],
  },
  {
    city: "Брест",
    center: [52.093754, 23.685107],
    zoom: 12,
    controls: ["zoomControl", "fullscreenControl"],
  },
  {
    city: "Витебск",
    center: [55.184217, 30.202878],
    zoom: 12,
    controls: ["zoomControl", "fullscreenControl"],
  },
  {
    city: "Гомель",
    center: [52.435159, 31.019465],
    zoom: 12,
    controls: ["zoomControl", "fullscreenControl"],
  },
  {
    city: "Гродно",
    center: [53.674757, 23.840581],
    zoom: 12,
    controls: ["zoomControl", "fullscreenControl"],
  },
  {
    city: "Могилёв",
    center: [53.894548, 30.330654],
    zoom: 12,
    controls: ["zoomControl", "fullscreenControl"],
  },
];

export const DealersPage: FC = () => {
  const [fetchPage, { data: responseData, isLoading, isSuccess }] =
    useLazyFetchDealersPageDataQuery();
  const [filterCity, setFilterCity] = useState<string>("Без фильтра");
  const [pageData, setPageData] = useState<DealersPageT>();
  const [zoom, setZoom] = useState(6);
  const [mapRefresh, setMapRefresh] = useState<{
    center: number[];
    zoom: number;
    controls: string[];
  }>();

  const mapState = useMemo(
    () => ({
      center: [53.67, 28.04],
      zoom,
      controls: ["zoomControl", "fullscreenControl"],
    }),
    [zoom],
  );

  useEffect(() => {
    setFilterCity("Без фильтра");
    fetchPage();
  }, []);

  useEffect(() => {
    if (responseData && isSuccess) {
      setPageData(responseData);
    }
  }, [responseData]);

  const handleFilter = (event: ChangeEvent<HTMLInputElement>, city: string) => {
    if (pageData && responseData) {
      if (city !== "Без фильтра") {
        setFilterCity(city);
        const filteredData = responseData.body.content.filter(
          (dealer) => dealer.city === city,
        );
        setPageData(() => ({
          ...responseData,
          body: {
            ...responseData.body,
            content: filteredData,
          },
        }));
      } else {
        setFilterCity("Без фильтра");
        setPageData(responseData);
      }
    }
  };

  useEffect(() => {
    if (filterCity && mapEndpoints) {
      if (filterCity === "Гродно") {
        const newState = mapEndpoints.filter((map) => map.city === "Гродно")[0];
        setMapRefresh(newState);
        scrollToElement("yandex-map");
      } else if (filterCity === "Минск") {
        const newState = mapEndpoints.filter((map) => map.city === "Минск")[0];
        setMapRefresh(newState);
        scrollToElement("yandex-map");
      } else if (filterCity === "Брест") {
        const newState = mapEndpoints.filter((map) => map.city === "Брест")[0];
        setMapRefresh(newState);
        scrollToElement("yandex-map");
      } else if (filterCity === "Витебск") {
        const newState = mapEndpoints.filter(
          (map) => map.city === "Витебск",
        )[0];
        setMapRefresh(newState);
        scrollToElement("yandex-map");
      } else if (filterCity === "Могилёв") {
        const newState = mapEndpoints.filter(
          (map) => map.city === "Могилёв",
        )[0];
        setMapRefresh(newState);
        scrollToElement("yandex-map");
      } else if (filterCity === "Гомель") {
        const newState = mapEndpoints.filter((map) => map.city === "Гомель")[0];
        setMapRefresh(newState);
        scrollToElement("yandex-map");
      } else if (filterCity === "Без фильтра") {
        const newState = {
          center: [53.67, 28.04],
          zoom: 6,
          controls: ["zoomControl", "fullscreenControl"],
        };
        setMapRefresh(newState);
        scrollToElement("yandex-map");
      }
    }
  }, [filterCity]);

  function scrollToElement(elementId: string) {
    var element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  const handleMapRotate = ([latitude, longitute]: number[], city: string) => {
    const newState = {
      center: [latitude, longitute],
      zoom: 14,
      controls: ["zoomControl", "fullscreenControl"],
    };
    setMapRefresh(newState);
    scrollToElement("yandex-map");
  };

  if (!pageData || isLoading) {
    return <Preloader />;
  }

  return (
    <div className={styles.dealersWrapper}>
      <HeaderSlider image={pageData.body.page_header.image} />
      <div className={styles.dealersWrapper_title}>
        <h1>{pageData.body.page_header.title}</h1>
        <ThemeProvider theme={theme}>
          <FormControl
            sx={{
              width: "100%",
              marginBottom: "-30px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem 1rem",
            }}
          >
            <FormLabel
              id="controlled-radio-buttons-group"
              sx={{ color: "black", ":focus": "none", fontWeight: "bold", fontSize: '1rem' }}
            >
              Дилеры по городам:
            </FormLabel>
            <RadioGroup
              aria-labelledby="controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                paddingLeft: "0.5rem",
              }}
              value={filterCity}
              onChange={handleFilter}
            >
              <FormControlLabel
                value="Без фильтра"
                control={<Radio />}
                label="Вся Беларусь"
              />
              <FormControlLabel
                value="Минск"
                control={<Radio />}
                label="Минск"
              />
              <FormControlLabel
                value="Витебск"
                control={<Radio />}
                label="Витебск"
              />
              <FormControlLabel
                value="Брест"
                control={<Radio />}
                label="Брест"
              />
              <FormControlLabel
                value="Гомель"
                control={<Radio />}
                label="Гомель"
              />
              <FormControlLabel
                value="Гродно"
                control={<Radio />}
                label="Гродно"
              />
              <FormControlLabel
                value="Могилёв"
                control={<Radio />}
                label="Могилёв"
              />
            </RadioGroup>
          </FormControl>
        </ThemeProvider>
      </div>
      <div className={styles.dealersWrapper_content}>
        <div className={styles.dealersWrapper_content_leftSide}>
          {pageData.body.content.map((dealer, indexAll) =>
            dealer.branches.map((branch, index) => (
              <div
                style={
                  indexAll + index !== 0
                    ? { borderTop: "1px solid #a3a3a3" }
                    : {}
                }
                className={styles.dealersWrapper_content_leftSide_dealerData}
                key={branch.order + index}
              >
                {dealer.image_logo && (
                  <img
                    src={`http://93.177.124.158/media/${dealer.image_logo}`}
                    style={
                      index + indexAll === 0
                        ? { width: "60%", objectFit: "contain", paddingTop: 0 }
                        : { width: "60%", objectFit: "contain" }
                    }
                    alt={"dealer logo"}
                  />
                )}
                <h2>{`${branch.name} ${dealer.name}`}</h2>
                <p>
                  <strong>{dealer.company_name}</strong>
                </p>
                {branch.new_cars && (
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "0.1rem",
                      fontSize: "10px",
                      color: "gray",
                      opacity: "0.8",
                    }}
                  >
                    <DirectionsCar />
                    Продажа новых авто
                  </span>
                )}
                {branch.used_cars && (
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "0.1rem",
                      fontSize: "10px",
                      color: "gray",
                      opacity: "0.8",
                    }}
                  >
                    <NoCrash />
                    Продажа авто с пробегом
                  </span>
                )}
                {branch.service_and_spare_parts && (
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "0.1rem",
                      fontSize: "10px",
                      color: "gray",
                      opacity: "0.8",
                    }}
                  >
                    <Construction />
                    Сервис и продажа запчастей
                  </span>
                )}
                <p>Адрес: {branch.address}</p>
                <div
                  className={
                    styles.dealersWrapper_content_leftSide_dealerData_buttons
                  }
                >
                  <LinkButton
                    href={generatePath(Path.DealerDetail, {
                      dealerId: String(branch.dealer),
                    })}
                    text="Подробнее"
                    style={{
                      background: "white",
                      borderColor: "black",
                      border: "1px solid black",
                      color: "black",
                    }}
                  />
                  <CommonButton
                    onClick={() =>
                      handleMapRotate(
                        [branch.latitude, branch.longitude],
                        dealer.city,
                      )
                    }
                    text={"Показать на карте"}
                  />
                </div>
              </div>
            )),
          )}
        </div>
        <div className={styles.dealersWrapper_content_rightSide}>
          <YMaps
            query={{
              ns: "use-load-option",
              load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
            }}
            className={styles.dealersWrapper_content_rightSide_mapWrapper}
          >
            <Map
              id="yandex-map"
              defaultState={mapState}
              state={mapRefresh}
              className={styles.dealersWrapper_content_rightSide_mapWrapper_map}
            >
              {pageData.body.content.map((dealer, index) =>
                dealer.branches.map((branch, indexBranch) => (
                  <Placemark
                    key={`${index}_${indexBranch}`}
                    geometry={[branch.latitude, branch.longitude]}
                    properties={{
                      balloonContentBody: `${branch.name} ${dealer.name}: ${branch.address}`,
                      hintContent: `<b>${branch.name} ${dealer.name}</b>`,
                    }}
                    options={{
                      preset: "islands#icon",
                      iconColor: "red",
                    }}
                  />
                )),
              )}
            </Map>
          </YMaps>
        </div>
      </div>
    </div>
  );
};
