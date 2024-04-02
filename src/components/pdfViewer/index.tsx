import { FC } from "react";

export const PDFViewer: FC = () => {
  const pdfURL = `https://shineray.by/media/uploads/${window.location.href.split("uploads/")[1]}`;

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <object
        data={pdfURL}
        type="application/pdf"
        style={{ width: "100%", height: "100%" }}
        title={"Shineray-PDF-viewer"}
      >
        PDF файлы не поддерживаются вашим браузером. Пожалуйста загрузите файл на ваше устройство, для просмотра.
      </object>
    </div>
  );
};
