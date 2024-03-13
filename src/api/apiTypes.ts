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
  views: number;
  publication_date: string;
}

export type DealersPageT = {
  body: {
    page_header: IHeader;
    content: IDealer[];
  };
};

export type NewsPageT = {
  count: number;
  next: string;
  previous: string;
  results: {
    body: {
      page_header: IHeader;
      news: INews[];
      top_3: INews[];
    };
  };
};

export interface ILegalContent {
  active: boolean;
  content: string;
  created_date: string;
  id: number;
  order: number;
  title: string;
}

export type LegalInfoT = {
  body: {
    content: ILegalContent[];
    page_header: IHeader;
  };
};

export type OwnersPageT = {
  body: {
    page_header: IHeader;
    content: {
      warranty: {
        image_header: string;
        title: string;
      };
      maintenance: {
        image_header: string;
        title: string;
      };
      documentation: {
        image_header: string;
        title: string;
      };
    };
  };
};

export type CarsCategoryDocsT = {
  id: number;
  description: string;
  image: string;
  name: string;
  car_models: ICar[];
};

export type TechDocsResponseT = {
  body: {
    page_header: IHeader;
    content: CarsCategoryDocsT[];
  };
};

export type WarrantyDataT = {
  body: {
    page_header: IHeader;
    content: any;
    urls: {
      documentation: {
        image_header: string;
        title: string;
      };
      find_a_dealer: {
        image_header: string;
        title: string;
      };
      maintenance: {
        image_header: string;
        title: string;
      };
    };
  };
};
