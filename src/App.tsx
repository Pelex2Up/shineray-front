import styles from "./App.module.scss";
import { Routes, Route } from "react-router-dom";
import { Path } from "enum/PathE";
import { MainLayout } from "components/MainLayout";
import { HomePage } from "pages/HomePage";
import { CarModelsPage } from "pages/CarModelsPage";
import { AnimatePresence } from "framer-motion";
import { CarDetailsPage } from "pages/CarDetailsPage";
import { DealersPage } from "pages/DealersPage";
import { MirShinerayPage } from "pages/MirShinerayPage";
import { Preloader } from "components/Preloader";
import { AboutCompanyPage } from "pages/AboutCompanyPage";
import { RepresentativeOfficePage } from "pages/RepresentativeOfficePage";
import { ContactsPage } from "pages/ContactsPage";

export const App = () => {
  return (
    <div className={styles.container}>
      <AnimatePresence>
        <Routes>
          <Route path={Path.Home} element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={Path.Cars} element={<CarModelsPage />} />
            <Route path={Path.ModelAuto} element={<CarDetailsPage />} />
            <Route path={Path.Dealer} element={<DealersPage />} />
            <Route path={Path.MirShineray} element={<MirShinerayPage />} />
            <Route path={Path.AboutCompany} element={<AboutCompanyPage />} />
            <Route
              path={Path.AboutBelarus}
              element={<RepresentativeOfficePage />}
            />
            <Route path={Path.Contacts} element={<ContactsPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
};
