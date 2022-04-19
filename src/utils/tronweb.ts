import TronWeb from '@/assets/js/TronWeb.js';

const createAccount = async () => {
  const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
  });

  return await tronWeb.createAccount();
};

export default {
  createAccount,
};
