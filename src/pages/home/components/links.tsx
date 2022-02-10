import React from 'react';
import { Card, Avatar, Row, Col } from 'antd';
import { LINKS } from '@/configs/links';
import { COLOR } from '@/configs/enum';

import {
  CodeOutlined,
  GithubOutlined,
  RadarChartOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

const APP_LINKS = [
  {
    name: '接入文档',
    descr: '系统开发接入文档',
    url: LINKS.API,
    color: COLOR.GREEN,
    icon: CodeOutlined,
  },
  {
    name: '常见问题',
    descr: '有问题就会有答案',
    url: LINKS.FAQ,
    color: COLOR.ORANGE,
    icon: QuestionCircleOutlined,
  },
  {
    name: 'GitHub',
    descr: '项目开源地址',
    url: LINKS.GITHUB,
    color: COLOR.PINK,
    icon: GithubOutlined,
  },
  {
    name: 'Binance',
    descr: '中心化交易所',
    url: LINKS.BINANCE,
    color: COLOR.PURPLE,
    icon: RadarChartOutlined,
  },
];

const colProps = {
  xs: { span: 24 },
  md: { span: 12 },
  xl: { span: 6 },
};

const cardProps = {
  bordered: false,
  bodyStyle: { padding: 0 },
};

const Links: React.FC = () => {
  if (APP_LINKS && APP_LINKS.length > 0) {
    return (
      <Card title="导航" className="tw-mb-3" bordered={false}>
        <Row gutter={[15, 25]}>
          {APP_LINKS.map((link, index) => {
            return (
              <Col {...colProps} key={index}>
                <Card {...cardProps}>
                  <div className="tw-flex tw-items-center">
                    <Avatar
                      size={46}
                      icon={React.createElement(link.icon)}
                      style={{ backgroundColor: link.color }}
                    />
                    <div className="tw-ml-3">
                      <a href={link.url} target="_blank">
                        <h4 className="tw-mb-1 tw-text-base">{link.name}</h4>
                      </a>
                      <div className="tw-text-gray-500">{link.descr}</div>
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>
    );
  }

  return null;
};

export default React.memo(Links);
