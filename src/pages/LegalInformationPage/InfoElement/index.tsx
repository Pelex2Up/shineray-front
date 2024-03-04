import { useLazyFetchLegalInfoDataQuery } from "api/mirShinerayService";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { CircularProgress } from "@mui/material";

export const InfoElement: FC = () => {
  const params = useParams();
  const [fetchData, { data: info, isFetching }] =
    useLazyFetchLegalInfoDataQuery();

  useEffect(() => {
    if (params.infoId && !info) {
      fetchData(Number(params.infoId));
    }
  }, [params.infoId, info, fetchData]);

  if (!info || isFetching) {
    return <CircularProgress color="inherit" />;
  }

  return <div>{parse(info.content)}</div>;
};
