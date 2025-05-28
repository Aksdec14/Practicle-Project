// Elements
const visitorsCountEl = document.getElementById('visitorsCount');
const bounceRateEl = document.getElementById('bounceRate');
const conversionsCountEl = document.getElementById('conversionsCount');
const summaryEl = document.getElementById('summary');
const darkModeToggleBtn = document.getElementById('darkModeToggle');
const chartTypeSelect = document.getElementById('chartTypeSelect');

const navLinks = document.querySelectorAll('.sidebar ul li a');
const views = document.querySelectorAll('.view');

const ctx = document.getElementById('analyticsChart').getContext('2d');

// Yearly report data from your table:
let analyticsData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 
             'July', 'August', 'September', 'October', 'November', 'December'],
    visitors: [15000, 14500, 16200, 17000, 18500, 19000, 20000, 21500, 22000, 23500, 24000, 25000],
    conversions: [1200, 1150, 1300, 1400, 1500, 1550, 1600, 1700, 1750, 1800, 1850, 2000],
    bounceRates: [42, 40, 38, 36, 35, 34, 33, 32, 31, 30, 29, 28]
};

// We'll track bounce rate per month instead of a single number
// For display, let's show the latest month's bounce rate:
let currentBounceRateIndex = analyticsData.bounceRates.length - 1;

let currentChartType = 'bar';
let chart;

// Initialize chart
function createChart(type) {
    if (chart) {
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: type,
        data: {
            labels: analyticsData.labels,
            datasets: [{
                label: 'Visitors',
                data: analyticsData.visitors,
                backgroundColor: 'rgba(0, 123, 255, 0.7)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1,
                fill: true,
            }, {
                label: 'Conversions',
                data: analyticsData.conversions,
                backgroundColor: 'rgba(40, 167, 69, 0.7)',
                borderColor: 'rgba(40, 167, 69, 1)',
                borderWidth: 1,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            scales: type === 'radar' ? undefined : {
                y: {
                    beginAtZero: true,
                }
            }
        }
    });
}

// Update stats on page: show latest month's data
function updateStats() {
    const lastIndex = analyticsData.visitors.length - 1;
    visitorsCountEl.textContent = analyticsData.visitors[lastIndex].toLocaleString();
    bounceRateEl.textContent = analyticsData.bounceRates[lastIndex] + '%';
    conversionsCountEl.textContent = analyticsData.conversions[lastIndex].toLocaleString();
}

// Helper: pick random item from array
function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Typewriter effect variables
let typingTimeout;
let typingIndex = 0;

// Typewriter effect function
function typeWriter(text, element, speed = 40) {
    clearTimeout(typingTimeout);  // Clear any previous typing

    element.textContent = '';  // Clear current text
    typingIndex = 0;

    function type() {
        if (typingIndex < text.length) {
            element.textContent += text.charAt(typingIndex);
            typingIndex++;
            typingTimeout = setTimeout(type, speed);
        }
    }

    type();
}

// Updated fake AI summary generation with dynamic phrasing & emoticons
function updateSummary() {
    const lastIndex = analyticsData.visitors.length - 1;
    const last3Visitors = analyticsData.visitors.slice(-3);
    const visitorTrendValue = last3Visitors[2] - last3Visitors[0];
    const last3Conversions = analyticsData.conversions.slice(-3);
    const conversionTrendValue = last3Conversions[2] - last3Conversions[0];
    const bounceRate = analyticsData.bounceRates[lastIndex];
    const lastVisitor = analyticsData.visitors[lastIndex];
    const lastConversion = analyticsData.conversions[lastIndex];
    const conversionRatePercent = ((lastConversion / lastVisitor) * 100).toFixed(2);

    const visitorPhrases = [
        `Visitors are moving ${visitorTrendValue > 0 ? 'upwards 📈' : visitorTrendValue < 0 ? 'downwards 📉' : 'sideways ➡️'}.`,
        `Traffic looks ${visitorTrendValue > 0 ? 'stronger than before 💪' : visitorTrendValue < 0 ? 'a bit weak 😕' : 'stable and consistent.'}`,
        `The crowd is ${visitorTrendValue > 0 ? 'growing steadily 🚀' : visitorTrendValue < 0 ? 'thinning out slightly 🐢' : 'holding steady.'}`
    ];

    const bouncePhrases = [
        bounceRate > 60 ? 'Bounce rate is quite high ⚠️, consider improving engagement.' :
        bounceRate < 30 ? 'Bounce rate is low 👍, visitors are sticking around.' :
        'Bounce rate is moderate, nothing alarming.'
    ];

    const conversionPhrases = [
        conversionTrendValue > 0 ? `Conversions are climbing nicely ✅ (rate: ${conversionRatePercent}%).` :
        conversionTrendValue < 0 ? `Conversions dipped slightly ❌ (rate: ${conversionRatePercent}%).` :
        `Conversions remain steady ➖ (rate: ${conversionRatePercent}%).`
    ];

    const recommendations = [
        bounceRate > 60 ? 'Try refreshing your content or speeding up your site to reduce bounce.' :
        conversionRatePercent < 5 ? 'Focus on clearer calls-to-action to boost conversions.' :
        'Keep up the great work and monitor trends regularly!'
    ];

    const dynamicSummary = [
        getRandom(visitorPhrases),
        getRandom(bouncePhrases),
        getRandom(conversionPhrases),
        'Recommendation: ' + getRandom(recommendations)
    ].join(' ');

    typeWriter(dynamicSummary, summaryEl);
}

// Since this is yearly static data, we won't simulate real-time data update anymore
// But if you want, you can create a function to cycle through months (like a slideshow):

let currentMonthIndex = 0;

function showMonthlyData(index) {
    // Update stats for the given month index
    visitorsCountEl.textContent = analyticsData.visitors[index].toLocaleString();
    bounceRateEl.textContent = analyticsData.bounceRates[index] + '%';
    conversionsCountEl.textContent = analyticsData.conversions[index].toLocaleString();

    // Update summary based on just this month or small window
    const visitorChange = index > 0 ? analyticsData.visitors[index] - analyticsData.visitors[index - 1] : 0;
    const conversionChange = index > 0 ? analyticsData.conversions[index] - analyticsData.conversions[index - 1] : 0;
    const bounceRate = analyticsData.bounceRates[index];
    const conversionRatePercent = ((analyticsData.conversions[index] / analyticsData.visitors[index]) * 100).toFixed(2);

    // Dynamic messages as before
    const visitorPhrases = [
        `Visitors are ${visitorChange > 0 ? 'increasing 📈' : visitorChange < 0 ? 'decreasing 📉' : 'steady ➡️'}.`,
        `This month shows ${visitorChange > 0 ? 'growth 🚀' : visitorChange < 0 ? 'a decline 😕' : 'stability.'}`,
    ];
    const bouncePhrases = [
        bounceRate > 60 ? 'Bounce rate is high ⚠️.' :
        bounceRate < 30 ? 'Bounce rate is low 👍.' :
        'Bounce rate is moderate.'
    ];
    const conversionPhrases = [
        conversionChange > 0 ? `Conversions increased ✅ (rate: ${conversionRatePercent}%).` :
        conversionChange < 0 ? `Conversions decreased ❌ (rate: ${conversionRatePercent}%).` :
        `Conversions stable ➖ (rate: ${conversionRatePercent}%).`
    ];
    const recommendations = [
        bounceRate > 60 ? 'Improve engagement to reduce bounce.' :
        conversionRatePercent < 5 ? 'Boost calls-to-action.' :
        'Monitor performance.'
    ];

    const summaryText = [
        getRandom(visitorPhrases),
        getRandom(bouncePhrases),
        getRandom(conversionPhrases),
        'Recommendation: ' + getRandom(recommendations)
    ].join(' ');

    typeWriter(summaryText, summaryEl);
}

// Cycle through each month every 10 seconds:
function cycleMonthlyData() {
    showMonthlyData(currentMonthIndex);
    createChart(currentChartType); // Chart stays full year but stats summary updates
    currentMonthIndex = (currentMonthIndex + 1) % analyticsData.labels.length;
    setTimeout(cycleMonthlyData, 10000);
}

// Handle dark mode toggle
darkModeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Handle navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetView = link.getAttribute('data-view');

        // Show correct view, hide others
        views.forEach(view => {
            view.style.display = (view.id === targetView) ? 'block' : 'none';
        });

        // Mark active nav link
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
    });
});

