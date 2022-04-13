import React from 'react';
import { Card, Empty } from 'antd';
import { Area } from '@ant-design/charts';
import { COLOR } from '@/configs/enum';
import { formatThousand, formatAmount } from '@/utils/formater';

interface IProps {
  data: any;
}

const DATA_CATEGORY: any = {
  ALL: '所有',
  DONE: '已完成',
};

const ChartAmount: React.FC<IProps> = (props) => {
  const { data } = props;
  const config = {
    data,
    smooth: false,
    height: 162,
    xField: 'date',
    yField: 'value',
    seriesField: 'category',
    color: ['#dedede', COLOR.ORANGE],
    tooltip: {
      formatter: (item: any) => {
        return {
          name: DATA_CATEGORY[item.category],
          value: formatAmount(item.value),
        };
      },
    },
    legend: {
      itemName: {
        formatter: (text: string) => {
          return DATA_CATEGORY[text];
        },
      },
    },
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    yAxis: {
      label: {
        formatter: formatThousand,
      },
    },
    areaStyle: () => {
      return {
        fillOpacity: 0.5,
      };
    },
  };

  return (
    <Card title="金额" bordered={false} className="tw-mb-3">
      {data && data.length ? (
        <Area {...config} />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Card>
  );
};

export default React.memo(ChartAmount);
