import { FC, useEffect, useMemo, useState } from "react";
import styles from "./DealersPage.module.scss";
import { HeaderSlider } from "components/HeaderCarousel";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { useLazyFetchDealersPageDataQuery } from "api/dealersPageService";
import { Preloader } from "components/Preloader";
import parse from "html-react-parser";
import { Button } from "@mui/material";
import { CommonButton, LinkButton } from "components/common/Buttons";

export const DealersPage: FC = () => {
  const [fetchPage, { data: pageData, isLoading }] =
    useLazyFetchDealersPageDataQuery();

  useEffect(() => {
    fetchPage();
  }, []);

  console.log(pageData);

  const [zoom, setZoom] = useState(6);

  const mapState = useMemo(
    () => ({
      center: [53.67, 28.04],
      zoom,
      controls: ["zoomControl", "fullscreenControl"],
    }),
    [zoom],
  );

  const [mapRefresh, setMapRefresh] = useState<{
    center: number[];
    zoom: number;
    controls: string[];
  }>();

  const handleMapRotate = ([latitude, longitute]: number[]) => {
    const newState = {
      center: [latitude, longitute],
      zoom: 14,
      controls: ["zoomControl", "fullscreenControl"],
    };
    setMapRefresh(newState);
  };

  if (!pageData || isLoading) {
    return <Preloader />;
  }

  return (
    <div className={styles.dealersWrapper}>
      <HeaderSlider image={pageData.body.page_header.image} />
      <div className={styles.dealersWrapper_title}>
        <h1>{pageData.body.page_header.title}</h1>
      </div>
      <div className={styles.dealersWrapper_content}>
        <div className={styles.dealersWrapper_content_leftSide}>
          {pageData.body.content.map((dealer, index) => (
            <div
              style={index !== 0 ? { borderTop: "1px solid #a3a3a3" } : {}}
              className={styles.dealersWrapper_content_leftSide_dealerData}
              key={dealer.id + index}
            >
              {dealer.image_logo && (
                <img
                  src={`http://93.177.124.158/media/${dealer.image_logo}`}
                  style={{ width: "100%", objectFit: "cover" }}
                  alt={"dealer logo"}
                />
              )}
              <h2>{dealer.name}</h2>
              <p>{dealer.company_name}</p>
              {parse(dealer.big_text_description)}
              <p>{dealer.address_full}</p>
              <div
                className={
                  styles.dealersWrapper_content_leftSide_dealerData_buttons
                }
              >
                <LinkButton
                  href="#"
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
                    handleMapRotate([dealer.latitude, dealer.longitude])
                  }
                  text={"Показать на карте"}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.dealersWrapper_rightSide}>
          <YMaps
            query={{
              ns: "use-load-option",
              load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
            }}
          >
            <Map
              defaultState={mapState}
              state={mapRefresh}
              className={styles.map}
            >
              {pageData.body.content.map((dealer, index) => (
                <Placemark
                  key={index + "_placemark"}
                  defaultGeometry={[dealer.latitude, dealer.longitude]}
                  properties={{
                    balloonContentBody: dealer.address_full,
                  }}
                />
              ))}
            </Map>
          </YMaps>
        </div>
      </div>
    </div>
  );
};
