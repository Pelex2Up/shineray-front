import { FC, FormEvent, useEffect } from "react";
import styles from "./BecomeDealerPage.module.scss";
import { HeaderSlider } from "components/HeaderCarousel";
import parse from "html-react-parser";
import {
  useLazyFetchBecomeDealerPageDataQuery,
  useSendBecomeDealerFormMutation,
} from "api/mirShinerayService";
import { Preloader } from "components/Preloader";
import {
  Box,
  CircularProgress,
  FormControl,
  Input,
  InputLabel,
  Link,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { CommonButton } from "components/common/Buttons";
import { Path } from "enum/PathE";
import { BreadcrumbsComponent } from "components/breadcrumbs";
import formLogo from "../../assets/logo/formLogo.png";
import InputMask from "react-input-mask";
import { Helmet } from "react-helmet-async";

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
  const [sendForm, { isSuccess }] = useSendBecomeDealerFormMutation();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    sendForm(formData);
  };

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

  if (!pageData) {
    return <Preloader />;
  }

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>{`Стать официальным дилером Shineray в Республике Беларусь`}</title>
        <meta
          name="description"
          property="og:description"
          content={`Хотите стать официальным дилером Shineray? Заполните и отправьте нам свою заявку, мы свяжемся с Вами для обсуждения всех необходимых для этого деталей!`}
        />
        <meta
          name="keywords"
          property="og:keywords"
          content="Shineray, SRM, SWM, официальный, представитель, дистрибьютор, марка, брэнд, бренд, дилер, Республика Беларусь, Беларусь"
        />
      </Helmet>
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
                <p>Стать дилером</p>
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
                            htmlFor="organization"
                          >
                            Организация, которую Вы представляете
                          </InputLabel>
                          <Input
                            name="organization"
                            sx={{
                              color: "black !important",
                              borderBottomColor: "gray !important",
                            }}
                            required
                            id="organization"
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
            className={styles.pageWrapper_container_form_carsBackground}
            src={`https://shineray.by/media/${pageData.body.content.form_image}`}
            alt="Form-background"
          />
        </div>
      </div>
    </div>
  );
};
