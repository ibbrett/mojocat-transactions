const rates = {
  "data": {
    "EUR": 0.9112301684,
    "JPY": 145.7399146449,
    "MXN": 16.9753123942,
    "USD": 1,
    "CRC": 522.74909
  }
};

const currencies = {
  "data": {
    "EUR": {
      "symbol": "€",
      "name": "Euro",
      "symbol_native": "€",
      "decimal_digits": 2,
      "rounding": 0,
      "code": "EUR",
      "name_plural": "Euros",
      "locale": "nl-NL"
    },
    "USD": {
      "symbol": "$",
      "name": "US Dollar",
      "symbol_native": "$",
      "decimal_digits": 2,
      "rounding": 0,
      "code": "USD",
      "name_plural": "US dollars",
      "locale": "en-US"
    },
    "JPY": {
      "symbol": "¥",
      "name": "Japanese Yen",
      "symbol_native": "￥",
      "decimal_digits": 0,
      "rounding": 0,
      "code": "JPY",
      "name_plural": "Japanese yen",
      "locale": "ja-JP"
    },
    "MXN": {
      "symbol": "MX$",
      "name": "Mexican Peso",
      "symbol_native": "$",
      "decimal_digits": 2,
      "rounding": 0,
      "code": "MXN",
      "name_plural": "Mexican pesos",
      "locale": "es-MX"
    },
    "CRC": {
      "symbol": "CR₡",
      "name": "Costa Rican Colón",
      "symbol_native": "₡",
      "decimal_digits": 2,
      "rounding": 0,
      "code": "CRC",
      "name_plural": "Costa Rican colóns",
      "locale": "es-CR"
    }
  }
};

const useCurrencyApi = () => {

  const getAmountInUSDollars = ( num ) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(num);
  }

  const getCurrencyAmount = ( num, symbol ) => {
    const formatter = new Intl.NumberFormat(currencies.data[symbol].locale, {
      style: 'currency',
      currency: symbol,
    });
    return formatter.format(num);
  }

  const getCurrencyName = ( symbol ) => {
      return currencies.data[symbol].name;
  }

  const getCurrencyRate = ( symbol ) => {
    return rates.data[symbol];
}

  return { getCurrencyAmount, getCurrencyName, getCurrencyRate, getAmountInUSDollars };

};

export { useCurrencyApi };
    