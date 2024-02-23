import { Breadcrumbs } from "@mui/material";
import { FC } from "react";
import styles from "./breadcrumbs.module.scss";

type BreadcrumbsT = {
  data: JSX.Element[];
};

export const BreadcrumbsComponent: FC<BreadcrumbsT> = ({ data }) => {
  return (
    <div className={styles.breadcrumbs}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {data}
      </Breadcrumbs>
    </div>
  );
};
