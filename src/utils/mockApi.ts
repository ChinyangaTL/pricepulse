import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { mockStockData } from "./mock";

const mock = new MockAdapter(axios);

mock.onGet(/quote/).reply(200, (config: { url: string }) => {
  const symbol = config.url?.split("=")[1]; // Extract symbol from URL
  const stock = mockStockData.find((s) => s.symbol === symbol);
  return [200, stock || {}];
});
