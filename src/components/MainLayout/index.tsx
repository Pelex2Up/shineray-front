import { FC, useEffect } from "react";
import styles from "./mainLayout.module.scss";
import { HeaderBar } from "components/headerBar";
import { Outlet } from "react-router-dom";
import { Footer } from "components/footerBar";
import { useBoolean } from "customHooks/useBoolean";
import { motion } from "framer-motion";
import CookieConsent from "react-cookie-consent";
import { Path } from "enum/PathE";

export const MainLayout: FC = () => {
  const [headerColoured, { open: colorBg, close: uncolorBg }] = useBoolean();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const blockHeight =
        document.getElementById("header-slider")?.offsetHeight ?? 0;

      if (scrollPosition > blockHeight - 50) {
        colorBg();
      } else {
        uncolorBg();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [colorBg, uncolorBg]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.wrapper}
    >
      <CookieConsent
        location="bottom"
        buttonText="Я согласен(а)"
        cookieName="shinerayCookieConsent"
        overlayClasses={styles.cookieOverlay}
        style={{
          justifySelf: "center",
          marginBottom: "1rem",
          background: "white",
          color: "black",
          borderRadius: "7px",
          boxShadow: "2px 3px 10px rgba(0, 0, 0, 0.4)",
          bottom: "15px",
          left: "50%",
          maxWidth: "90%",
          transform: "translateX(-50%)",
          alignItems: "center",
        }}
        buttonStyle={{
          height: "3rem",
        }}
        buttonClasses={styles.cookieButtonWrapper_cookieButton}
        buttonWrapperClasses={styles.cookieButtonWrapper}
        hideOnAccept
        expires={150}
      >
        <p>
          Мы используем файлы cookies для улучшения работы сайта. Оставаясь на
          нашем сайте, вы соглашаетесь с условиями использования файлов cookies.
          Чтобы ознакомиться с нашими Положениями о конфиденциальности и об
          использовании файлов cookie,{" "}
          <a
            href={Path.LegalInformation + "4/politika-konfidencialnosti"}
            target="_blank"
            rel="noreferrer"
          >
            нажмите здесь
          </a>
          .
        </p>
      </CookieConsent>
      <HeaderBar color={headerColoured} />
      <Outlet />
      <Footer />
    </motion.div>
  );
};
