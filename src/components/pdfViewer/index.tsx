import { FC } from "react";
import styles from "./pdfViewer.module.scss";

export const PDFViewer: FC = () => {
  const pdfURL = `https://shineray.by/media/uploads/${window.location.href.split("uploads/")[1]}`;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <object
        data={pdfURL}
        type="application/pdf"
        className={styles.pdf}
        title={"Shineray-PDF-viewer"}
      >
        PDF файлы не поддерживаются вашим браузером. Пожалуйста загрузите файл
        на ваше устройство, для просмотра.
      </object>
    </div>
  );
};
