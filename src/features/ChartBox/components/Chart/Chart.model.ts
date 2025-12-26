export type DailyValue = {
  date: Date,
  value: number,
}

export type Series = {
  label: string,
  data: DailyValue[]
}