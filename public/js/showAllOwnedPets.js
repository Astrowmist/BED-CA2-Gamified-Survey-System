// JS for pets.html. shows all owned pets
const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const petList = document.getElementById("petList");
    responseData.forEach((ownedpet) => {
        if(ownedpet.armour_name==null){
            ownedpet.armour_name="No Armour"
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
                  <a href="singlePetInfo.html?owned_pet_id=${ownedpet.owned_pet_id}" class="btn allbutton pinkbutton">Details</a>
              </div>
          </div>
          `;
        petList.appendChild(displayItem);
    });
    var token = localStorage.getItem("token");
    if (token == null) {
        var buttons = document.querySelectorAll('.allbutton');
        buttons.forEach(function (button) {
            button.classList.add("disabled");
        });
    }
};

fetchMethod(currentUrl + "/api/ownedpet", callback);