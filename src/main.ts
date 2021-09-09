import { FlightplanETAs } from "./FlightplanETAs";
import { LocalMarketAds } from './LocalMarketAds';
import { ModuleRunner } from "./ModuleRunner";
import { ProdLine } from "./ProdLine";
import { ParseETAs } from "./ParseETAs";
import { PostLM } from "./PostLM";
import { QueueLoad } from "./QueueLoad";
import { CXFX } from "./CXFX";
import { FIN } from "./FIN";

const runner = new ModuleRunner([
    new LocalMarketAds(),
    new ParseETAs(),
    new ProdLine(),
    new FlightplanETAs(),
    new PostLM(),
    new QueueLoad(),
    new CXFX(),
    new FIN(),
]);
(function () {
  runner.loop()
})();
