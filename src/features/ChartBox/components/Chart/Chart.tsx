import React from "react";
import { Chart, type AxisOptions } from "react-charts";

import type { DailyValue, Series } from "./Chart.model";
import { formatDate } from "./utils";


interface ChartComponentProps {
  source: { date: string, value: number }[]
};


export const ChartComponent = React.memo(({ source }: ChartComponentProps) => {
  const data: Series[] = [{
    label: 'expenses',
    data: source.map(el => ({ ...el, date: new Date(el.date) }))
  }];

  const primaryAxis = React.useMemo((): AxisOptions<DailyValue> => ({
    getValue: datum => datum.date,
    scaleType: 'time',
    formatters: {
      scale: (value: Date) => formatDate(value),
      tooltip: (value: Date) => formatDate(value),
      cursor: (value: Date) => formatDate(value),
    },
  }), []);

  const secondaryAxes = React.useMemo((): AxisOptions<DailyValue>[] => [{
    getValue: datum => datum.value,
    scaleType: 'linear',
  }], []);


  return (
    <Chart
      options={{
        data,
        primaryAxis,
        secondaryAxes,
      }}
    />
  );
});