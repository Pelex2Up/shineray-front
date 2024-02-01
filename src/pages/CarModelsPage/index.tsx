import React, { FC } from 'react'
import styles from './CarModelsPage.module.scss'
import { HeaderSlider } from '../../components/HeaderCarousel'
import { CarItemCard } from '../../components/CarItemCard'

const ModelHeader = [{ image: 'https://www.shineray.com/upload/sort/1679365664565824.jpg' }]
const cars = [
  {
    id: 1,
    name: 'G01',
    image: 'https://www.shineray.com/upload/images/310_200/1678964537963553.jpg',
  },
  {
    id: 2,
    name: 'G01F',
    image: 'https://www.shineray.com/upload/images/310_200/1677226251780981.jpg',
  },
  {
    id: 3,
    name: 'G03',
    image: 'https://www.shineray.com/upload/images/310_200/1668999505403821.jpg',
  },
  {
    id: 4,
    name: 'G03F',
    image: 'https://www.shineray.com/upload/images/310_200/1678366216128336.jpg',
  },
]

export const CarModelsPage: FC = () => {
  return (
    <div className={styles.carsPageWrapper}>
      {/* <HeaderSlider images={ModelHeader} /> */}
      <div className={styles.carsPageWrapper_container}>
        <div className={styles.carsPageWrapper_container_leftNavMenu}>
          <h3 className={styles.carsPageWrapper_container_leftNavMenu_title}>Модельный ряд</h3>
          <ul>
            <li className={styles.carsPageWrapper_container_leftNavMenu_category}>SUV</li>
            <li className={styles.carsPageWrapper_container_leftNavMenu_category}>MPV</li>
            <li className={styles.carsPageWrapper_container_leftNavMenu_category}>Van</li>
          </ul>
        </div>
        <div className={styles.carsPageWrapper_container_rightModelsBlock}>
          {cars.map((car, index) => (
            <CarItemCard key={index} car={car} />
          ))}
        </div>
      </div>
    </div>
  )
}
