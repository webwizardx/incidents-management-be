export type ChartData = {
  label: string;
  data: [
    {
      label: string;
      data: number;
    },
  ];
};

export type ChartDataMap = Record<string, ChartData>;
