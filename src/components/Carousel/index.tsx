import { FC, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Carousel.module.scss'
import ArrowCircleRightSharpIcon from '@mui/icons-material/ArrowCircleRightSharp'
import { ArrowCircleLeftSharp } from '@mui/icons-material'
import { ICar } from 'types/componentTypes'

type CarouselT = {
  data: ICar[]
  currentIndex: number
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
}

export const Carousel: FC<CarouselT> = ({ data, currentIndex, setCurrentIndex }) => {
  const [direction, setDirection] = useState('left')

  const handleNext = () => {
    setDirection('right')
    setCurrentIndex(prevIndex => (prevIndex + 1 === data.length ? 0 : prevIndex + 1))
  }

  const handlePrevious = () => {
    setDirection('left')

    setCurrentIndex(prevIndex => (prevIndex - 1 < 0 ? data.length - 1 : prevIndex - 1))
  }

  const slideVariants = {
    hiddenRight: {
      x: '100%',
      opacity: 1,
    },
    hiddenLeft: {
      x: '-100%',
      opacity: 1,
    },
    visible: {
      x: '0',
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 1,
      x: direction === 'right' ? '-100%' : '100%',
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className={styles.carouselWrapper}>
      <AnimatePresence>
        <motion.img
          key={currentIndex}
          src={`http://93.177.124.158/media/${data[currentIndex].image}`}
          variants={slideVariants}
          loading="lazy"
          initial={direction === 'right' ? 'hiddenRight' : 'hiddenLeft'}
          animate="visible"
          exit="exit"
        />
      </AnimatePresence>
      <div className={styles.carouselWrapper_slide_direction}>
        <div className={styles.carouselWrapper_left} onClick={handlePrevious}>
          <ArrowCircleLeftSharp
            sx={{
              width: '2rem',
              height: '2rem',
              color: 'black',
              transition: 'ease-in 0.2s',
              ':hover': 'color: #cf2626',
            }}
          />
        </div>
        <div className={styles.carouselWrapper_right} onClick={handleNext}>
          <ArrowCircleRightSharpIcon sx={{ width: '2rem', height: '2rem', color: 'black', transition: 'ease-in 0.2s', ':hover': 'color: #cf2626' }} />
        </div>
      </div>
    </div>
  )
}
