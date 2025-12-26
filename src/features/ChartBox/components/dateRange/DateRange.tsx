import React from "react";


interface DateRangeProps {
  minDate: string;
  maxDate: string;
  onChange: (value: string[]) => void;
};


export const DateRange = React.memo(({ minDate, maxDate, onChange }: DateRangeProps) => {
  const [selectedRange, setSelectedRange] = React.useState<string[]>([]);

  const selectDateStart = (e: any) => {
    setSelectedRange([e.target.value, selectedRange[1]]);
  };

  const selectDateEnd = (e: any) => {
    setSelectedRange([selectedRange[0], e.target.value]);
  };

  React.useEffect(() => {
    if (!selectedRange[0] || !selectedRange[1]) return;

    onChange(selectedRange);
  }, [selectedRange]);


  return (
    <div>
      <h2>{'Select date range'}</h2>
      <input type="date" min={minDate} max={maxDate} onChange={selectDateStart} />
      {' - '}
      <input type="date" min={selectedRange[0] || minDate} max={maxDate} onChange={selectDateEnd} />
    </div>
  );
});