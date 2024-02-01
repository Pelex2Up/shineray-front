import { FC, useState } from 'react'
import styles from './homePage.module.scss'
import { Carousel } from '../../components/Carousel'
import { HeaderSlider } from '../../components/HeaderCarousel'
import { NewsItem } from '../../components/NewsItem'
import { useFetchHomePageDataQuery } from '../../api/homePageService'

const News = [
  {
    source: 'source',
    imageUrl: 'https://www.shineray.com/upload/news/1697181377223443.jpg',
    title: 'Shineray Motors Its Presence in Uzbek Market with Debut of New Generation Product',
    description: `On September 26, the Shineray Motors Brand Launch and T3 Debut Event was held at the NAVRO'Z Hotel in Tashkent, the capital of Uzbekistan. Media representatives and distinguished guests from various sectors of Uzbek society witnessed this historic moment for Shineray.`,
    date: 'date',
  },
  {
    source: 'source',
    imageUrl: 'https://www.shineray.com/upload/news/1700535542272496.jpg',
    title: `China's SWM will hit the road in December`,
    description: `China's Automotive Giant Shineray Group's Italian brand SWM will enter the Turkish market`,
    date: 'date',
  },
  {
    source: 'source',
    imageUrl: 'https://www.shineray.com/upload/news/1700535016462634.jpg',
    title: 'Shineray Forges Official Partnership with Inter to Boost Its Globalization!',
    description:
      'On September 29, 2023, Shineray Motors (Shineray) andInter Milan Football Club(Inter) officially announced their official partnership in Milan, Italy. Shineray has become the official global car partner of Inter. Shineray Director Xie Yong, Inter CEO Alessandro Antonello, and Inter legend Fabio Galante attended the signing ceremony, to witness this historic moment. This marks the second time Shineray has partnered with Inter since their first official strategic cooperation in 2017. The collaboration is a win-win and mutually beneficial prospect. Shineray stated that the partnership would further enhance its global influence, boost its international business strategy, and accelerate its brand-building process.',
    date: 'date',
  },
  {
    source: 'source',
    imageUrl: 'https://www.shineray.com/upload/product/1677031677823980.jpg',
    title: 'title',
    description: 'description',
    date: 'date',
  },
]

export const HomePage: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { data: HomePageData } = useFetchHomePageDataQuery()

  const handleClickModel = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className={styles.container}>
      {HomePageData && <HeaderSlider images={HomePageData.body.main_slider.images} />}
      <div className={styles.container_carSelector}>
        <p className={styles.container_carSelector_title}>Модели SHINERAY</p>
        <div className={styles.container_carSelector_models}>
          {HomePageData?.body.car_models.map(({ name }, index) => (
            <span
              className={`${styles.container_carSelector_models_carModel} ${
                currentIndex === index ? `${styles.container_carSelector_models_carModel_active}` : ''
              }`}
              key={index}
              onClick={() => handleClickModel(index)}
            >
              {name}
            </span>
          ))}
        </div>
        <div className={styles.container_carSelector_modelPreview}>
          {HomePageData && <Carousel currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} data={HomePageData.body.car_models} />}

          <span className={styles.modelCarDetail} key={currentIndex}>
            Подробнее о модели
          </span>
        </div>
        <div className={styles.newsWrapper}>
          <p className={styles.container_news_title}>Новости</p>
          <div className={styles.container_news}>
            {News.slice(0, 3).map((data, index) => (
              <NewsItem data={data} key={index} />
            ))}
            <a className={styles.moreButton}>Еще...</a>
          </div>
        </div>
      </div>
    </div>
  )
}
