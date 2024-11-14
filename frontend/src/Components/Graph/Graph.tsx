import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip, Legend } from 'chart.js';
import { Button } from 'react-bootstrap';
import './Styles/Graph.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip, Legend);

interface ComparisonData {
  cryptoData?: number[];
  stockData?: number[];
  labels: string[];
}

interface GraphProps {
  mockData: Record<string, ComparisonData>;
  isComparisonDone: boolean;
  isCrypto: boolean;
  ratioData?: number[];
}

const timeFrames = ['1W', '1M', '5M', '1Y', '5Y', 'MAX'] as const;

const getDateRange = (timeFrame: typeof timeFrames[number]) => {
  const endDate = new Date();
  let startDate = new Date();

  switch (timeFrame) {
    case '1W':
      startDate.setDate(endDate.getDate() - 7);
      break;
    case '1M':
      startDate.setMonth(endDate.getMonth() - 1);
      break;
    case '5M':
      startDate.setMonth(endDate.getMonth() - 5);
      break;
    case '1Y':
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
    case '5Y':
      startDate.setFullYear(endDate.getFullYear() - 5);
      break;
    case 'MAX':
      startDate.setFullYear(endDate.getFullYear() - 5);
      break;
  }

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return {
    start: startDate.toLocaleDateString('en-GB', options),
    end: endDate.toLocaleDateString('en-GB', options),
  };
};

export default function Graph({ mockData, isComparisonDone, isCrypto, ratioData = [] }: GraphProps) {
  const [timeFrame, setTimeFrame] = useState<typeof timeFrames[number]>('1W');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const { cryptoData, stockData, labels } = mockData[timeFrame];
    const { start, end } = getDateRange(timeFrame);

    let chartData;

    if (isComparisonDone) {
      chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Cryptocurrency',
            data: cryptoData,
            borderColor: 'rgba(13,154,131,255)',
            backgroundColor: 'rgba(233,244,241,0.5)',
            fill: true,
          },
          {
            label: 'Stock',
            data: stockData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255,177,180, 0.5)',
            fill: true,
          },
          {
            label: 'Stock to Crypto Ratio',
            data: ratioData,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(173, 216, 230, 0.5)',
            fill: true,
          },
        ],
      };
    } else {
      chartData = {
        labels: labels,
        datasets: isCrypto
          ? [
              {
                label: 'Cryptocurrency',
                data: cryptoData,
                borderColor: 'rgba(13,154,131,255)',
                backgroundColor: 'rgba(233,244,241,0.5)',
                fill: true,
              },
            ]
          : [
              {
                label: 'Stock',
                data: stockData,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255,177,180, 0.5)',
                fill: true,
              },
            ],
      };
    }

    setData(chartData);
  }, [mockData, timeFrame, isComparisonDone, isCrypto, ratioData]);

  return (
    <div>
      <h5 className="text-center mb-3">{`${getDateRange(timeFrame).start} - ${getDateRange(timeFrame).end}`}</h5>
      {data && <Line data={data} />}
      <div className="time-frame-buttons d-flex justify-content-center mt-3">
        {timeFrames.map((timeFrameOption) => (
          <Button
            key={timeFrameOption}
            className={`mx-1 ${timeFrame === timeFrameOption ? 'time-frame-button-selected' : 'time-frame-button'}`}
            onClick={() => setTimeFrame(timeFrameOption)}
            disabled={timeFrameOption !== '1W'}
          >
            {timeFrameOption}
          </Button>
        ))}
      </div>
    </div>
  );
}