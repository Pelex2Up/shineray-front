import { FC, RefAttributes, forwardRef, useEffect, useRef } from "react";
import styles from "./headerBar.module.scss";
import { Path } from "enum/PathE";
import { Button } from "./components/button";
import { useMediaQuery } from "react-responsive";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useBoolean } from "customHooks/useBoolean";
import { ModelCarsMenu } from "./components/ModelCarsMenu";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFetchHeaderDataQuery } from "api/headerService";

interface IHeader {
  color: boolean;
}

type HeaderT = IHeader & RefAttributes<HTMLButtonElement>;

export const HeaderBar: FC<HeaderT> = forwardRef<HTMLButtonElement>(
  (props, ref) => {
    const isDesktopOrMobile = useMediaQuery({ minDeviceWidth: 1224 });
    const navigate = useNavigate();
    const [dropDownCars, { open: openDropDown, close: closeDropDown }] =
      useBoolean(false);
    const [
      mobileMenu,
      {
        open: openMobileMenu,
        close: closeMobileMenu,
        onToggle: toggleMobileMenu,
      },
    ] = useBoolean();
    const menuRef: HTMLButtonElement | null = null;
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const { data: headerData } = useFetchHeaderDataQuery();

    const openModels = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      openDropDown();
    };

    const closeModels = () => {
      timerRef.current = setTimeout(() => {
        closeDropDown();
        if (menuRef) {
          closeDropDown();
        }
      }, 100);
    };

    useEffect(() => {
      if (mobileMenu) {
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "auto";
      }
    }, [mobileMenu]);

    useEffect(() => {
      const button = document.querySelector('[data-popup="menu-cars"]');

      if (button) {
        button.addEventListener("mouseenter", openModels);
        button.addEventListener("mouseleave", closeModels);
      }

      const menu = document.querySelector('[data-dropdown="menu-cars"]');

      if (menu) {
        menu.addEventListener("mouseenter", openModels);
        menu.addEventListener("mouseleave", closeModels);
      }

      return () => {
        if (button) {
          button.removeEventListener("mouseenter", openModels);
          button.removeEventListener("mouseleave", closeModels);
        }
        if (menu) {
          menu.addEventListener("mouseenter", openModels);
          menu.addEventListener("mouseleave", closeModels);
        }
      };
    }, [openModels, closeModels]);

    return (
      <header className={styles.headerWrapper}>
        <nav
          className={`${styles.headerWrapper_header} ${("color" in props && props.color) || mobileMenu ? styles.scrolledBg : ""}`}
        >
          <div className={styles.headerWrapper_header_logo}>
            <a href={Path.Home} rel="nofollow">
              <img
                src={
                  "https://www.shineray.com/upload/logo/1703907286103471.png"
                }
              />
            </a>
          </div>
          {isDesktopOrMobile ? (
            <div className={styles.headerWrapper_header_buttonsBlock}>
              <Button
                text="Модельный ряд"
                ref={ref}
                data-popup="menu-cars"
                onClick={() => {
                  closeDropDown();
                  navigate(Path.Cars);
                }}
              />
              <Button text="Дилеры" />
              <Button text="Владельцам" />
              <Button text="Контакты" />
              <Button text="Мир Shineray" />
              <Button text="Новости" />
              <div
                className={`${styles.dropdownMenu}  ${dropDownCars ? styles.open : styles.closed}`}
                data-dropdown="menu-cars"
              >
                {headerData && <ModelCarsMenu data={headerData} />}
              </div>
            </div>
          ) : (
            <div className={styles.headerWrapper_header_buttonsBlock}>
              <IconButton
                size="large"
                edge="start"
                aria-label="open-mobile-menu"
                sx={{ mr: 2, color: "white" }}
                onClick={toggleMobileMenu}
              >
                {mobileMenu ? <Close /> : <MenuIcon />}
              </IconButton>
            </div>
          )}
        </nav>
        {mobileMenu && (
          <nav
            className={`${styles.mobileMenuWrapper} ${mobileMenu ? styles.mobileMenuOpen : styles.mobileMenuClose}`}
          >
            <a
              href={Path.Cars}
              rel="nofollow"
              className={styles.mobileMenuWrapper_button}
            >
              Модельный ряд
              <span />
            </a>
            <a href="#" className={styles.mobileMenuWrapper_button}>
              Дилеры
              <span />
            </a>
            <a href="#" className={styles.mobileMenuWrapper_button}>
              Владельцам
              <span />
            </a>
            <a href="#" className={styles.mobileMenuWrapper_button}>
              Мир Shineray
              <span />
            </a>
            <a href="#" className={styles.mobileMenuWrapper_button}>
              Новости
              <span />
            </a>
          </nav>
        )}
      </header>
    );
  },
);
