import React, { useContext, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { DataContext } from '../context/DataContext';
import { Row, Col, Empty } from 'antd';

const StoreCharts = () => {
  const { stores } = useContext(DataContext);

  // Count stores per insegna, filter out invalid values
  const insegnaCounts = useMemo(() => {
    const counts = stores.reduce((acc, store) => {
      if (store.insegna && typeof store.insegna === 'string') {
        acc[store.insegna] = (acc[store.insegna] || 0) + 1;
      }
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [stores]);

  // Count stores per gruppo, filter out invalid values
  const gruppoCounts = useMemo(() => {
    const counts = stores.reduce((acc, store) => {
      if (store.gruppo && typeof store.gruppo === 'string') {
        acc[store.gruppo] = (acc[store.gruppo] || 0) + 1;
      }
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [stores]);

  // ECharts configuration for insegna chart
  const insegnaOption = {
    title: { text: 'Stores per Insegna', left: 'center' },
    xAxis: {
      type: 'category',
      data: insegnaCounts.map((c) => c.name),
      axisLabel: { rotate: 45, interval: 0 },
    },
    yAxis: { type: 'value', name: 'Store Count' },
    series: [
      {
        type: 'bar',
        data: insegnaCounts.map((c) => c.value),
        itemStyle: { color: '#1890ff' },
      },
    ],
    tooltip: { trigger: 'axis' },
  };

  // ECharts configuration for gruppo chart
  const gruppoOption = {
    title: { text: 'Stores per Gruppo', left: 'center' },
    xAxis: {
      type: 'category',
      data: gruppoCounts.map((c) => c.name),
      axisLabel: { rotate: 45, interval: 0 },
    },
    yAxis: { type: 'value', name: 'Store Count' },
    series: [
      {
        type: 'bar',
        data: gruppoCounts.map((c) => c.value),
        itemStyle: { color: '#52c41a' },
      },
    ],
    tooltip: { trigger: 'axis' },
  };

  if (insegnaCounts.length === 0 && gruppoCounts.length === 0) {
    return <Empty description="No store data available for charts" />;
  }

  return (
    <Row gutter={16} style={{ marginTop: '24px' }}>
      <Col xs={24} md={12}>
        <ReactECharts
          option={insegnaOption}
          style={{ height: '400px', width: '100%' }}
        />
      </Col>
      <Col xs={24} md={12}>
        <ReactECharts
          option={gruppoOption}
          style={{ height: '400px', width: '100%' }}
        />
      </Col>
    </Row>
  );
};

export default StoreCharts;