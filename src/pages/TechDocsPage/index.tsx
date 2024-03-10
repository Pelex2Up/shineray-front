/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { Link, Typography } from "@mui/material";
import { useLazyFetchTechDocsDataQuery } from "api/ownersService";
import { HeaderSlider } from "components/HeaderCarousel";
import { Preloader } from "components/Preloader";
import { BreadcrumbsComponent } from "components/breadcrumbs";
import { Path } from "enum/PathE";
import { FC, useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import styles from "./techDocsPage.module.scss";
import { CarElement } from "./CarElement";
import { LinkButton } from "components/common/Buttons";
import { PictureAsPdf } from "@mui/icons-material";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const themeUI = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "black",
          width: "100%",
          flexBasis: "content",
          whiteSpace: "nowrap",
          "&.Mui-selected": {
            color: "black",
            fontWeight: "bold",
          },
        },
      },
    },
  },
});

export const TechDocsPage: FC = () => {
  const [fetchData, { data: pageData, isFetching, isLoading }] =
    useLazyFetchTechDocsDataQuery();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [selectedCar, setSelectedCar] = useState<number>();
  const [currentDocs, setCurrentDocs] =
    useState<{ title: string; file: string }[]>();

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ py: 2, px: 1 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const getCarById = (carId: number) => {
    if (pageData) {
      pageData.body.content.map((category) => {
        category.car_models.map((car) => {
          if (car.id === carId) setCurrentDocs(car.pdf_files);
        });
      });
    }
  };

  useEffect(() => {
    if (selectedCar) {
      getCarById(selectedCar);
    }
  }, [selectedCar]);

  useEffect(() => {
    if (!pageData && !isLoading && !isFetching) {
      fetchData();
    }
  }, [fetchData, pageData, isFetching, isLoading]);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href={Path.Home}>
      Главная
    </Link>,
    <Link underline="hover" key="2" color="inherit" href={Path.Owners}>
      Владельцам
    </Link>,
    <Typography key="3" color="text.primary">
      {pageData?.body.page_header.title}
    </Typography>,
  ];

  if (!pageData || isFetching || isLoading) {
    return <Preloader />;
  }
  return (
    <ThemeProvider theme={themeUI}>
      <div className={styles.wrapper}>
        <HeaderSlider image={pageData.body.page_header.image} />
        <BreadcrumbsComponent data={breadcrumbs} />
        <div className={styles.wrapper_content}>
          <div className={styles.wrapper_content_title}>
            <h1>{pageData.body.page_header.title}</h1>
          </div>

          <Box sx={{ alignSelf: "flex-start" }}>
            <AppBar
              position="static"
              sx={{
                bgcolor: "white",
                borderRadius: "7px !important",
                padding: "0 0.5rem !important",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                variant="fullWidth"
                TabIndicatorProps={{
                  style: {
                    borderBottom: "2px solid #cf2626",
                  },
                }}
              >
                <Tab
                  sx={{ width: "max-content !important" }}
                  label="Все автомобили"
                  {...a11yProps(0)}
                />
                {pageData.body.content.map((element, index: number) => (
                  <Tab
                    key={element.id + "_" + index}
                    label={element.name}
                    {...a11yProps(index + 1)}
                  />
                ))}
              </Tabs>
            </AppBar>
          </Box>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
            style={{
              width: "100%",
            }}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              {pageData.body.content.map((cars, index) =>
                cars.car_models.map((element, indexEl) => (
                  <CarElement
                    selected={element.id === selectedCar}
                    onClick={() => setSelectedCar(element.id)}
                    key={indexEl + "-" + element.id}
                    car={element}
                  />
                )),
              )}
            </TabPanel>
            {pageData.body.content.map((tabContent, indexTab) => (
              <TabPanel
                value={value}
                index={indexTab + 1}
                dir={theme.direction}
              >
                {tabContent.car_models.map((element, indexEl) => (
                  <CarElement
                    selected={element.id === selectedCar}
                    key={indexEl + "-" + element.id + "tab"}
                    car={element}
                  />
                ))}
              </TabPanel>
            ))}
          </SwipeableViews>
          {currentDocs && (
            <div className={styles.wrapper_content_docs}>
              <div
                className={styles.wrapper_content_title}
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <h1>Доступная документация по выбранному авто:</h1>
              </div>
              {currentDocs.map((doc, index) => (
                <LinkButton
                  className={styles.techButton}
                  text={doc.title}
                  href={`https://dev.shineray.by/pdf/${doc.file}`}
                  target="_blank"
                  rel="norefferrer"
                >
                  <PictureAsPdf style={{ marginRight: "0.2rem" }} />
                </LinkButton>
              ))}
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};
