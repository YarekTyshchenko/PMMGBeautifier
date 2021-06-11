import { FlightplanETAs } from "./FlightplanETAs";
import { LocalMarketAds } from './LocalMarketAds';
import { ModuleRunner } from "./ModuleRunner";
import { OrderETAs } from "./OrderETAs";
import { ParseETAs } from "./ParseETAs";
import { PostLM } from "./PostLM";
import { ShippingAds } from "./ShippingAds";
import { QueueLoad } from "./QueueLoad";
import { CXOS } from "./CXOS";

const runner = new ModuleRunner([
  new LocalMarketAds(),
  new ParseETAs(),
  new OrderETAs(),
  new FlightplanETAs(),
  new ShippingAds(),
  new PostLM(),
  new QueueLoad(),
  new CXOS(),]);
(function () {
  runner.loop()
})();
