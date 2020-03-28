import { FlightplanETAs } from "./FlightplanETAs";
import { LocalMarketAds } from './LocalMarketAds';
import { OrderETAs } from "./OrderETAs";
import { ParseETAs } from "./ParseETAs";
import { ShippingAds } from "./ShippingAds";
import { Sidebar } from "./Sidebar";
import { SnipLongUsernamesInChat } from "./SnipLongUsernamesInChat";
import { genericCleanup } from "./util";

const localMarketAds = new LocalMarketAds();
const parseETAs = new ParseETAs();
const orderETAs = new OrderETAs();
const flightplanETAs = new FlightplanETAs();
const snipLongUsernamesInChat = new SnipLongUsernamesInChat();
const shippingAds = new ShippingAds();
const sidebar = new Sidebar();

const modules = [
  sidebar, localMarketAds, shippingAds, parseETAs,
  orderETAs, flightplanETAs, snipLongUsernamesInChat
];
(function () {
    window.setInterval(() => {
      // @TODO: Move cleanup into individual modules
      genericCleanup();
      modules.map(module => module.cleanup());
      modules.map(module => module.run());
    }, 1000);
  }
)();
