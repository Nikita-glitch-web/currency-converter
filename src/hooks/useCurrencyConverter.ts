import { useState, useEffect } from "react";
import type { ICurrencyService } from "../services/CurrencyServiceInterface";
import { ExchangeRateHostService } from "../services/ExchangeRateHostService";

const service: ICurrencyService = new ExchangeRateHostService();

export function useCurrencyConverter() {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [rate, setRate] = useState(1);
  const [result, setResult] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    service
      .getSupportedCurrencies()
      .then(setCurrencies)
      .catch(() => setError("Failed to load currencies"));
  }, []);

  useEffect(() => {
    if (from && to) {
      if (from === to) {
        setRate(1);
        setResult(amount);
        setError(null);
        return;
      }

      setLoading(true);
      service
        .getExchangeRate(from, to)
        .then((r: number) => {
          setRate(r);
          setResult(amount * r);
          setError(null);
        })
        .catch(() => setError("Failed to load exchange rate"))
        .finally(() => setLoading(false));
    }
  }, [from, to, amount]);
  return {
    currencies,
    from,
    to,
    amount,
    result,
    rate,
    error,
    loading,
    setFrom,
    setTo,
    setAmount,
  };
}
