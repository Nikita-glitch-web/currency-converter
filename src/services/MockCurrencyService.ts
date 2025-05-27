import type { ICurrencyService } from "./CurrencyServiceInterface";

export class MockCurrencyService implements ICurrencyService {
  private rates: Record<string, number> = {
    "USD-EUR": 0.92,
    "EUR-USD": 1.09,
    "USD-UAH": 39,
    "UAH-USD": 0.025,
    "EUR-UAH": 42,
    "UAH-EUR": 0.023,
  };

  private currencies = ["USD", "EUR", "UAH"];

  async getSupportedCurrencies(): Promise<string[]> {
    return this.currencies;
  }

  async getExchangeRate(from: string, to: string): Promise<number> {
    const key = `${from}-${to}`;
    return this.rates[key] ?? 1;
  }
}
