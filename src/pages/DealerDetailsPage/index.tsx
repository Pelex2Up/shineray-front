import { FC, useEffect } from "react";
import styles from "./DealerDetailsPage.module.scss";
import { useParams } from "react-router-dom";
import { useLazyFetchDealerDetailsQuery } from "api/dealersPageService";
import { HeaderSlider } from "components/HeaderCarousel";
import { Preloader } from "components/Preloader";
import {
  Construction,
  DirectionsCar,
  FmdGood,
  NoCrash,
} from "@mui/icons-material";
import parse from "html-react-parser";
import { Link, Typography } from "@mui/material";
import { Path } from "enum/PathE";
import { BreadcrumbsComponent } from "components/breadcrumbs";

export const DealerDetailsPage: FC = () => {
  const params = useParams();

  const [fetchData, { data: dealerData, isFetching }] =
    useLazyFetchDealerDetailsQuery();

  useEffect(() => {
    if (params.dealerId) {
      fetchData(Number(params.dealerId));
    }
  }, [params, fetchData]);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href={Path.Home}>
      Главная
    </Link>,
    <Link underline="hover" key="2" color="inherit" href={Path.Dealer}>
      Дилеры
    </Link>,
    <Typography key="3" color="text.primary">
      {dealerData?.company_name}
    </Typography>,
  ];

  if (!dealerData || isFetching) {
    return <Preloader />;
  }

  return (
    <div className={styles.wrapper}>
      <HeaderSlider image={dealerData.header_image} />
      <BreadcrumbsComponent data={breadcrumbs} />
      <div className={styles.wrapper_content}>
        <div className={styles.wrapper_content_title}>
          <h1>{`«${dealerData.name}» официальный дилер Shineray`}</h1>
        </div>
        <div className={styles.wrapper_content_body}>
          <div className={styles.wrapper_content_body_dealerDescription}>
            {parse(dealerData.big_text_description)}
          </div>
          <div className={styles.wrapper_content_body_dealerData}>
            <h2>{dealerData.company_name}:</h2>
            <div
              className={styles.wrapper_content_body_dealerData_dealerBranch}
            >
              {dealerData.branches.map((branch, index) => (
                <div
                  key={branch.dealer + index + "_branch"}
                  className={
                    index % 2
                      ? styles.wrapper_content_body_dealerData_dealerBranch_second
                      : styles.wrapper_content_body_dealerData_dealerBranch_first
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <>
                      <span>
                        <strong
                          style={{
                            border: "2px solid #cf2626",
                            borderRadius: "10px",
                            padding: "5px",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <FmdGood
                            sx={{
                              color: "#cf2626",
                              fontSize: "20px",
                              marginRight: "0.3rem",
                            }}
                          />{" "}
                          {`${branch.name}: ${branch.address}`}
                        </strong>
                        <img
                          src={`https://dev.shineray.by/media/${dealerData.image_logo}`}
                          alt={"logo"}
                        />
                      </span>
                      <div
                        className={
                          index % 2
                            ? styles.wrapper_content_body_dealerData_dealerBranch_second_details
                            : styles.wrapper_content_body_dealerData_dealerBranch_first_details
                        }
                      >
                        <div
                          className={
                            index % 2
                              ? styles.wrapper_content_body_dealerData_dealerBranch_second_details_workingHours
                              : styles.wrapper_content_body_dealerData_dealerBranch_first_details_workingHours
                          }
                        >
                          <h4>Режим работы:</h4>
                          {parse(branch.working_hours)}
                        </div>
                        <div
                          className={
                            index % 2
                              ? styles.wrapper_content_body_dealerData_dealerBranch_second_details_services
                              : styles.wrapper_content_body_dealerData_dealerBranch_first_details_services
                          }
                        >
                          <h4>Услуги:</h4>
                          {branch.new_cars && (
                            <span
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "0.1rem",
                                fontSize: "10px",
                                color: "gray",
                                opacity: "0.9",
                                padding: 0,
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
                                opacity: "0.9",
                                padding: 0,
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
                                opacity: "0.9",
                                padding: 0,
                              }}
                            >
                              <Construction />
                              Сервис и продажа запчастей
                            </span>
                          )}
                        </div>
                        <div
                          className={
                            index % 2
                              ? styles.wrapper_content_body_dealerData_dealerBranch_second_details_contacts
                              : styles.wrapper_content_body_dealerData_dealerBranch_first_details_contacts
                          }
                        >
                          <h4>Контакты:</h4>
                          {branch.departments.map((department, indexDep) => (
                            <div style={{ paddingBottom: "1rem" }}>
                              <span
                                key={indexDep}
                                style={{
                                  paddingBottom: "0.2rem",

                                  fontSize: "17px",
                                  fontWeight: "bold",
                                }}
                              >
                                {department.name}:
                              </span>
                              {department.contact_phone.map(
                                (phone, indexPhone) => (
                                  <p key={phone.id + index + "_phone"}>
                                    {`${phone.mobile_operator}: `}
                                    <a href={`tel:${phone.phone_number}`}>
                                      {phone.phone_number}
                                    </a>
                                  </p>
                                ),
                              )}
                            </div>
                          ))}
                          {dealerData.web_site && (
                            <>
                              <span
                                style={{
                                  paddingBottom: "0.2rem",
                                  fontWeight: "bold",
                                  fontSize: "17px",
                                }}
                              >
                                Веб-сайт:
                              </span>

                              <a
                                href={dealerData.web_site}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {dealerData.web_site}
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        b
      </div>
    </div>
  );
};
