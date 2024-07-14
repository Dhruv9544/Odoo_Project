import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const Analysis = () => {
  const [bookData, setBookData] = useState([]);
  const [returnData, setReturnData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    // Fetch the book data, return data, and category data here (replace with actual fetching logic)

    // For demonstration, I will use hardcoded data

    // Book Data (issued)
    setBookData([100, 120, 90, 110, 80, 130, 140, 115, 105, 125, 95, 135]);

    // Book Returns Data
    setReturnData([80, 100, 70, 90, 60, 110, 120, 95, 85, 105, 75, 115]);

    // Category-wise Percentage (assuming 4 categories for books)
    setCategoryData([30, 25, 15, 20]);
  }, []);

  const chartData = {
    options: {
      chart: {
        id: "monthly-books-issued",
      },
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
      yaxis: {
        title: {
          text: "Books",
        },
      },
      title: {
        text: "Monthly Books Issued",
        align: "center",
      },
      theme: {
        mode: "light",
        palette: "palette1",
        monochrome: {
          enabled: true,
          color: "#255aee",
          shadeTo: "light",
          shadeIntensity: 0.65,
        },
      },
    },
    series: [
      {
        name: "Books Issued",
        data: bookData,
      },
      {
        name: "Books Returned",
        data: returnData,
      },
    ],
  };

  const returnTrendData = {
    options: {
      chart: {
        id: "return-trend-chart",
      },
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
      yaxis: {
        title: {
          text: "Returns",
        },
      },
      title: {
        text: "Monthly Book Returns Trend",
        align: "center",
      },
      theme: {
        mode: "light",
        palette: "palette2",
        monochrome: {
          enabled: true,
          color: "#f29b18",
          shadeTo: "light",
          shadeIntensity: 0.65,
        },
      },
    },
    series: [
      {
        name: "Returns",
        data: returnData,
      },
    ],
  };

  const genrePopularityData = {
    options: {
      labels: ["Fiction", "Non-Fiction", "Science", "History"],
      title: {
        text: "Genre Popularity",
        align: "center",
      },
      legend: {
        position: "bottom",
      },
    },
    series: categoryData,
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={300}
      />
      <Chart
        options={returnTrendData.options}
        series={returnTrendData.series}
        type="line"
        height={300}
      />
      <div className="mt-5"></div>
      <Chart
        options={genrePopularityData.options}
        series={genrePopularityData.series}
        type="donut"
        height={300}
      />
    </div>
  );
};

export default Analysis;
