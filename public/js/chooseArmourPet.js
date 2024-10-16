// Get the current URL and extract the search parameters
url = new URL(document.URL);
const urlParams = url.searchParams;
// Get the 'item_id' parameter from the URL
const itemId = urlParams.get("item_id");

// Define the callback function to handle the response from the fetch method
const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    // Get the element with id 'petList' to display the pets
    const petList = document.getElementById("petList");

    // Loop through each owned pet in the response data
    responseData.forEach((ownedpet) => {
        // If the pet has no armour, set 'No Armour' as the default value
        if (ownedpet.armour_name == null) {
            ownedpet.armour_name = "No Armour";
        }

        // Create a new div element to display the pet
        const displayItem = document.createElement("div");
        displayItem.className =
            "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3 px-2";
        
        // Set the inner HTML of the div to display pet information
        displayItem.innerHTML = `
          <div class="card pinkcard">
              <img src="../images/pets/pet${ownedpet.pet_id}.png" class="card-img-top" alt="Pet Image">
              <div class="card-body">
                  <h6 class="card-title">Name: ${ownedpet.pet_name}</h6>
                  <p class="card-text">
                      Rarity: ${ownedpet.category} <br>
                      Type 1: ${ownedpet.type1} <br>
                      Type 2: ${ownedpet.type2} <br>
                      Type 3: ${ownedpet.type3} <br>
                      Level: ${ownedpet.pet_level} <br>
                      Armour: ${ownedpet.armour_name} <br>
                  </p>
                  <a class="btn allbutton pinkbutton" id="pet-${ownedpet.owned_pet_id}">Select</a>
              </div>
          </div>
          `;
        
        // Append the new div to the pet list
        petList.appendChild(displayItem);

        // Add a click event listener to the select button
        const chooseButton = document.getElementById(`pet-${ownedpet.owned_pet_id}`);
        chooseButton.addEventListener("click", (event) => {
            event.preventDefault();

            // Define the callback function for the select button fetch request
            const callbackForSelect = (responseStatus, responseData) => {
                if (responseStatus == 200) {
                    console.log("responseStatus:", responseStatus);
                    console.log("responseData:", responseData);
                    alert(responseData.message);
                    window.location.href = "store.html";
                }
                else if (responseStatus == 401) {
                    localStorage.removeItem("token");
                    window.location.href = "login.html";
                } 
                else {
                    alert(responseData.message);
                }
            };

            // Make a PUT request to buy the item with the selected pet
            fetchMethod(currentUrl + "/api/store/" + ownedpet.owned_pet_id + "/buy/" + itemId, callbackForSelect, 'PUT', null, localStorage.getItem("token"));
        });
    });

    // Check if the user is logged in by verifying the presence of a token
    var token = localStorage.getItem("token");
    if (token == null) {
        var buttons = document.querySelectorAll('.allbutton');
        buttons.forEach(function (button) {
            button.classList.add("disabled");
        });
    }
};

// Make a GET request to retrieve the user's owned pets
fetchMethod(currentUrl + "/api/ownedpet/userownedpets", callback, "GET", null, localStorage.getItem("token"));
