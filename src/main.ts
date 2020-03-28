import { FlightplanETAs } from "./FlightplanETAs";
import { LocalMarketAds } from './LocalMarketAds';
import { ModuleRunner } from "./ModuleRunner";
import { OrderETAs } from "./OrderETAs";
import { ParseETAs } from "./ParseETAs";
import { PostLMPrice } from "./PostLMPrice";
import { ShippingAds } from "./ShippingAds";
import { SnipLongUsernamesInChat } from "./SnipLongUsernamesInChat";
import { OrderInventory } from "./OrderInventory";

const localMarketAds = new LocalMarketAds();
const parseETAs = new ParseETAs();
const orderETAs = new OrderETAs();
const flightplanETAs = new FlightplanETAs();
const snipLongUsernamesInChat = new SnipLongUsernamesInChat();
const shippingAds = new ShippingAds();
const orderInventory = new OrderInventory();

const runner = new ModuleRunner([
  localMarketAds, shippingAds, parseETAs,
  orderETAs, flightplanETAs, snipLongUsernamesInChat,
  orderInventory,
  new PostLMPrice()
]);
(function () {
  runner.loop()
})();
