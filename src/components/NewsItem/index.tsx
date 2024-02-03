import { FC } from 'react'
import styles from './NewsItem.module.scss'

interface INewsData {
  source: string
  imageUrl: string
  title: string
  description: string
  date: string
}

type NewsItemT = {
  data: INewsData
}

export const NewsItem: FC<NewsItemT> = data => {
  const { source, imageUrl, title, description, date } = data.data
  return (
    <div className={styles.container}>
      <img src={imageUrl} alt="News image" />
      <div className={styles.container_description}>
        <div className={styles.container_description_title}>{title}</div>
        <h1 className={styles.container_description_text}>
          {description.slice(0, 100)}
          {description.length > 100 ? '...' : ''}
        </h1>
      </div>
    </div>
  )
}
