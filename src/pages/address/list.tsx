import React from 'react';
import { Spin, Button } from 'antd';
import { useDispatch, useSelector } from 'umi';
import ContentHeader from '@/components/contentHeader';
import { AddressModelState } from '@/models/address';
import { FormAdd, ListData } from './components';
import { PlusOutlined } from '@ant-design/icons';

const routes = [
  {
    path: '/',
    breadcrumbName: '首页',
  },
  {
    path: '/address',
    breadcrumbName: '地址',
  },
];

const AddressListPage: React.FC = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    fetchList();
  }, []);

  const fetchList = () => {
    dispatch({
      type: 'address/getList',
    });
  };

  const {
    data_list: addressList,
    data_list_params: addressParams,
  }: AddressModelState = useSelector((state: any) => state.address);

  const loading = useSelector(
    (state: any) => state.loading.effects['address/getList'],
  );

  const onPageChange = (pageIndex: number) => {
    dispatch({
      type: 'address/setListParams',
      payload: {
        page_index: pageIndex,
      },
    });
    fetchList();
  };

  return (
    <>
      <ContentHeader
        breadcrumb={{ routes }}
        title="列表"
        extra={[
          <Button type="primary" icon={<PlusOutlined />}>
            添加　
          </Button>,
        ]}
      >
        请确保至少一条地址信息处于启用状态，否则无法发起订单收款。
      </ContentHeader>
      <div className="main-container">
        <Spin size="large" spinning={loading}>
          <ListData
            data={addressList}
            current={addressParams.page_index}
            onPageChange={onPageChange}
          />
        </Spin>
      </div>
      <FormAdd />
    </>
  );
};

export default AddressListPage;
