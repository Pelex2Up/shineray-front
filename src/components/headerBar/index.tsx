import { FC, RefAttributes, forwardRef, useEffect, useRef } from "react";
import styles from "./headerBar.module.scss";
import { Path } from "enum/PathE";
import { Button, ButtonModels } from "./components/button";
import { useMediaQuery } from "react-responsive";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useBoolean } from "customHooks/useBoolean";
import { ModelCarsMenu } from "./components/ModelCarsMenu";
import { Close, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useLazyFetchHeaderDataQuery } from "api/headerService";

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
    const [mobileMenu, { onToggle: toggleMobileMenu }] = useBoolean();
    const menuRef: HTMLButtonElement | null = null;
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [fetchData, { data: headerData }] = useLazyFetchHeaderDataQuery();

    useEffect(() => {
      fetchData()
    }, [])

    useEffect(() => {
      if (mobileMenu) {
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "auto";
      }
    }, [mobileMenu]);

    useEffect(() => {
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
    }, [openDropDown, closeDropDown]);

    return (
      <header className={styles.headerWrapper}>
        <div
          className={`${styles.headerWrapper_header} ${("color" in props && props.color) || mobileMenu ? styles.scrolledBg : ""}`}
        >
          <div className={styles.headerWrapper_header_logo}>
            <a href={Path.Home} rel="nofollow">
              <img
                alt="Logo"
                src={
                  "https://www.shineray.com/upload/logo/1703907286103471.png"
                }
              />
            </a>
          </div>
          {isDesktopOrMobile ? (
            <nav className={styles.headerWrapper_header_buttonsBlock}>
              <div className={styles.dropdownWrapper}>
                <Button text="Главная" href={Path.Home} />
              </div>

              <ButtonModels
                text="Модельный ряд"
                ref={ref}
                data-popup="menu-cars"
                onClick={() => {
                  closeDropDown();
                  navigate(Path.Cars);
                }}
              />
              <div className={styles.dropdownWrapper}>
                <Button href={Path.Dealer} text="Дилеры" />
              </div>

              <div className={styles.dropdownWrapper}>
                <Button href={Path.Home} text="Владельцам" />
              </div>
              <div className={styles.dropdownWrapper}>
                <Button href={Path.Contacts} text="Контакты" />
              </div>

              <div className={styles.dropdownWrapper}>
                <Button text="Мир Shineray" href={Path.MirShineray} />
                <div className={styles.dropdown_content}>
                  <a href={Path.AboutCompany}>О компании Shineray Group</a>
                  <a href={Path.AboutBelarus}>О нас и бренде Shineray</a>
                  <a href={Path.BecomeDealer}>Стать дилером</a>
                  <a href={Path.LegalInformation}>Юридическая информация</a>
                </div>
              </div>
              <div className={styles.dropdownWrapper}>
                <Button href={Path.News} text="Новости" />
              </div>

              <div
                className={`${styles.dropdownMenu}  ${dropDownCars ? styles.open : styles.closed}`}
                data-dropdown="menu-cars"
              >
                {headerData && <ModelCarsMenu data={headerData} />}
              </div>
            </nav>
          ) : (
            <nav className={styles.headerWrapper_header_buttonsBlock}>
              <IconButton
                size="large"
                edge="start"
                aria-label="open-mobile-menu"
                sx={{ mr: 2, color: "white" }}
                onClick={toggleMobileMenu}
              >
                {mobileMenu ? <Close /> : <MenuIcon />}
              </IconButton>
            </nav>
          )}
        </div>
        {mobileMenu && (
          <nav
            className={`${styles.mobileMenuWrapper} ${mobileMenu ? styles.mobileMenuOpen : styles.mobileMenuClose}`}
          >
            <Accordion className={styles.mobileMenuWrapper_accordionButton}>
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: "white" }} />}
                aria-controls="panel1-content"
                id="panel1-header"
                key={'models'}
              >
                Модельный ряд
              </AccordionSummary>
              <AccordionDetails sx={{ paddingBottom: "2rem" }}>
                {headerData &&
                  headerData.menu.automobile.map((cat, index) => (
                    <a
                      style={{
                        border:
                          index === headerData.menu.automobile.length - 1
                            ? "none"
                            : "",
                      }}
                      key={cat.name}
                      href={Path.Cars}
                      rel="nofollow"
                      className={styles.mobileMenuWrapper_accordionButton_link}
                    >
                      {cat.name}
                      <span />
                    </a>
                  ))}
              </AccordionDetails>
            </Accordion>
            <a
              href={Path.Dealer}
              key={'dealers'}
              rel="nofollow"
              className={styles.mobileMenuWrapper_button}
            >
              Дилеры
              <span />
            </a>
            <a key={'forOwners'} href={Path.Home} className={styles.mobileMenuWrapper_button}>
              Владельцам
              <span />
            </a>
            <a
              href={Path.Contacts}
              key={'contacts'}
              rel="nofollow"
              className={styles.mobileMenuWrapper_button}
            >
              Контакты
              <span />
            </a>
            <Accordion className={styles.mobileMenuWrapper_accordionButton}>
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: "white" }} />}
                aria-controls="panel1-content"
                id="panel1-header"
                key={'shineray-world'}
              >
                Мир Shineray
              </AccordionSummary>
              <AccordionDetails sx={{ paddingBottom: "2rem" }}>
                <a
                  key={"aboutCompany"}
                  href={Path.AboutCompany}
                  className={styles.mobileMenuWrapper_accordionButton_link}
                >
                  О компании Shineray Group
                  <span />
                </a>
                <a
                  key={"aboutBrand"}
                  href={Path.AboutBelarus}
                  className={styles.mobileMenuWrapper_accordionButton_link}
                >
                  О нас и бренде Shineray
                  <span />
                </a>
                <a
                  key={"becomeDelaer"}
                  href={Path.BecomeDealer}
                  className={styles.mobileMenuWrapper_accordionButton_link}
                >
                  Стать дилером
                  <span />
                </a>
                <a
                  key={'legalInfo'}
                  href={Path.LegalInformation}
                  style={{ border: "none" }}
                  className={styles.mobileMenuWrapper_accordionButton_link}
                >
                  Юридическая информация
                  <span />
                </a>
              </AccordionDetails>
            </Accordion>

            <a href={Path.News} className={styles.mobileMenuWrapper_button} key={'news'}>
              Новости
              <span />
            </a>
          </nav>
        )}
      </header>
    );
  },
);
