let hospitals = JSON.parse(localStorage.getItem('hospitals')) || [];

function renderHospitals() {
  const container = document.getElementById('hospital-list');
  container.innerHTML = '';
  hospitals.forEach(hospital => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <img src="${hospital.image}" class="card-img-top" alt="${hospital.name}" />
          <div class="card-body">
            <h5 class="card-title">${hospital.name}</h5>
            <p class="card-text">${hospital.location}</p>
            <p><strong>Insurances:</strong> ${hospital.insurance.join(', ')}</p>
          </div>
        </div>
      </div>
    `;
  });
}

document.getElementById('hospital-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const location = document.getElementById('location').value.trim();
  const insurance = document.getElementById('insurance').value.split(',').map(i => i.trim());

  // Image upload and convert to Base64
  const fileInput = document.getElementById('imageFile');
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const imageBase64 = reader.result;

    const newHospital = {
      name,
      location,
      insurance,
      image: imageBase64,
    };

    hospitals.push(newHospital);
    localStorage.setItem('hospitals', JSON.stringify(hospitals));
    renderHospitals();

    // Reset form
    e.target.reset();
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    alert('Please upload an image!');
  }
});

// Initial render on page load
renderHospitals();
