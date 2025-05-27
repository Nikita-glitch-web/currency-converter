export interface ICurrencyService {
  getSupportedCurrencies(): Promise<string[]>;
  getExchangeRate(from: string, to: string): Promise<number>;
}
