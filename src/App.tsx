import styles from "./App.module.scss";
import { Routes, Route } from "react-router-dom";
import { Path } from "enum/PathE";
import { MainLayout } from "components/MainLayout";
import { HomePage } from "pages/HomePage";
import { CarModelsPage } from "pages/CarModelsPage";
import { AnimatePresence } from "framer-motion";
import { CarDetailsPage } from "pages/CarDetailsPage";

export const App = () => {
  return (
    <div className={styles.container}>
      <AnimatePresence>
        <Routes>
          <Route path={Path.Home} element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={Path.Cars} element={<CarModelsPage />} />
            <Route path={Path.ModelAuto} element={<CarDetailsPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
};
