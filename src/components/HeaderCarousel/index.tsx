import React, { FC } from 'react'
import Slider from 'react-slick'
import styles from './HeaderCarousel.module.scss'
import { ISliderImage } from 'types/componentTypes'

type HeaderSliderT = {
  images: ISliderImage[]
}

export const HeaderSlider: FC<HeaderSliderT> = ({ images }) => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  }

  return (
    <div className={styles.wrapper} id={'header-slider'}>
      {images.length > 1 ? (
        <Slider {...settings}>
          {images.map(({ image }, index) => (
            <img src={`http://93.177.124.158/media/${image}`} key={index} />
          ))}
        </Slider>
      ) : (
        <img className={styles.soloImage} src={images[0].image} loading="lazy" />
      )}
    </div>
  )
}
