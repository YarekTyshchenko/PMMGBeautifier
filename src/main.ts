import { FlightplanETAs } from "./FlightplanETAs";
import { LocalMarketAds } from './LocalMarketAds';
import { ModuleRunner } from "./ModuleRunner";
import { OrderETAs } from "./OrderETAs";
import { ParseETAs } from "./ParseETAs";
import { PostLMPrice } from "./PostLMPrice";
import { ShippingAds } from "./ShippingAds";
import { SnipLongUsernamesInChat } from "./SnipLongUsernamesInChat";
import { SortInventory } from "./SortInventory";
import { PostLMButton } from "./PostLMButton";

const runner = new ModuleRunner([
  new LocalMarketAds(),
  new ParseETAs(),
  new OrderETAs(),
  new FlightplanETAs(),
  new SnipLongUsernamesInChat(),
  new ShippingAds(),
  new SortInventory(),
  new PostLMPrice(),
  new PostLMButton(),
]);
(function () {
  runner.loop()
})();
