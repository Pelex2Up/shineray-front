import { HeaderRespT } from "api/apiTypes"
import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export type ButtonT = DefaultButtonPropsType & {
  text: string | ReactNode
  children?: DetailedHTMLProps<HTMLAttributes<SVGElement>, SVGElement>
}

export interface ICarPreview {
  id: number
  image: string
  name: string
}

export type CarsCategoryT = {
  id: number
  description: string
  image: string
  name: string
  car_models: ICarPreview[]
}

export type HeaderT = {
  data: HeaderRespT
}

export type ISliderImage = {
  id: number
  name: string
  description: string
  image: string
  order: number
  slider: number
}

export interface ISlider {
  name: string
  description: string
  images: ISliderImage[]
}

export interface ICar {
  id: number
  slider_1: ISlider
  slider_2: ISlider
  order: number
  name: string
  description: string
  big_text_description: string
  active: boolean
  image: string
  image_xl: string
  header_image: string
  engine: string
  battery: string
  range: string
  transmission: string
  drive: string
  dimensions: string
  cargo_size: string
  seats: string
  certification_standart: string
  category: number
}