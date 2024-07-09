import { HeaderRespT } from "api/apiTypes";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
} from "react";

export type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type ButtonT = DefaultButtonPropsType & {
  text: string | ReactNode;
  children?: DetailedHTMLProps<HTMLAttributes<SVGElement>, SVGElement>;
};

export type ICarPreview = ICar

export type CarsCategoryT = {
  id: number;
  description: string;
  image: string;
  name: string;
  car_models: ICarPreview[];
};

export type HeaderT = {
  data: HeaderRespT;
};

export type ISliderImage = {
  id: number;
  url: string;
  name: string;
  description: string;
  image: string;
  order: number;
  slider: number;
};

export interface ISlider {
  name: string;
  description: string;
  images: ISliderImage[];
}

export interface ICar {
  brand: string;
  id: number;
  slider_1: ISlider;
  slider_2: ISlider;
  title: string;
  order: number;
  name: string;
  description: string;
  big_text_description: string;
  active: boolean;
  image: string;
  image_xl: string;
  header_image: string;
  engine: string;
  battery: string;
  range: string;
  transmission: string;
  drive: string;
  dimensions: string;
  cargo_size: string;
  seats: string;
  certification_standard: string;
  category: number;
  tech_pdf: string;
  pdf_files: {
    title: string;
    file: string;
  }[];
}

export type IAbout = {
  id: number;
  slider_1: ISlider;
  slider_2: ISlider;
  create_date: string;
  image_header: string;
  image_small_header: string;
  title: string;
  description: string;
  content_1: string;
  image_top_content: string;
  content_2: string;
};

export type IHistory = {
  active: boolean;
  create_date: string;
  event_date: string;
  id: number;
  image: string;
  text: string;
  title: string;
};

export type AboutCompanyT = {
  body: {
    about_company: IAbout;
    histories: IHistory[];
  };
};
