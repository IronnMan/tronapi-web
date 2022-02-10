const setItem = (key: string, val: any) => {
  window.localStorage.setItem(key, val);
};

const getItem = (key: string): string =>
  window.localStorage.getItem(key) as string;

const removeItem = (key: string) => {
  window.localStorage.removeItem(key);
};

export default {
  setItem,
  getItem,
  removeItem,
};
