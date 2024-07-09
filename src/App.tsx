import styles from "./App.module.scss";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  generatePath,
} from "react-router-dom";
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
import { NewsPage } from "pages/NewsPage";
import { NewsDetailsPage } from "pages/NewsDetailsPage";
import { LegalInformationPage } from "pages/LegalInformationPage";
import { InfoElement } from "pages/LegalInformationPage/InfoElement";
import { ForOwnersPage } from "pages/ForOwners";
import { TechDocsPage } from "pages/TechDocsPage";
import { TechSupportPage } from "pages/TechSupportPage";
import { WarrantyPage } from "pages/WarrantyPage";
import { PDFViewer } from "components/pdfViewer";
import { NotFound404 } from "pages/NotFound";
import { useEffect } from "react";

export const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function hasOnlySlashes(url: string) {
    return /^\/\/+$/.test(url);
  }

  useEffect(() => {
    if (pathname.split("/")[1] !== "auto") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [pathname]);

  useEffect(() => {
    if (
      hasOnlySlashes(pathname) ||
      pathname === "/index.php" ||
      pathname === "/home.php" ||
      pathname === "/index.htm" ||
      pathname === "/home..htm"
    ) {
      navigate(generatePath(Path.Home));
    }
  });

  return (
    <div className={styles.container}>
      <AnimatePresence>
        <Routes>
          <Route path={Path.PDF} element={<PDFViewer />} />
          <Route path={Path.Home} element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={Path.Cars} element={<CarModelsPage />}>
              <Route index element={<CarModelsPage />} />
              <Route path={Path.CarsCategory} element={<CarModelsPage />} />
            </Route>

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
            <Route path={Path.Owners} element={<ForOwnersPage />} />
            <Route path={Path.TechDocs} element={<TechDocsPage />} />
            <Route path={Path.TechSupport} element={<TechSupportPage />} />
            <Route path={Path.Warranty} element={<WarrantyPage />} />
          </Route>
          <Route path={"*"} element={<NotFound404 />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};
