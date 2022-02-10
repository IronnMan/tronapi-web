const isBrowserHappy = () => {
  if ((window as any).attachEvent) {
    return false;
  } else {
    return true;
  }
};

export default { isBrowserHappy };
