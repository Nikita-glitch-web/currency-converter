import type { ICurrencyService } from "./CurrencyServiceInterface";

export class ExchangeRateHostService implements ICurrencyService {
  private baseUrl = "http://api.exchangerate.host";
  private apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;

  private availableCurrencies = [
    "USD",
    "EUR",
    "GBP",
    "AUD",
    "CAD",
    "PLN",
    "MXN",
  ];

  async getSupportedCurrencies(): Promise<string[]> {
    return this.availableCurrencies;
  }

  async getExchangeRate(from: string, to: string): Promise<number> {
    if (from === to) return 1;

    const currencies = this.availableCurrencies
      .filter((cur) => cur !== from)
      .join(",");

    const url = `${this.baseUrl}/live?access_key=${this.apiKey}&source=${from}&currencies=${currencies}&format=1`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.success) {
      throw new Error("Failed to get exchange rate: " + JSON.stringify(data));
    }

    const key = from + to;
    const rate = data.quotes[key];

    if (!rate) {
      throw new Error(`Rate for ${key} not found in response`);
    }

    return rate;
  }
}
