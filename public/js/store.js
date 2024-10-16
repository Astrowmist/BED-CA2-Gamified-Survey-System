// JS for store.html. Displaying store items
const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const storeItems = document.getElementById("storeItems");

    // Create a row for the first three items
    const firstRow = document.createElement("div");
    firstRow.className = "row";

    // Create a row for the remaining items
    const otherRows = document.createElement("div");
    otherRows.className = "row";

    responseData.forEach((storeItem, index) => {
        const displayItem = document.createElement("div");

        if (storeItem.item_id < 4) {
            displayItem.className = "col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 p-3 px-2";
            displayItem.innerHTML = `
                <div class="card pinkcard">
                    <img src="../images/store/store${storeItem.item_id}.png" class="card-img-top chest" alt="StoreItem Image">
                    <div class="card-body">
                        <h6 class="card-title"><strong id="chest">Name:</strong> ${storeItem.item_name}</h6>
                        <p class="card-text">
                            <strong id="chest">Description:</strong> ${storeItem.item_desc} <br>
                            <strong id="chest">Rarity:</strong> ${storeItem.category} <br>
                        </p>
                        <div class="d-flex justify-content-between mt-3">
                            <a class="btn cost">Cost: <strong>${storeItem.cost}</strong></a>
                            <div>
                                <a class="btn pinkbutton allbutton" id="${storeItem.category}chest" data-cost="${storeItem.cost}">Buy</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            firstRow.appendChild(displayItem);
        } else {
            displayItem.className = "col-xl-3 col-lg-3 col-md-3 col-sm-4 col-xs-12 p-3 px-2";
            displayItem.innerHTML = `
                <div class="card pinkcard">
                    <img src="../images/store/store${storeItem.item_id}.png" class="card-img-top notchest" alt="StoreItem Image">
                    <div class="card-body">
                        <h6 class="card-title">Name: ${storeItem.item_name}</h6>
                        <p class="card-text">
                            Description: ${storeItem.item_desc} <br><br>
                            Rarity: ${storeItem.category} <br>
                            ATK: ${storeItem.atk} <br>
                            DEF: ${storeItem.def} <br>
                        </p>
                        <div class="d-flex justify-content-between mt-3">
                            <a class="btn cost">Cost: <strong>${storeItem.cost}</strong></a>
                            <div>
                                <a class="btn pinkbutton allbutton" id="armour-${storeItem.item_id}">Buy</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            otherRows.appendChild(displayItem);
        }
    });

    // Append the rows to the storeItems
    storeItems.appendChild(firstRow);
    storeItems.appendChild(otherRows)

    function showModal(item) {
        const modalItemImage = document.getElementById("modalItemImage");
        const modalItemDetails = document.getElementById("modalItemDetails");

        modalItemImage.src = `../images/pets/pet${item.Pet_Stats.pet_id}.png`;
        modalItemDetails.innerHTML = `
            <p>Name: ${item.Pet_Stats.pet_name}</p>
            <p>Rarity: ${item.Pet_Stats.category}</p>
            <p>Type 1: ${item.Pet_Stats.type1}</p>
            <p>Type 2: ${item.Pet_Stats.type2}</p>
            <p>Type 3: ${item.Pet_Stats.type3}</p>
            <p>HP: ${item.Pet_Stats.pet_hp}</p>
            <p>ATK: ${item.Pet_Stats.pet_atk}</p>
            <p>DEF: ${item.Pet_Stats.pet_def}</p>
        `;
        $('#chestModal').modal('show');
    }
    document.querySelectorAll('[id$="chest"]').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const callbackForChest = (responseStatus, responseData) => {
                if (responseStatus == 200) {
                    console.log("responseStatus:", responseStatus);
                    console.log("responseData:", responseData);
                    var oldPoints = parseInt(points.textContent.slice(8));
                    const cost = parseInt(button.getAttribute('data-cost'), 10);
                    animatePoints(points, oldPoints - cost, 800);
                    showModal(responseData)
                    // window.location.reload()
                } else {
                    alert(responseData.message);
                }

            };
            fetchMethod(currentUrl + `/api/store/buy/${button.id}`, callbackForChest, 'POST', null, localStorage.getItem("token"));
        });
    });

    document.querySelectorAll('[id^="armour"]').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const itemId = button.id.split('-')[1]
            window.location.href = `chooseArmourPet.html?item_id=${itemId}`;
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

fetchMethod(currentUrl + "/api/store", callback);
