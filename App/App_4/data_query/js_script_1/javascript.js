  // Prioritize 'output', then 'chart'. If both are invalid, use a hardcoded default array.
    let chartData;
    if (Array.isArray(output) && output.length > 0) {
        chartData = output;
    } else if (Array.isArray(chart) && chart.length > 0) {
        chartData = chart;
    } else {
        // This default ensures the chart will always have valid data to render.
        chartData = [
            { "Month": "Jan", "China": 21, "Thailand": 5, "India": 42, "Bangladesh": 32, "Cambodia": 66 },
            { "Month": "Feb", "China": 32, "Thailand": 15, "India": 65, "Bangladesh": 67, "Cambodia": 56 },
            { "Month": "Mar", "China": 19, "Thailand": 11, "India": 78, "Bangladesh": 38, "Cambodia": 71 },
            { "Month": "Apr", "China": 8, "Thailand": 17, "India": 32, "Bangladesh": 23, "Cambodia": 24 },
            { "Month": "Oct", "China": 30, "Thailand": 8, "India": 44, "Bangladesh": 12, "Cambodia": 16 }
        ];
    }

    // We must stringify the data to safely inject it into the script tag within the HTML string.
    const chartDataString = JSON.stringify(chartData);

    const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bar Chart Example</title>
    <!-- 1. Include Chart.js library from a CDN -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
    <!-- 2. Include Tailwind CSS for styling the container -->
    <script src="https://cdn.tailwindcss.com"><\/script>
    <style>
        body, html { height: 100%; font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-gray-100 flex items-center justify-center h-full p-4">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <canvas id="myBarChart"></canvas>
    </div>

    <script>
        // 4. The raw data is now dynamically injected into the script
        const rawData = ${chartDataString};

        // Check if data is valid before proceeding
        if (!rawData || rawData.length === 0) {
            console.error("Chart data is empty or invalid.");
            // You could display a message on the canvas here
        } else {
            // 5. Prepare the data for Chart.js
            const labels = rawData.map(item => Object.values(item)[0]);
            const seriesKeys = Object.keys(rawData[0]).filter(key => key !== Object.keys(rawData[0])[0]);
            const seriesColors = {
                'China': 'rgba(59, 130, 246, 0.8)', 'Thailand': 'rgba(249, 115, 22, 0.8)',
                'India': 'rgba(34, 197, 94, 0.8)', 'Bangladesh': 'rgba(239, 68, 68, 0.8)',
                'Cambodia': 'rgba(168, 85, 247, 0.8)'
            };
            const seriesBorderColors = {
                'China': 'rgba(59, 130, 246, 1)', 'Thailand': 'rgba(249, 115, 22, 1)',
                'India': 'rgba(34, 197, 94, 1)', 'Bangladesh': 'rgba(239, 68, 68, 1)',
                'Cambodia': 'rgba(168, 85, 247, 1)'
            };

            const datasets = seriesKeys.map(key => ({
                label: key,
                data: rawData.map(item => item[key]),
                backgroundColor: seriesColors[key] || \`rgba(\${Math.floor(Math.random() * 255)}, \${Math.floor(Math.random() * 255)}, \${Math.floor(Math.random() * 255)}, 0.8)\`,
                borderColor: seriesBorderColors[key] || \`rgba(\${Math.floor(Math.random() * 255)}, \${Math.floor(Math.random() * 255)}, \${Math.floor(Math.random() * 255)}, 1)\`,
                borderWidth: 1,
                borderRadius: 4
            }));

            // 6. Get the canvas context and create the chart
            const ctx = document.getElementById('myBarChart').getContext('2d');
            const myBarChart = new Chart(ctx, {
                type: 'bar',
                data: { labels, datasets },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: { position: 'bottom', labels: { padding: 20, font: { size: 14 } } },
                        title: { display: true, text: 'Monthly Data by Country', font: { size: 18, weight: 'bold' }, padding: { top: 10, bottom: 20 } },
                        tooltip: {
                            callbacks: {
                               title: (tooltipItems) => tooltipItems[0].dataset.label,
                               label: (tooltipItem) => \`(\${tooltipItem.label}, \${tooltipItem.formattedValue})\`
                            }
                        }
                    },
                    scales: {
                        y: { beginAtZero: true, title: { display: true, text: 'Y Axis Title', font: { size: 16 } } },
                        x: { title: { display: true, text: 'X Axis Title', font: { size: 16 } } }
                    }
                }
            });
        }
    <\/script>
</body>
</html>
`;
    // Finally, return the complete HTML string.
    output = htmlString;
