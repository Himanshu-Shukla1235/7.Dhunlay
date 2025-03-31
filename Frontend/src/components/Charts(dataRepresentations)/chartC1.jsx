// bar and the line chart 
import { useEffect } from "react";
import Chart from "chart.js/auto";
import "./chartC1.css";

const ChartComponent = () => {
  useEffect(() => {
    const initChart = (id, type, data, options) => {
      const ctx = document.getElementById(id);
      if (ctx && !ctx.getAttribute("data-chart-initialized")) {
        new Chart(ctx, { type, data, options });
        ctx.setAttribute("data-chart-initialized", "true");
      }
    };

    const lineChartData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Sales ($)",
          fill: true,
          backgroundColor: "transparent",
          borderColor: "#6366F1",
          data: [2115, 1562, 1584, 1892, 1487, 2223, 2966, 2448, 2905, 3838, 2917, 3327],
        },
        {
          label: "Orders",
          fill: true,
          backgroundColor: "transparent",
          borderColor: "#adb5bd",
          borderDash: [4, 4],
          data: [958, 724, 629, 883, 915, 1214, 1476, 1212, 1554, 2128, 1466, 1827],
        },
      ],
    };

    const barChartData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Last year",
          backgroundColor: "#6366F1",
          data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
          barPercentage: 0.75,
          categoryPercentage: 0.5,
        },
        {
          label: "This year",
          backgroundColor: "#DEE2E6",
          data: [69, 66, 24, 48, 52, 51, 44, 53, 62, 79, 51, 68],
          barPercentage: 0.75,
          categoryPercentage: 0.5,
        },
      ],
    };

    initChart("chartjs-line", "line", lineChartData, { maintainAspectRatio: false });
    initChart("chartjs-bar", "bar", barChartData, { maintainAspectRatio: false });
  }, []);

  return (
    <div className="charts-container">
      <div className="chart-card">
        <h5 className="chart-title">Line Chart</h5>
        <h6 className="chart-subtitle">A line chart plots data points on a line.</h6>
        <canvas id="chartjs-line"></canvas>
      </div>
      <div className="chart-card">
        <h5 className="chart-title">Bar Chart</h5>
        <h6 className="chart-subtitle">A bar chart represents data with vertical bars.</h6>
        <canvas id="chartjs-bar"></canvas>
      </div>
    </div>
  );
};

export default ChartComponent;
