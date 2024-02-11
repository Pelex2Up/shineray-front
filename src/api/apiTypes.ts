import { CarsCategoryT, ICar, ISlider } from "types/componentTypes";

export type HeaderRespT = {
  menu: {
    automobile: CarsCategoryT[];
  };
};

export type HomePageRespT = {
  body: {
    main_slider: ISlider;
    latest_news: [];
    car_models: ICar[];
  };
};

export type CategoryT = {
  id: number;
  active: boolean;
  order: number;
  name: string;
  description: string;
  image: string;
  car_models: ICar[];
};

export type ModelsPageT = {
  body: {
    categories: CategoryT[];
    page_header: {
      image: string;
    };
    car_models_page: {
      id: string;
      title: string;
      description: string;
      content: string;
      image: string;
    };
  };
};

export type ContactsT = {
  body: {
    page_header: {
      id: number;
      created_date: string;
      image: string;
      page_name: string;
      title: string;
      description: string;
    };
    content: {
      id: number;
      title: string;
      description: string;
      content: string;
      image: string;
      form_image_background: string;
      form_image: string;
    };
  };
};
