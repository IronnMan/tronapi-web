export default [
  {
    path: '/',
    component: '@/layout',
    flatMenu: true,
    routes: [
      {
        name: '首页',
        icon: 'home',
        path: '/',
        exact: true,
        component: '@/pages/home/index',
      },
      {
        name: '订单',
        icon: 'interaction',
        path: '/transaction',
        routes: [
          {
            name: '列表',
            path: '/transaction/list',
            exact: true,
            component: '@/pages/transaction/list',
          },
          {
            name: '统计',
            path: '/transaction/report',
            exact: true,
            component: '@/pages/transaction/report',
          },
          {
            name: '详情',
            hideInMenu: true,
            path: '/transaction/list/:id',
            component: '@/pages/transaction/detail',
          },
          { component: '@/pages/404' },
        ],
      },
      {
        name: '地址',
        icon: 'inbox',
        path: '/address',
        component: '@/pages/address/list',
      },
      {
        name: '充值',
        icon: 'shopping',
        path: '/recharge',
        component: '@/pages/recharge/list',
      },
      {
        name: '账单',
        icon: 'calendar',
        path: '/bill',
        component: '@/pages/bill/list',
      },
      {
        name: '设置',
        icon: 'setting',
        path: '/setting',
        component: '@/pages/setting/index',
      },
      {
        name: '工具',
        icon: 'tool',
        path: '/tool',
        routes: [
          {
            name: '订单测试',
            path: '/tool/test',
            layout: false,
            component: '@/pages/tool/test',
          },
          {
            name: '订单测试',
            path: '/tool/test/result',
            layout: false,
            hideInMenu: true,
            component: '@/pages/tool/testResult',
          },
          {
            name: '地址生成',
            path: '/tool/generate',
            layout: false,
            component: '@/pages/tool/generate',
          },
          { component: '@/pages/404' },
        ],
      },
      {
        name: '账户',
        path: '/account',
        hideInMenu: true,
        layout: false,
        routes: [
          {
            name: '登录',
            path: '/account/signin',
            component: '@/pages/account/signin',
          },
          {
            name: '注册',
            path: '/account/signup',
            component: '@/pages/account/signup',
          },
          {
            name: '安全校验',
            path: '/account/twofactor',
            component: '@/pages/account/twofactor',
          },
          {
            name: '修改密码',
            path: '/account/updatepwd',
            component: '@/pages/account/updatepwd',
          },
          { component: '@/pages/404' },
        ],
      },
      { component: '@/pages/404' },
    ],
  },
];
