import { CarsCategoryT, ICar, ISlider } from "types/componentTypes"

export type HeaderRespT = {
    menu: {
        automobile: CarsCategoryT[]
    }
}

export type HomePageRespT = {
    body: {
        main_slider: ISlider,
        latest_news: [],
        car_models: ICar[]
    }
}