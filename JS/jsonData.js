// Declare once at global scope
let allHospitals = [];

// Function to render hospital cards, making each card clickable
function renderHospitals(hospitals) {
  const container = document.getElementById("hospital-list");
  container.innerHTML = "";
  hospitals.forEach((hospital, index) => {
    container.innerHTML += `
      <div class="col-md-4 mb-4 position-relative">
        <div class="card h-100" style="cursor:pointer;" onclick="goToHospitalDetail(${index})">
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
              <strong>Notable:</strong> ${hospital.notable || ""}<br />
              <strong>Insurance:</strong> ${hospital.insurance || ""}
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

// Fetch JSON data and update global allHospitals
fetch("json/hospitals.json")
  .then((response) => {
    if (!response.ok) 
      throw new Error(`HTTP error! status: ${response.status}`);

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Expected JSON, but received something else.");
    }
    return response.json();
  })
  .then((data) => {
    allHospitals = data;  // Reassign, no 'let' here
    renderHospitals(data);
  })
  .catch((error) => {
    console.error("Fetch failed:", error);
    document.getElementById("json-data-display").textContent = "Failed to load hospital data.";
  });

// Function to handle card click and redirect user
function goToHospitalDetail(index) {
  const selectedHospital = allHospitals[index];
  localStorage.setItem("selectedHospital", JSON.stringify(selectedHospital));
  window.location.href = "hospital-detail.html";
}
