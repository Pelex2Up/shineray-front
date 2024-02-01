import { FC } from 'react'
import styles from './CarItemCard.module.scss'
import { Card, CardContent, Typography } from '@mui/material'

type CardItemT = {
  car: {
    id: number
    name: string
    image: string
  }
}

export const CarItemCard: FC<CardItemT> = ({ car }) => {
  return (
    <Card sx={{ width: 260, borderRadius: '1rem' }} className={styles.autoCard}>
      <img src={car.image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
          {`Shineray ${car.name}`}
        </Typography>
        <div className={styles.autoCard_buttonsBlock}>
          <a className={styles.autoCard_buttonsBlock_detailsButton}>Подробнее</a>
        </div>
      </CardContent>
    </Card>
  )
}
