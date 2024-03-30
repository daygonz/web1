fetch('/instagram-insights')
  .then(response => response.json())
  .then(data => {
    // Call a function to draw the chart here
    drawChart(data);

    // Update the follower count display
    updateFollowerCount(data.followersCount);

  });

  function drawChart(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line', // Choose the chart type, e.g., 'line', 'bar', etc.
        data: {
            labels: data.dates, // Array of dates or categories
            datasets: [{
                label: 'Impressions',
                data: data.impressions, // Array of data points
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'Reach',
                data: data.reach, // Array of data points
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateFollowerCount(followersCount) {
    // Assuming 'followers' is a number
    document.getElementById('followerCount').innerText = `Followers: ${followersCount}`;
  }