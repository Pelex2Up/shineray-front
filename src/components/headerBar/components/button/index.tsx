import React, { FC } from "react";
import styles from './defaultButton.module.scss'
import { ButtonT } from "types/componentTypes";

export const Button: FC<ButtonT> = ({ text, children, ...restProps }) => {
  return (
    <button {...restProps} className={`${styles.buttonWrapper} ${restProps.className}`}>
      {children}
      {text}
    </button>
  );
};