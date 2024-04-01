import { FC } from "react";
import "./Preloader.css";

export const Preloader: FC = () => {
  return (
    <div
      className="preloaderWrapper"
      style={{
        position: "fixed",
        left: "0",
        bottom: "0",
        right: "0",
        top: "0",
        backgroundColor: "#ffffff",
        zIndex: "98",
        transition: "ease-in-out 0.3s",
      }}
    >
      <div className="loader rspin">
        <span className="c"></span>
        <span className="d spin">
          <span className="e"></span>
        </span>
        <span className="r r1"></span>
        <span className="r r2"></span>
        <span className="r r3"></span>
        <span className="r r4"></span>
      </div>
    </div>
  );
};
