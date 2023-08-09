import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Graph = () => {
  const data = {
    labels: [...Array(5).keys()], // Labels from 0 to 9
    datasets: [
      {
        label: 'Graph of x^2',
        data: [...Array(5).keys()].map((x) => x ** 2), // y = x^2
        fill: false,
        borderColor: 'blue', // Line color
        pointBackgroundColor: function(context) {
          return context.dataIndex == 3 ? 'red' : 'blue'
        },
        pointBorderColor: function(context) {
          return context.dataIndex == 3 ? 'red' : 'blue'
        }
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    // maintainAspectRatio: false
  };
  

  return (
    <div style={{'width': '30vw'}}>
      <Line data={data} options={options}/>
    </div>
  );
};

export default Graph;
