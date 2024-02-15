import { DetailedHTMLProps, FC } from "react";
import styles from "./LinkButton.module.scss";
import { ButtonT } from 'types/componentTypes'

export type LinkButtonT = DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  text: string;
};
export const LinkButton: FC<LinkButtonT> = ({ children, text, ...restProps }) => {
  return (
    <a {...restProps} className={` ${restProps.className} ${styles.button}`}>
      {children}
      {text}
    </a>
  );
};


export const CommonButton: FC<ButtonT> = ({ text, children, ...restProps }) => {
  return (
    <button {...restProps} className={` ${restProps.className} ${styles.button}`}>
      {children}
      {text}
    </button>
  )
}
