import React from 'react';
import ContentHeader from '@/components/contentHeader';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';

const routes = [
  {
    path: '/',
    breadcrumbName: '首页',
  },
  {
    path: '/tool/test',
    breadcrumbName: '工具',
  },
];

const WalletConnectPage: React.FC = () => {
  const initer = () => {
    const connector = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org',
      qrcodeModal: QRCodeModal,
    });

    // 检查连接是否已经建立
    if (!connector.connected) {
      // 创建会话
      connector.createSession();
    }

    // 订阅连接事件
    connector.on('connect', (error, payload) => {
      if (error) {
        throw error;
      }
      // 连接成功后会返回钱包帐号和链ID
      const { accounts, chainId } = payload.params[0];

      console.log('connect');
      console.log(accounts, chainId);

      // 调用方法， 详细介绍请访问https://docs.walletconnect.com/1.0/client-api
      // 发送交易方法示例
    });

    connector.on('session_update', (error, payload) => {
      if (error) {
        throw error;
      }
      const { accounts, chainId } = payload.params[0];

      console.log('session_update');
      console.log(accounts, chainId);
    });

    connector.on('disconnect', (error, payload) => {
      if (error) {
        throw error;
      }
    });
  };

  React.useEffect(() => {
    initer();
  }, []);

  return (
    <>
      <ContentHeader breadcrumb={{ routes }} title="订单测试"></ContentHeader>
      <div className="main-container">wallet connect</div>
    </>
  );
};

export default WalletConnectPage;
