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

export type CategoryT = {
    id: number
    active: boolean
    order: number
    name: string
    description: string
    image: string
    car_models: ICar[]
}