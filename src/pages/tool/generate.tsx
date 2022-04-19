import React, { useState } from 'react';
import { Divider, Button, Form, Input } from 'antd';
import ContentHeader from '@/components/contentHeader';
import { PlusOutlined } from '@ant-design/icons';
import TronWeb from '@/utils/tronweb';

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

const GeneratePage: React.FC = () => {
  const [accountInfo, setAccountInfo] = useState<any>({
    privateKey: '',
    address: {},
  });

  React.useEffect(() => {
    generateFunc();
  }, []);

  const generateFunc = async () => {
    const accountInfo = await TronWeb.createAccount();
    console.log(accountInfo);
    setAccountInfo(accountInfo);
  };

  const handleGenerate = () => {
    generateFunc();
  };

  return (
    <>
      <ContentHeader breadcrumb={{ routes }} title="地址生成">
        该页面功能用于即时生成全新的波场钱包地址。
      </ContentHeader>
      <div className="main-container">
        <div className="tw-mb-3">
          <Button
            type="dashed"
            style={{ width: '600px' }}
            danger
            onClick={handleGenerate}
            icon={<PlusOutlined />}
          >
            重新生成
          </Button>
        </div>

        <Form layout="vertical">
          <Form.Item label="地址">
            <Input
              value={accountInfo.address.base58}
              readOnly
              style={{
                width: '600px',
              }}
            />
          </Form.Item>
          <Form.Item label="私钥">
            <Input
              value={accountInfo.privateKey}
              readOnly
              style={{
                width: '600px',
              }}
            />
          </Form.Item>
        </Form>
        <Divider dashed />
        <div>
          <h3>说明</h3>
          <ol>
            <li>
              该页面功能为纯前端地址生成方案，生成的数据不会进行任何后台存储。
            </li>
            <li>
              请妥善保管生成的地址私钥串，由私钥串泄漏引起的任何安全风险由商户自行承担。
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default GeneratePage;
