import { FC } from "react";

export const PDFViewer: FC = () => {
  const pdfURL = `https://shineray.by/media/uploads/${window.location.href.split("uploads/")[1]}`;
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <iframe
        src={pdfURL}
        width="100%"
        height="100%"
        title={"Shineray-PDF-viewer"}
      />
    </div>
  );
};
