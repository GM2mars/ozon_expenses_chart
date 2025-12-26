import dayjs from "dayjs";
import { create } from "zustand";


interface ChartBoxActions {
  load: (url: string) => Promise<void>;
  setRange: (range: string[]) => void;
};

interface ChartBoxState {
  source: { date: string, value: number }[];
  data: { date: string, value: number }[];
  calendarRange: string[];
  loading: boolean;

  actions: ChartBoxActions;
}

const useChartBoxState = create<ChartBoxState>((set, get) => ({
  source: [],
  data: [],
  calendarRange: ['', ''],
  loading: false,

  actions: {
    load: async (url: string) => {
      set({ loading: true });
      const res = await fetch(url).then(res => res.json());

      const minDate = dayjs(res[0].date).format('YYYY-MM-DD');
      const maxDate = dayjs(res[res.length - 1].date).format('YYYY-MM-DD');

      set({
        calendarRange: [minDate, maxDate],
        source: res,
        loading: false
      });
    },

    setRange: (range: string[]) => {
      if (!range[0] || !range[1]) return;

      const source = get().source;

      if (source.length === 0) return;

      const firstDate = dayjs(range[0]).format('M.D.YYYY');
      const lastDate = dayjs(range[1]).format('M.D.YYYY');

      let firstIndex = -1;
      let lastIndex = -1;

      for (let i = 0; i < source.length; i++) {
        if (source[i].date === firstDate && firstIndex === -1) {
          firstIndex = i;
        } else if (source[i].date === lastDate) {
          lastIndex = i;
          break;
        }
      }

      if (firstIndex !== -1 && lastIndex !== -1) {
        set({
          data: source.slice(firstIndex, lastIndex + 1)
        });
      }
    }
  }
}));

export const useChartBoxActions = () => useChartBoxState(state => state.actions);
export const useChartBoxData = () => useChartBoxState(state => state.data);
export const useChartBoxCalendarRange = () => useChartBoxState(state => state.calendarRange);
export const useChartBoxLoading = () => useChartBoxState(state => state.loading);
