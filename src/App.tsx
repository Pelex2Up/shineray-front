import React from 'react';
import styles from './App.module.scss'
import { Routes, Route } from 'react-router-dom'
import { Path } from './enum/PathE'
import { MainLayout } from './components/MainLayout'
import { HomePage } from './pages/HomePage'
import { CarModelsPage } from './pages/CarModelsPage'

export const App = () => {
  
  document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
  });
  
  return (
    <div className={styles.container}>
      <Routes>
        <Route path={Path.Home} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={Path.Cars} element={<CarModelsPage />} />
          <Route path={Path.ModelAuto} />
        </Route>
      </Routes>
    </div>
  )
}
