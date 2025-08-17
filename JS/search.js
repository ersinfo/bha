let allHospitals = []; // JSON se aayega

function renderHospitals(hospitals) {
  const container = document.getElementById("hospital-list");
  container.innerHTML = "";
  hospitals.forEach(hospital => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <img
            src="${hospital.image}"
            class="card-img-top"
            alt="${hospital.name}"
            style="height: 180px; object-fit: cover;"
          />
          <div class="card-body">
            <h5 class="card-title">${hospital.name}</h5>
            <p class="card-text">
              <strong>Location:</strong> ${hospital.location}<br />
              <strong>Type:</strong> ${hospital.type || "N/A"}<br />
              <strong>Notable:</strong> ${hospital.notable || ""}
            </p>
          </div>
        </div>
      </div>
    `;
  });
}

// Filter hospitals based on search text
function filterHospitals(searchText) {
  searchText = searchText.toLowerCase();
  const filtered = allHospitals.filter(h =>
    h.name.toLowerCase().includes(searchText) ||
    (h.location && h.location.toLowerCase().includes(searchText)) ||
    (h.type && h.type.toLowerCase().includes(searchText)) ||
    (h.specialties && h.specialties.join(" ").toLowerCase().includes(searchText))
  );
  renderHospitals(filtered);
}

// Fetch hospitals.json at load
fetch("json/hospitals.json")
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    allHospitals = data;
    renderHospitals(allHospitals);
  })
  .catch(error => {
    console.error("Fetch failed:", error);
  });

// Search box event
document.getElementById('searchBox').addEventListener('input', function() {
  filterHospitals(this.value);
});

// Optional: You can also add click listener on search button
// document.getElementById('searchBtn').addEventListener('click', function() {
//   filterHospitals(document.getElementById('searchBox').value);
// });
