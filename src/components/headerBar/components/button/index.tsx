import { FC } from 'react'
import styles from './defaultButton.module.scss'
import { ButtonT } from 'types/componentTypes'
import { LinkButtonT } from 'components/common/Buttons'

export const ButtonModels: FC<ButtonT> = ({ text, children, ...restProps }) => {
  return (
    <button {...restProps} className={`${styles.buttonWrapper} ${restProps.className}`}>
      {children}
      {text}
    </button>
  )
}

export const Button: FC<LinkButtonT> = ({ text, children, ...restProps }) => {
  return (
    <a {...restProps} className={`${styles.buttonWrapper} ${restProps.className}`}>
      {children}
      {text}
    </a>
  )
}