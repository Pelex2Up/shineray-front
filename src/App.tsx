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
import { AboutCompanyPage } from "pages/AboutCompanyPage";
import { RepresentativeOfficePage } from "pages/RepresentativeOfficePage";
import { ContactsPage } from "pages/ContactsPage";
import { BecomeDealerPage } from "pages/BecomeDealerPage";
import { DealerDetailsPage } from "pages/DealerDetailsPage";
import { useScrollToTop } from "utils/scrollToTop";
import { NewsPage } from "pages/NewsPage";
import { NewsDetailsPage } from "pages/NewsDetailsPage";
import { LegalInformationPage } from "pages/LegalInformationPage";
import { InfoElement } from "pages/LegalInformationPage/InfoElement";

export const App = () => {
  useScrollToTop();

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
            <Route
              path={Path.LegalInformation}
              element={<LegalInformationPage />}
            >
              <Route index element={<></>} />
              <Route path={Path.InfoElement} element={<InfoElement />} />
            </Route>
            <Route path={Path.Contacts} element={<ContactsPage />} />
            <Route path={Path.BecomeDealer} element={<BecomeDealerPage />} />
            <Route path={Path.DealerDetail} element={<DealerDetailsPage />} />
            <Route path={Path.News} element={<NewsPage />} />
            <Route path={Path.NewsDetails} element={<NewsDetailsPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
};
