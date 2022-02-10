import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {
    dark: false,
    compact: false,
    disableBabelPluginImport: true,
  },
  layout: {
    layout: 'side',
    navTheme: 'dark',
    colorWeak: false,
    contentWidth: 'fluid',
    menu: {
      autoClose: false,
    },
  },
  theme: {
    '@primary-color': '#25b864',
    'root-entry-name': 'variable',
  },
  routes,
  fastRefresh: {},
  ignoreMomentLocale: true,
  mfsu: false,
  hash: true,
  extraPostCSSPlugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'),
    require('autoprefixer'),
  ],
  proxy: {
    '/invoke': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
  },
  favicon: '/favicon.ico',
  dva: {
    immer: true,
    hmr: false,
  },
  webpack5: {},
  metas: [
    {
      name: 'keywords',
      content:
        'tronapi,波场api,波场接口,波场支付,波场回调,tron接口,tron支付,tron回调,usdt接口,usdt支付,usdt回调,USDT接口,USDT支付,USDT回调',
    },
    {
      name: 'description',
      content: '最佳 USDT.TRC20 收款接口服务',
    },
  ],
  define: {
    'process.env.APP_NAME': 'tronapi',
    'process.env.APP_LOGO': '/logo.png',
    'process.env.APP_SLOGAN': '最佳 USDT.TRC20 收款接口服务',
    'process.env.AES_KEY': 'tron_api',
    'process.env.SENTRY_KEY':
      'https://ff57a563173e40dead81a8da09fae735@o482649.ingest.sentry.io/6154164',
  },
  headScripts: [
    `window.$crisp=[];window.CRISP_WEBSITE_ID="286fe9d8-6c52-451c-88bc-03de6560ceb6";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
  ],
});
