import { FlightETAs } from "./FlightETAs";
import { LocalMarketAds } from './LocalMarketAds';
import { ModuleRunner } from "./ModuleRunner";
import { OrderETAs } from "./OrderETAs";
import { FleetETAs } from "./FleetETAs";
import { PostLM } from "./PostLM";
import { ShippingAds } from "./ShippingAds";
import { QueueLoad } from "./QueueLoad";

const runner = new ModuleRunner([
  new LocalMarketAds(),
  new FleetETAs(),
  new OrderETAs(),
  new FlightETAs(),
  new ShippingAds(),
  new PostLM(),
  new QueueLoad(),
]);
(function () {
  runner.loop()
})();
