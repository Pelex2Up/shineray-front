import { useLocation } from "react-router-dom";

export enum Path {
  Home = "/",
  Cars = "/auto/",
  ModelAuto = "/auto/:carModel",
  Dealer = "/dealers/",
  MirShineray = "/shineray-world/",
  AboutCompany = "/shineray-world/about/",
  CompanyHistory = "/shineray-world/history/",
  LegalInformation = "/shineray-world/legal-information/",
}
