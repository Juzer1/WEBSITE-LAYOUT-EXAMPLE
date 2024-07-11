document.addEventListener("DOMContentLoaded", function() {
  // Assuming you have functionality to fetch and display available times
  // Fetching available times from Google Sheets or other sources

  // Example: Populate time slots dynamically
  const timesSelect = document.getElementById('time');

  fetch('https://path-to-your-google-sheet-api')
    .then(response => response.json())
    .then(data => {
      // Populate select options based on the data
      data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.time;
        option.textContent = item.time;
        timesSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching available times:', error));
});

const sheetId = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSy5JAUVVJtIGO9K6BA1LskDJc-VQi58VsLlwzIQCrOAtL8SG9jALXHHhfSFnxJMLhjE6YmyCXBPsjl/pubhtml;'// Replace with your actual Google Sheet ID
const apiKey = 'AIzaSyAq-hLvC1GUdkHqbHfcIUlOYREWVp886F8'; // Replace with your actual API Key
const range = 'Sheet1!A:C'; // Adjust the range if needed

function fetchData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const rows = data.values;
      const tableBody = document.querySelector('#availabilityTable tbody');
      const timeSelect = document.querySelector('#time');

      tableBody.innerHTML = ''; // Clear previous data
      timeSelect.innerHTML = ''; // Clear previous options

      rows.forEach((row, index) => {
        if (index === 0) return; // Skip the header row
        const tr = document.createElement('tr');
        row.forEach((cell, cellIndex) => {
          const td = document.createElement('td');
          td.textContent = cell;
          tr.appendChild(td);

          // Populate the time select dropdown
          if (cellIndex === 1 && cell !== 'Time') { // Assuming time is in the second column
            const option = document.createElement('option');
            option.value = cell;
            option.textContent = cell;
            timeSelect.appendChild(option);
          }
        });
        tableBody.appendChild(tr);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

document.addEventListener('DOMContentLoaded', fetchData);
