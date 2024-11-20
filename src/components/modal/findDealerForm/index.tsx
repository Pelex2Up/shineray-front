import { FC, FormEvent, useEffect, useState } from "react";
import styles from "../../../pages/BecomeDealerPage/BecomeDealerPage.module.scss";
import formLogo from "../../../assets/logo/formLogo.png";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
} from "@mui/material";
import InputMask from "react-input-mask";
import { CommonButton } from "components/common/Buttons";
import {
  useFetchDealersByCityMutation,
  useFetchDealersCitiesQuery,
  useSendDealerMessageMutation,
} from "api/dealersPageService";
import { theme } from "pages/BecomeDealerPage";
import { CloseOutlined } from "@mui/icons-material";
import { DealerMessageT } from "api/apiTypes";
import { Preloader } from "components/Preloader";

interface IFindDealerForm {
  closeModal: () => void;
}

export const FindDealerForm: FC<IFindDealerForm> = ({ closeModal }) => {
  const [sendMessage, { isSuccess, isLoading }] =
    useSendDealerMessageMutation();
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDealer, setSelectedDealer] = useState<string>("");
  const { data: cities, isLoading: loadingCities } =
    useFetchDealersCitiesQuery();
  const [fetchDealers, { data: dealers, isLoading: loadingDealers }] =
    useFetchDealersByCityMutation();

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const messageData: DealerMessageT = {
      name: formData.get("name") as string,
      phone_number: formData.get("phone_number") as string,
      email: formData.get("email") as string,
      message_text: formData.get("message_text") as string,
    };
    if (messageData) {
      sendMessage({ data: messageData, dealerId: Number(selectedDealer) });
    }
  };

  useEffect(() => {
    if (!loadingDealers) {
      fetchDealers(selectedCity);
    }
  }, [selectedCity]);

  if (!cities) {
    return <Preloader />;
  }

  return (
    <div
      className={styles.pageWrapper_container_form_content}
      style={
        window.innerWidth > 1024
          ? {
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              margin: "0 auto",
              maxWidth: "1100px",
              padding: "50px 30px",
            }
          : {
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              margin: "0 auto",
              maxWidth: "1100px",
              padding: "50px 0",
            }
      }
    >
      <div className={styles.pageWrapper_container_form_content_logo}>
        <img src={formLogo} alt="Logo" />
      </div>
      <IconButton
        sx={{ position: "absolute", right: "1rem", top: "1rem" }}
        onClick={closeModal}
      >
        <CloseOutlined />
      </IconButton>
      <div className={styles.pageWrapper_container_form_content_formWrapper}>
        <div
          className={
            styles.pageWrapper_container_form_content_formWrapper_title
          }
        >
          <p>Запросить предложение</p>
        </div>
        <div
          className={styles.pageWrapper_container_form_content_formWrapper_body}
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
                  <FormControl fullWidth required>
                    <InputLabel
                      id="demo-simple-select-required-label"
                      sx={{ color: "black !important", alignSelf: "start" }}
                    >
                      Выберите город
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={selectedCity}
                      label="Выберите город"
                      sx={{
                        borderColor: "gray !important",
                        textAlign: "start",
                      }}
                      onChange={(e: SelectChangeEvent) => {
                        setSelectedDealer("");
                        setSelectedCity(e.target.value);
                      }}
                    >
                      {cities.cities.map((city, index) => (
                        <MenuItem value={city} key={index}>
                          {city}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                {/* сюда выводить всех диллеров по городу! */}
                {selectedCity && dealers && (
                  <div>
                    <FormControl fullWidth required sx={{ marginTop: "10px" }}>
                      <InputLabel
                        id="demo-simple-select-required-label"
                        sx={{ color: "black !important", alignSelf: "start" }}
                      >
                        Выберите дилера
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={selectedDealer}
                        label="Выберите дилера"
                        sx={{
                          borderColor: "gray !important",
                          textAlign: "start",
                        }}
                        onChange={(e: SelectChangeEvent) =>
                          setSelectedDealer(e.target.value)
                        }
                      >
                        {dealers.map((dealer, index) => (
                          <MenuItem value={dealer.id}>
                            {dealer.company_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                )}
                <div>
                  <FormControl fullWidth required variant="standard">
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
                  <FormControl fullWidth required variant="standard">
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
                  <FormControl fullWidth required variant="standard">
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
                  <FormControl fullWidth required variant="standard">
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
  );
};
