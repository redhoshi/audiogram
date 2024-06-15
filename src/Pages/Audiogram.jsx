import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import {Spacer} from '@chakra-ui/react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AudiogramChart = ({ data }) => {
  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Frequency (Hz)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Hearing Level (dB)',
        },
        reverse: true, // 上方向に行くほど聴力レベルが高くなる
        suggestedMin: -10,
        suggestedMax: 120,
      },
    },
  };

  const chartData = {
    labels: ['125', '250', '500', '1000', '2000', '4000', '8000'],
    datasets: [
      {
        label: 'Left Ear',
        data: data.leftEar,
        borderColor: 'blue',
        backgroundColor: 'blue',
        fill: false,
      },
      {
        label: 'Right Ear',
        data: data.rightEar,
        borderColor: 'red',
        backgroundColor: 'red',
        fill: false,
      },
    ],
  };

  return <Line options={options} data={chartData} />;
};

function Audiogram () {
  const audiogramData = {
    leftEar: [10, 20, 15, 10, 5, 10, 15],
    rightEar: [15, 25, 20, 15, 10, 15, 20],
  };

  return (
    <div
      style={{
        width: '100%',
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        border: '0.5px solid gray',
        boxSizing: 'border-box',
        backgroundColor: '#EDF2F7', // 灰色の背景色
      }}
    >
      <AudiogramChart data={audiogramData} />
    </div>
  );
};

export default Audiogram;
 {/**padding: '20vh'} */}