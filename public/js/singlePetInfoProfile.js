// JS for displaying single pet info
document.addEventListener("DOMContentLoaded", function () {
    function createRadarChart(responseData) {
        const ctx = document.getElementById('petStatsChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Attack', 'Defense', 'HP'],
                datasets: [{
                    label: 'Pet Stats',
                    data: [responseData.pet_atk + responseData.armour_atk, responseData.pet_def + responseData.armour_def, responseData.pet_hp],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light Blue with Transparency
                    borderColor: 'rgba(54, 162, 235, 1)', // Bright Blue
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Bright Red
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(54, 162, 235, 1)' // Bright Blue
                }]
            },
            options: {
                scale: {
                    ticks: {
                        beginAtZero: true,
                        backdropColor: 'rgba(255, 255, 255, 0)' // Make the backdrop transparent
                    },
                    gridLines: {
                        color: 'rgba(255, 99, 132, 0.2)' // Light Red for grid lines
                    },
                    angleLines: {
                        color: 'rgba(54, 162, 235, 0.5)' // Semi-transparent blue for angle lines
                    }
                },
                legend: {
                    display: false // Hide legend if you want a cleaner look
                }
            }
        });
    }

    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const petId = urlParams.get("owned_pet_id");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseData.armour_name == null) {
            responseData.armour_name = "No Armour"
        }

        const displayItem = document.createElement("div");
        displayItem.className =
            "col-8";
        if (responseData.armour_desc != null) {
            
            function capitalizeWords(str) {
                return str.split(' ')
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                          .join(' ');
            }
            responseData.armour_desc=capitalizeWords(responseData.armour_desc)
            displayItem.innerHTML = `
<div class="card">
        <div class="row">
        <div class="col-6 d-flex align-items-center" id="petimg">
            <img src="../images/pets/pet${responseData.pet_id}.png" class="img-fluid rounded-start" alt="Pet Image" id="petdetails">
        </div>
        <div class="col-6" id="petstats">
            <div class="card-body" id="singlebody">
                <h3 class="card-title text-center" id="singlepetname">Name: ${responseData.pet_name}</h3>
                <p class="card-text text-center">
                    Pet ID: ${responseData.pet_id} <br>
                    Rarity: ${responseData.category} <br>
                    Type 1: ${responseData.type1} <br>
                    Type 2: ${responseData.type2} <br>
                    Type 3: ${responseData.type3} <br>
                    Level: ${responseData.pet_level} <br>
                    Armour: ${responseData.armour_name} <br>
                    Armour Rarity:${responseData.armour_category} <br>
                    Armour Details:${responseData.armour_desc} <br>
                </p>
                <h4 class="text-center"">Pet Stats</h4>
                <div class="chart-container justify-content-center align-items-center" style="height:60vh; width:100vw">
                    <canvas id="petStatsChart"></canvas>
                </div>
            </div>
        </div>
        </div>
</div>
          `;
        }
        else {
            displayItem.innerHTML = `
            <div class="card">
                    <div class="row">
                    <div class="col-6 d-flex align-items-center" id="petimg">
                        <img src="../images/pets/pet${responseData.pet_id}.png" class="img-fluid rounded-start" alt="Pet Image" id="petdetails">
                    </div>
                    <div class="col-6" id="petstats">
                        <div class="card-body" id="singlebody">
                            <h3 class="card-title text-center" id="singlepetname">Name: ${responseData.pet_name}</h3>
                            <p class="card-text text-center">
                                Owned Pet ID: ${responseData.owned_pet_id} <br>
                                Rarity: ${responseData.category} <br>
                                Type 1: ${responseData.type1} <br>
                                Type 2: ${responseData.type2} <br>
                                Type 3: ${responseData.type3} <br>
                                Level: ${responseData.pet_level} <br>
                                Armour: ${responseData.armour_name} <br>
                            </p>
                            <h4 class="text-center"">Pet Stats</h4>
                            <div class="chart-container justify-content-center align-items-center" style="height:60vh; width:100vw">
                                <canvas id="petStatsChart"></canvas>
                            </div>
                        </div>
                    </div>
                    </div>
            </div>
                      `;
        }
        const petDetails = document.getElementById("petDetails");
        petDetails.appendChild(displayItem);
        createRadarChart(responseData);
    };

    fetchMethod(currentUrl + "/api/ownedpet/" + petId + "/pet", callback);

})