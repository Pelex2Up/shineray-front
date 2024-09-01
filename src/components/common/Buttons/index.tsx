import { DetailedHTMLProps, FC } from "react";
import styles from "./LinkButton.module.scss";
import { ButtonT } from 'types/componentTypes'
import { IconButton, Tooltip } from "@mui/material";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

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

export const ContactDealerButton: FC<ButtonT> = ({ text, ...restProps }) => {
  return <Tooltip title={text}>
    <IconButton onClick={restProps.onClick}>
      <LocalPostOfficeIcon />
    </IconButton>
  </Tooltip>
}