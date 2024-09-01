import { FC, FormEvent, useEffect } from "react";
import styles from '../../../pages/BecomeDealerPage/BecomeDealerPage.module.scss'
import formLogo from '../../../assets/logo/formLogo.png'
import { Box, FormControl, IconButton, Input, InputLabel, ThemeProvider } from "@mui/material";
import InputMask from "react-input-mask";
import { CommonButton } from "components/common/Buttons";
import { useSendDealerMessageMutation } from "api/dealersPageService";
import { theme } from "pages/BecomeDealerPage";
import { CloseOutlined } from "@mui/icons-material";
import { DealerMessageT } from "api/apiTypes";

interface IForm {
    closeModal: () => void
    dealer: number
}
export const DealerMessageForm: FC<IForm> = ({ closeModal, dealer }) => {
    const [sendMessage, { isSuccess, isLoading }] = useSendDealerMessageMutation()

    const handleForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const messageData: DealerMessageT = {
            name: formData.get('name') as string,
            phone_number: formData.get('phone_number') as string,
            email: formData.get('email') as string,
            message_text: formData.get('message_text') as string
        }
        if (messageData) {
            sendMessage({ dealerId: dealer, data: messageData });
        }
    };

    return <div className={styles.pageWrapper_container_form_content} style={{ position: 'absolute', left: '50%', top: "50%", transform: 'translate(-50%, -50%)', margin: '0 auto', maxWidth: '1100px', padding: '50px 30px' }}>
        <div className={styles.pageWrapper_container_form_content_logo}>
            <img src={formLogo} alt="Logo" />
        </div>
        <IconButton sx={{ position: 'absolute', right: '1rem', top: '1rem' }} onClick={closeModal}><CloseOutlined /></IconButton>
        <div
            className={styles.pageWrapper_container_form_content_formWrapper}
        >
            <div
                className={
                    styles.pageWrapper_container_form_content_formWrapper_title
                }
            >
                <p>Связаться с дилером</p>
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
}