import { render, screen } from "@testing-library/react";
import { CurrencyConverter } from "./CurrencyConverter";

jest.mock("../hooks/useCurrencyConverter", () => ({
  useCurrencyConverter: () => ({
    currencies: ["USD", "EUR", "GBP"],
    from: "USD",
    to: "EUR",
    amount: 10,
    result: 25,
    rate: 2.5,
    error: null,
    loading: false,
    setFrom: jest.fn(),
    setTo: jest.fn(),
    setAmount: jest.fn(),
  }),
}));

describe("CurrencyConverter", () => {
  test("renders component with initial data", () => {
    render(<CurrencyConverter />);

    expect(screen.getByText(/currency converter/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/from/i)).toHaveValue("USD");

    expect(screen.getByLabelText(/to/i)).toHaveValue("EUR");

    expect(screen.getByLabelText(/amount/i)).toHaveValue(10);

    expect(
      screen.getByText(/10 USD = 25.00 EUR \(Rate: 2.5000\)/i)
    ).toBeInTheDocument();
  });

  test("shows error message if error exists", () => {
    jest.mock("../hooks/useCurrencyConverter", () => ({
      useCurrencyConverter: () => ({
        currencies: [],
        from: "USD",
        to: "EUR",
        amount: 0,
        result: 0,
        rate: 0,
        error: "Failed to load exchange rate",
        loading: false,
        setFrom: jest.fn(),
        setTo: jest.fn(),
        setAmount: jest.fn(),
      }),
    }));

    render(<CurrencyConverter />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      /failed to load exchange rate/i
    );
  });

  test("loading spinner appears when loading", () => {
    jest.mock("../hooks/useCurrencyConverter", () => ({
      useCurrencyConverter: () => ({
        currencies: ["USD", "EUR"],
        from: "USD",
        to: "EUR",
        amount: 1,
        result: null,
        rate: 0,
        error: null,
        loading: true,
        setFrom: jest.fn(),
        setTo: jest.fn(),
        setAmount: jest.fn(),
      }),
    }));

    render(<CurrencyConverter />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
