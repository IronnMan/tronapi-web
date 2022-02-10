import React from 'react';
import { Card, Empty } from 'antd';
import { Area } from '@ant-design/charts';
import { COLOR } from '@/configs/enum';
import { formatThousand } from '@/utils/formater';

interface IProps {
  data: any;
}

const DATA_CATEGORY: any = {
  ALL: '所有',
  DONE: '已完成',
};

const ChartCount: React.FC<IProps> = (props) => {
  const { data } = props;

  const config = {
    data,
    smooth: false,
    height: 162,
    xField: 'date',
    yField: 'value',
    seriesField: 'category',
    color: ['#dedede', COLOR.GREEN],
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    yAxis: {
      label: {
        formatter: formatThousand,
      },
    },
    tooltip: {
      formatter: (item: any) => {
        return {
          name: DATA_CATEGORY[item.category],
          value: `${parseInt(item.value)} 笔`,
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
    areaStyle: () => {
      return {
        fillOpacity: 0.5,
      };
    },
  };

  return (
    <Card title="数量" bordered={false} className="tw-mb-3">
      {data && data.length ? (
        <Area {...config} />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Card>
  );
};

export default React.memo(ChartCount);
