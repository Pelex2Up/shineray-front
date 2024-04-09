import { FC } from "react";
import styles from "./pdfViewer.module.scss";

export const PDFViewer: FC = () => {
  const pdfURL = `https://shineray.by/media/uploads/${window.location.href.split("uploads/")[1]}`;

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
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
        <p>
          PDF файлы не поддерживаются вашим браузером. Пожалуйста загрузите файл
          на ваше устройство, для просмотра.{" "}
          <a href={pdfURL.split("https://shineray.by")[1]} download>
            Ссылка для скачивания
          </a>
        </p>
      </object>
    </div>
  );
};
