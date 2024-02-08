import { DetailedHTMLProps, FC } from "react";
import styles from "./LinkButton.module.scss";

type LinkButtonT = DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  text: string;
};
export const LinkButton: FC<LinkButtonT> = ({ children, text, ...restProps }) => {
  return (
    <a {...restProps} className={`${styles.button} ${restProps.className}`}>
      {children}
      {text}
    </a>
  );
};
