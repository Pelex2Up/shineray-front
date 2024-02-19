import { FC, useEffect, useMemo, useState } from "react";
import styles from "./DealersPage.module.scss";
import { HeaderSlider } from "components/HeaderCarousel";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { useLazyFetchDealersPageDataQuery } from "api/dealersPageService";
import { Preloader } from "components/Preloader";
import { CommonButton, LinkButton } from "components/common/Buttons";
import { Construction, DirectionsCar, NoCrash } from "@mui/icons-material";
import { Path } from "enum/PathE";
import { generatePath } from "react-router-dom";

export const DealersPage: FC = () => {
  const [fetchPage, { data: pageData, isLoading }] =
    useLazyFetchDealersPageDataQuery();

  useEffect(() => {
    fetchPage();
  }, []);

  function scrollToElement(elementId: string) {
    var element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

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
                    style={{ width: "100%", objectFit: "cover" }}
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
                      handleMapRotate([branch.latitude, branch.longitude])
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
                    key={index + indexBranch + "_placemark"}
                    defaultGeometry={[branch.latitude, branch.longitude]}
                    properties={{
                      balloonContentBody: `${branch.name} ${dealer.name}: ${branch.address}`,
                      hintContent: `<b>${branch.name} ${dealer.name}</b>`,
                    }}
                    options={{
                      preset: "islands#icon",
                      iconColor: "red", // цвет иконки, можно также задавать в hex
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
