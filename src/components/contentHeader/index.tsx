import React from 'react';
import { PageHeader } from 'antd';
import { Link } from 'umi';
import { PageHeaderProps } from 'antd/lib/page-header';

const breadRouteRender = (
  route: any,
  params: any,
  routes: any[],
  paths: any,
) => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={route.path}>{route.breadcrumbName}</Link>
  );
};

const ContentHeader: React.FC<PageHeaderProps> = (props) => {
  const breadcrumb = {
    ...props.breadcrumb,
    ...{
      itemRender: breadRouteRender,
    },
  };

  return (
    <PageHeader ghost={false} {...props} breadcrumb={breadcrumb}>
      {props.children}
    </PageHeader>
  );
};

export default ContentHeader;
