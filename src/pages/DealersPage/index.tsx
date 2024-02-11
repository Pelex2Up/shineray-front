import { FC, useMemo, useState } from "react";
import styles from "./DealersPage.module.scss";
import { HeaderSlider } from "components/HeaderCarousel";
import {
  YMaps,
  Map,
  Placemark,
  FullscreenControl,
  GeoObject,
} from "react-yandex-maps";

export const DealersPage: FC = () => {
  const [zoom, setZoom] = useState(6);
  const mapState = useMemo(
    () => ({
      center: [53.67, 28.04],
      zoom,
      controls: ["zoomControl", "fullscreenControl"],
    }),
    [zoom],
  );
  return (
    <div className={styles.dealersWrapper}>
      <HeaderSlider image="https://cdn.kia.ru/resize/1440x810/media-data/banner/desktop_bg/spare-parts1440x810.jpg" />
      <div className={styles.dealersWrapper_content}>
        <div className={styles.dealersWrapper_leftSide}></div>
        <div className={styles.dealersWrapper_rightSide}>
          <YMaps
            query={{
              ns: "use-load-option",
              load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
            }}
          >
            <Map defaultState={mapState} className={styles.map}>
              <Placemark
                defaultGeometry={[53.57, 28.04]}
                properties={{
                  balloonContentBody:
                    "Описание про диллера (его адрес, название, телефоны, время работы и т.д.)",
                }}
              />
            </Map>
          </YMaps>
        </div>
      </div>
    </div>
  );
};
