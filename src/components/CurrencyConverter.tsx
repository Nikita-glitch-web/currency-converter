import {
  Box,
  Typography,
  TextField,
  MenuItem,
  CircularProgress,
  Paper,
  Alert,
} from "@mui/material";
import { useCurrencyConverter } from "../hooks/useCurrencyConverter";

export const CurrencyConverter = () => {
  const {
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
  } = useCurrencyConverter();

  return (
    <Paper elevation={3} sx={{ maxWidth: 500, margin: "auto", p: 4, mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Currency Converter
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          select
          label="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          fullWidth
        >
          {currencies.map((cur) => (
            <MenuItem key={cur} value={cur}>
              {cur}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          fullWidth
        >
          {currencies.map((cur) => (
            <MenuItem key={cur} value={cur}>
              {cur}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
          fullWidth
          inputProps={{ min: 0 }}
        />

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && result !== 0 && !error && (
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="h4" fontWeight="bold">
              {amount} {from} = {result.toFixed(2)} {to}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, fontStyle: "italic" }}
            >
              1 {from} = {rate.toFixed(4)} {to}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};
