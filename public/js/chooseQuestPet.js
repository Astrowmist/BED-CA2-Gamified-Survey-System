// Javascript for quest.html. Functionality in accepting quest
url = new URL(document.URL);
const urlParams = url.searchParams;
const questId = urlParams.get("quest_id");

const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const petList = document.getElementById("petList");
    responseData.rows.forEach((ownedpet) => {
        if (ownedpet.armour_name == null) {
            ownedpet.armour_name = "No Armour"
        }
        const displayItem = document.createElement("div");
        displayItem.className =
            "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3 px-2";
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
        petList.appendChild(displayItem);
        const chooseButton = document.getElementById(`pet-${ownedpet.owned_pet_id}`);
        chooseButton.addEventListener("click", (event) => {
            event.preventDefault();
            const callbackForSelect = (responseStatus, responseData) => {
                if (responseStatus == 200) {
                    if (responseData.message.toLowerCase().includes("failed")) {
                        alert(responseData.message);
                    }
                    else {
                        console.log("responseStatus:", responseStatus);
                        console.log("responseData:", responseData);

                        function showModal(item) {
                            const modalItemImage = document.getElementById("modalItemImage");
                            const modalItemDetails = document.getElementById("modalItemDetails");

                            modalItemImage.src = `../images/pets/pet${item.Pet_Stats.pet_id}.png`;
                            modalItemDetails.innerHTML = `
                             <p>Name: ${item.Pet_Stats.pet_name}</p>
                             <p>Rarity: ${item.Pet_Stats.category}</p>
                             <p>Level: <strong>${item.Pet_Stats.pet_level - 1} -> ${item.Pet_Stats.pet_level}</strong></p>
                             <p>HP: ${item.Pet_Stats.pet_hp}</p>
                             <p>ATK: ${item.Pet_Stats.pet_atk}</p>
                             <p>DEF: ${item.Pet_Stats.pet_def}</p>
                            `;
                            $('#questModal').modal('show');
                        }
                        $('#questModal').on('hidden.bs.modal', function () {
                            window.location.href = "quest.html";
                        });
                        showModal(responseData.rows)
                    }
                }
                else if (responseStatus == 401) {
                    localStorage.removeItem("token");
                    window.location.href = "login.html";
                }
                else {
                    alert(responseData.message);
                }

            };
            fetchMethod(currentUrl + "/api/quest/" + questId + "/pet/" + ownedpet.owned_pet_id, callbackForSelect, 'PUT', null, localStorage.getItem("token"));
        });
    });
    var token = localStorage.getItem("token");
    if (token == null) {
        var buttons = document.querySelectorAll('.allbutton');
        buttons.forEach(function (button) {
            button.classList.add("disabled");
        });
    }
};

fetchMethod(currentUrl + "/api/ownedpet/userownedpets", callback, "GET", null, localStorage.getItem("token"));