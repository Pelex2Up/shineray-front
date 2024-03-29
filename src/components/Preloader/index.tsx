import { FC } from "react";
import "./Preloader.css";

export const Preloader: FC = () => {
  return (
    <div className="preloaderWrapper">
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
