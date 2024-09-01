import { FC, FormEvent, useEffect } from "react";
import styles from "./DealerDetailsPage.module.scss";
import { useParams } from "react-router-dom";
import { useLazyFetchDealerDetailsQuery, useSendDealerMessageMutation } from "api/dealersPageService";
import { HeaderSlider } from "components/HeaderCarousel";
import { Preloader } from "components/Preloader";
import {
  Construction,
  DirectionsCar,
  FmdGood,
  NoCrash,
} from "@mui/icons-material";
import parse from "html-react-parser";
import { Box, FormControl, Input, InputLabel, Link, ThemeProvider, Typography } from "@mui/material";
import { Path } from "enum/PathE";
import { BreadcrumbsComponent } from "components/breadcrumbs";
import { Helmet } from "react-helmet-async";
import { CommonButton } from "components/common/Buttons";
import InputMask from "react-input-mask";
import { theme } from "pages/BecomeDealerPage";
import formLogo from '../../assets/logo/formLogo.png'
import { DealerMessageT } from "api/apiTypes";
import styles1 from '../BecomeDealerPage/BecomeDealerPage.module.scss'

export const DealerDetailsPage: FC = () => {
  const params = useParams();
  const [sendMessage, { isSuccess, isLoading }] = useSendDealerMessageMutation()

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



  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const messageData: DealerMessageT = {
      name: formData.get('name') as string,
      phone_number: formData.get('phone_number') as string,
      email: formData.get('email') as string,
      message_text: formData.get('message_text') as string
    }
    if (messageData && dealerData) {
      sendMessage({ dealerId: dealerData.id, data: messageData });
    }
  };

  if (!dealerData) {
    return <Preloader />;
  }

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>{`«${dealerData.name}» официальный дилер Shineray в ${dealerData.city || "Беларуси"}`}</title>
        <meta
          name="description"
          property="og:description"
          content={`Официальный дилер Shineray ${dealerData.city}: продажа новых автомобилей Shineray, периодическое техническое обслуживание (ТО), гарантийное и сервисное обслуживание, оригинальные запасные части.`}
        />
        <meta
          name="keywords"
          property="og:keywords"
          content={`Shineray, SRM, брэнд, бренд, марка, дилер, официальный, Республика Беларусь, Беларусь, дилеры, ${dealerData.city}, область,регион`}
        />
      </Helmet>
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
                          src={`https://shineray.by/media/${dealerData.image_logo}`}
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
                                    {`${phone.mobile_operator || "Телефон"}: `}
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
            <div
              className={styles1.pageWrapper_container_form}
              style={{
                background: `url(https://shineray.by/media/${dealerData.media.form_image_background}) 0% 0% / cover no-repeat`,
                backgroundSize: "cover",
              }}
            >
              <div className={styles1.pageWrapper_container_form_content}>
                <div className={styles1.pageWrapper_container_form_content_logo}>
                  <img src={formLogo} alt="Logo" />
                </div>
                <div
                  className={styles1.pageWrapper_container_form_content_formWrapper}
                >
                  <div
                    className={
                      styles1.pageWrapper_container_form_content_formWrapper_title
                    }
                  >
                    <p style={{fontWeight: 'bold', fontSize: '30px'}}>Связаться с дилером</p>
                  </div>
                  <div
                    className={
                      styles1.pageWrapper_container_form_content_formWrapper_body
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
                                required
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
                                required
                                name="name"
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
                                required
                                type="email"
                                name="email"
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
                className={styles1.pageWrapper_container_form_carsBackground}
                src={`https://shineray.by/media/${dealerData.media.form_image}`}
                alt="Form-background"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
