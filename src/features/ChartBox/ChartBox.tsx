import React from 'react';
import dayjs from 'dayjs';

import { ChartComponent } from './components/Chart/Chart';
import { DateRange } from './components/dateRange/DateRange';

import { useChartBoxActions, useChartBoxCalendarRange, useChartBoxData } from './ChartBox.state';

import s from './ChartBox.module.css';

const URL = 'https://gist.githubusercontent.com/SlepoRus/e4c30ec8b943db07ab7dfd17ef3a3c68/raw/992c0e1879c0a9bc53800122a84c74519b160dc4/payments.json';

export function ChartBox() {
  const { load, setRange } = useChartBoxActions();
  const data = useChartBoxData();
  const range = useChartBoxCalendarRange();


  React.useEffect(() => {
    load(URL);
  }, []);

  return (
    <div className={s.container}>
      <DateRange minDate={range[0]} maxDate={range[1]} onChange={setRange} />
      <div className={s.chart}>
        <ChartComponent source={data} />
      </div>
    </div>
  );
};
