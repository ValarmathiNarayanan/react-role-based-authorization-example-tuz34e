import React from 'react';
import { Bar } from 'react-chartjs-2';

export class ChartWithDynamicData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: []
    }
    this.chartInstance = null;
    this.onRef = this.onRef.bind(this);
  }

  componentDidMount() {
    this.setState({
      apiData: [12, 19, 3, 5, 2, 3]
    })
  }

  onRef(chart) {
    this.chartInstance = chart ? chart.chartInstance : null;
  }

  get data() {
    return ({
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '# of Votes',
        data: this.state.apiData,
        borderWidth: 1
      }]
    })
  }

  options = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      enabled: false,
    },
    hover: {
      animationDuration: 0,
      onHover: (e) => {
        const chartInstance = this.chartInstance;
        if (!chartInstance) {
          return;
        }

        if (chartInstance.getElementAtEvent) {
          const point = chartInstance.getElementAtEvent(e);
          e.target.style.cursor = point.length ? 'pointer' : 'default';
        }
      }
    },
    legend: {
      display: false
    },
    layout: {
      padding: {
        top: 24
      }
    },
    scales: {
      yAxes: [{
        display: false,
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: true,
        }
      }],
      xAxes: [{
        gridLines: {
          color: 'transparent',
          drawBorder: false,
          zeroLineColor: 'rgba(0, 0, 0, 0.5)'
        }
      }]
    }
  }


  render() {
    return (
      <div>
        <Bar
          data={this.data}
          options={this.options}
          ref={this.onRef}
        />
      </div>
    )
  }
}
