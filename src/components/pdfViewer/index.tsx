import { FC } from "react";

export const PDFViewer: FC = () => {
  const pdfURL = `https://shineray.by/media/uploads/${window.location.href.split("uploads/")[1]}`;

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
      <object
        data={pdfURL}
        type="application/pdf"
        style={{
          width: "calc(100vw - 40px)", // Adjust padding as needed
          height: "auto",
          maxWidth: "100%", // Prevent horizontal overflow
          overflow: "hidden", // Hide any excess content
        }}
        title={"Shineray-PDF-viewer"}
      >
        PDF файлы не поддерживаются вашим браузером. Пожалуйста загрузите файл на ваше устройство, для просмотра.
      </object>
    </div>
  );
};
