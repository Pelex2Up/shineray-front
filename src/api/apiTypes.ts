import { CarsCategoryT, ICar, ISlider } from "types/componentTypes";

export type HeaderRespT = {
  menu: {
    automobile: CarsCategoryT[];
  };
};

export type HomePageRespT = {
  body: {
    main_slider: ISlider;
    latest_news: INews[];
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

export interface IContactPhoneDealer {
  id: number;
  order: number;
  active: boolean;
  name: string;
  description: string;
  phone_number: string;
  mobile_operator: string;
}

export interface IEmail {
  id: number;
  order: number;
  active: boolean;
  name: string;
  description: string;
  email: string;
}

export interface IWorkingHour {
  id: number;
  order: number;
  active: boolean;
  day_of_week: number;
  opening_time: string;
  closing_time: string;
}

export interface IDealerDepartment {
  id: number;
  order: number;
  active: boolean;
  dealer: number;
  name: string;
  description: string;
  address: string;
  contact_phone: IContactPhoneDealer[];
  contact_email: IEmail[];
  working_hours: IWorkingHour[];
}

export interface IBranch {
  active: boolean;
  address: string;
  dealer: number;
  departments: IDealerDepartment[];
  description: string;
  latitude: number;
  longitude: number;
  name: string;
  new_cars: boolean;
  order: number;
  service_and_spare_parts: boolean;
  used_cars: boolean;
  working_hours: string;
}

export interface IDealer {
  id: number;
  branches: IBranch[];
  active: boolean;
  order: number;
  name: string;
  company_name: string;
  description: string;
  big_text_description: string;
  image_logo: string;
  image_main: string;
  image_xl: string;
  header_image: string;
  address_full: string;
  city: string;
  latitude: number;
  longitude: number;
  web_site: string;
}

export interface IHeader {
  id: number;
  created_date: string;
  image: string;
  page_name: string;
  title: string;
  description: string;
}

export interface INews {
  id: number;
  created_date: string;
  image: string;
  title: string;
  description: string;
  content: string;
  active: boolean;
}

export type DealersPageT = {
  body: {
    page_header: IHeader;
    content: IDealer[];
  };
};

export type NewsPageT = {
  body: {
    page_header: IHeader;
    news: INews[];
  };
};
