import React, { useContext, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { DataContext } from '../context/DataContext';
import {  Card, Empty } from 'antd';
import { TITLES, DESCRIPTIONS } from '../constants/messages';

const StoreCharts = () => {
  const { stores } = useContext(DataContext);

  const insegnaCounts = useMemo(() => {
    const counts = stores.reduce((acc, store) => {
      if (store.insegna && typeof store.insegna === 'string') {
        acc[store.insegna] = (acc[store.insegna] || 0) + 1;
      }
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [stores]);

  const gruppoCounts = useMemo(() => {
    const counts = stores.reduce((acc, store) => {
      if (store.gruppo && typeof store.gruppo === 'string') {
        acc[store.gruppo] = (acc[store.gruppo] || 0) + 1;
      }
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [stores]);

  const insegnaOption = {
    title: { text: TITLES.STORES_PER_INSEGNA, left: 'center' },
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

  const gruppoOption = {
    title: { text: TITLES.STORES_PER_GRUPPO, left: 'center' },
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
    return <Empty description={DESCRIPTIONS.NO_STORE_DATA_CHARTS} />;
  }

  return (
   <div>
    <Card style={{ width: '100%', marginBottom: 32 }}>
      <ReactECharts option={insegnaOption} style={{ height: 300, width: '100%' }} />
    </Card>
    <Card style={{ width: '100%' }}>
      <ReactECharts option={gruppoOption} style={{ height: 300, width: '100%' }} />
    </Card>
  </div>
  );
};

export default StoreCharts;