// Handle chart type change in settings
chartTypeSelect.addEventListener('change', (e) => {
    currentChartType = e.target.value;
    createChart(currentChartType);
});

// Prevent form submit (for demo)
document.getElementById('settingsForm').addEventListener('submit', e => {
    e.preventDefault();
    alert('Settings saved!');
});

// Initial setup
createChart(currentChartType);
cycleMonthlyData();

const reportData = [
  { month: "January", visitors: 15000, conversions: 1200, bounceRate: 42 },
  { month: "February", visitors: 14500, conversions: 1150, bounceRate: 40 },
  { month: "March", visitors: 16200, conversions: 1300, bounceRate: 38 },
  { month: "April", visitors: 17000, conversions: 1400, bounceRate: 36 },
  { month: "May", visitors: 18500, conversions: 1500, bounceRate: 35 },
  { month: "June", visitors: 19000, conversions: 1550, bounceRate: 34 },
  { month: "July", visitors: 20000, conversions: 1600, bounceRate: 33 },
  { month: "August", visitors: 21500, conversions: 1700, bounceRate: 32 },
  { month: "September", visitors: 22000, conversions: 1750, bounceRate: 31 },
  { month: "October", visitors: 23500, conversions: 1800, bounceRate: 30 },
  { month: "November", visitors: 24000, conversions: 1850, bounceRate: 29 },
  { month: "December", visitors: 25000, conversions: 2000, bounceRate: 28 },
];

// Function to create and insert the table dynamically
function createReportTable() {
  const container = document.getElementById("report-table-container");

  // Create table element
  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.setAttribute("border", "1");
  table.setAttribute("cellpadding", "8");
  table.setAttribute("cellspacing", "0");

  // Create thead
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Month", "Visitors", "Conversions", "Bounce Rate (%)"].forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create tbody
  const tbody = document.createElement("tbody");

  reportData.forEach(row => {
    const tr = document.createElement("tr");

    const tdMonth = document.createElement("td");
    tdMonth.textContent = row.month;
    tr.appendChild(tdMonth);

    const tdVisitors = document.createElement("td");
    tdVisitors.textContent = row.visitors.toLocaleString();
    tr.appendChild(tdVisitors);

    const tdConversions = document.createElement("td");
    tdConversions.textContent = row.conversions.toLocaleString();
    tr.appendChild(tdConversions);

    const tdBounceRate = document.createElement("td");
    tdBounceRate.textContent = row.bounceRate;
    tr.appendChild(tdBounceRate);

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);

  // Clear any previous content and append the new table
  container.innerHTML = "";
  container.appendChild(table);
}

// Call this function when page loads or when you want to show the report
createReportTable();