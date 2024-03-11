// data { currency: '', amount: ''}
export const currencyFormatter = (data) => {
  return ((data.amount * 100) / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency
  });
};

export const stripeCurrencyFormatter = (data) => {
  return (data.amount / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency
  });
};

export const objectToArray = (obj) => {
  return Object.values(obj).map((value) => {
    console.log(value);
    return value;
  });
};

export const removeDuplicates = (arr) => {
  return [...new Set(arr)];
};

export const textTrimer = (text, count) => {
  return text.slice(0, count) + (text.length > count ? "..." : "");
};
