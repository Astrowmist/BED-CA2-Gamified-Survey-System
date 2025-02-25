// JS for profile.html
document.addEventListener("DOMContentLoaded", function () {
    const callbackForUserInfo = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const UserInfo = document.getElementById("profile");

        if (responseStatus == 404) {
            playerInfo.innerHTML = `${responseData.message}`;
            return;
        }
        else if (responseStatus == 401) {
            localStorage.removeItem("token");
            window.location.href = "login.html";
            return;
        }

        UserInfo.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <p class="card-text" id="profile">
                        Username: ${responseData.username}<br>
                        User ID: ${responseData.user_id} <br>
                        Points: ${responseData.points} <br>
                        Completed Questions: ${responseData.completed_questions} <br>
                    </p>
                    <div class="d-flex justify-content-end">
                <a class="btn orangebutton allbutton" id="edit">Update</a>
            </div>
                </div>
                <div id="editForm" style="display: none; margin-top: 0.6rem;">
                <div class="input-group flex-nowrap">
                 <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" id="changeusername">
                </div>
        <div class="button-group-edit p-3">
            <a class="btn pinkbutton allbutton" id="confirm" style="margin-top: 0.4rem;">Confirm Changes</a>
            <a class="btn btn-secondary allbutton" id="cancel" style="margin-top: 0.4rem;">Cancel</a>
        </div>
                    </div>
            </div>
        `;
        const editButton = document.getElementById(`edit`);
        editButton.addEventListener("click", (event) => {
            event.preventDefault();
            document.getElementById(`editForm`).style.display = 'block';
        });

        const confirmButton = document.getElementById(`confirm`);
        confirmButton.addEventListener("click", (event) => {
            event.preventDefault();
            const preferredUsername = document.getElementById(`changeusername`).value;
            const data = {
                username: preferredUsername
            };
            const callbackForEdit = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                if (responseStatus === 200) {
                    window.location.reload()
                } else if (responseStatus == 401) {
                    localStorage.removeItem("token");
                    window.location.href = "login.html";
                } else {
                    alert(responseData.message)
                }
            };

            fetchMethod(currentUrl + `/api/users`, callbackForEdit, 'PUT', data, localStorage.getItem("token"));
        });

        const cancelButton = document.getElementById(`cancel`);
        cancelButton.addEventListener("click", (event) => {
            event.preventDefault();
            const preferredUsername = document.getElementById(`changeusername`);
            preferredUsername.value = ""
            document.getElementById(`editForm`).style.display = 'none';
        });
    };

    const callbackForShowPets = (responseStatus, responseData) => {
        const pets = document.getElementById("pets");
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        responseData.rows.forEach((ownedpet) => {
            if (ownedpet.armour_name == null) {
                ownedpet.armour_name = "No Armour"
            }
            const displayItem = document.createElement("div");
            displayItem.className =
                "col-xl-4 col-lg-5 col-md-6 col-sm-6 col-xs-12 p-3 px-2";
            displayItem.innerHTML = `
              <div class="card pinkcard">
                  <img src="../images/pets/pet${ownedpet.pet_id}.png" class="card-img-top profile" alt="Pet Image">
                  <div class="card-body">
                      <h6 class="card-title">Name: ${ownedpet.pet_name}</h6>
                      <p class="card-text">
                          Rarity: ${ownedpet.category} <br>
                          Type 1: ${ownedpet.type1} <br>
                          Type 2: ${ownedpet.type2} <br>
                          Type 3: ${ownedpet.type3} <br>
                          Level: ${ownedpet.pet_level} <br>
                          Armour: ${ownedpet.armour_name} <br>
                          Hunger: <strong id="hunger-${ownedpet.owned_pet_id}">${ownedpet.last_fed}</strong> <br>
                          Hygiene: <strong id="hygiene-${ownedpet.owned_pet_id}">${ownedpet.last_showered}</strong> <br>
                          Mood: <strong id="mood-${ownedpet.owned_pet_id}">${ownedpet.last_time_spent}</strong> <br>
                      </p>
            <div class="d-flex justify-content-between">
            <a href="singlePetInfoProfile.html?owned_pet_id=${ownedpet.owned_pet_id}" class="btn allbutton pinkbutton">Details</a>
            <div class="buttongroup" style="padding-left: 0;">
                <a class="btn orangebutton allbuttonprofile" id="feed-${ownedpet.owned_pet_id}">Feed</a>
                <a class="btn btn-primary allbuttonprofile" id="shower-${ownedpet.owned_pet_id}">Shower</a>
                <a class="btn btn-info allbuttonprofile" id="play-${ownedpet.owned_pet_id}">Play</a>
            </div>
            </div>
                  </div>
              </div>
              `;
            pets.appendChild(displayItem);
            const feedButton = document.getElementById(`feed-${ownedpet.owned_pet_id}`);
            feedButton.addEventListener("click", (event) => {
                event.preventDefault();
                const callbackForFeed = (responseStatus, responseData) => {
                    if (responseStatus == 200) {
                        console.log("responseStatus:", responseStatus);
                        console.log("responseData:", responseData);
                        const hungerElement = document.getElementById(`hunger-${ownedpet.owned_pet_id}`);
                        hungerElement.textContent="Full"
                        hungerElement.className=""
                        hungerElement.classList.add('text-success');
                    } else {
                        alert(responseData.message);
                    }

                };
                fetchMethod(currentUrl + "/api/ownedpet/" + ownedpet.owned_pet_id + "/feed", callbackForFeed, 'PUT', null, localStorage.getItem("token"));
            });

            const showerButton = document.getElementById(`shower-${ownedpet.owned_pet_id}`);
            showerButton.addEventListener("click", (event) => {
                event.preventDefault();
                const callbackForShower = (responseStatus, responseData) => {
                    if (responseStatus == 200) {
                        console.log("responseStatus:", responseStatus);
                        console.log("responseData:", responseData);
                        const showerElement = document.getElementById(`hygiene-${ownedpet.owned_pet_id}`);
                        showerElement.textContent="Clean"
                        showerElement.className=""
                        showerElement.classList.add('text-success');
                    } else {
                        alert(responseData.message);
                    }

                };
                fetchMethod(currentUrl + "/api/ownedpet/" + ownedpet.owned_pet_id + "/shower", callbackForShower, 'PUT', null, localStorage.getItem("token"));
            });

            const playButton = document.getElementById(`play-${ownedpet.owned_pet_id}`);
            playButton.addEventListener("click", (event) => {
                event.preventDefault();
                const callbackForPlay = (responseStatus, responseData) => {
                    if (responseStatus == 200) {
                        console.log("responseStatus:", responseStatus);
                        console.log("responseData:", responseData);
                        const playElement = document.getElementById(`mood-${ownedpet.owned_pet_id}`);
                        playElement.textContent="Happy"
                        playElement.className=""
                        playElement.classList.add('text-success');
                    } else {
                        alert(responseData.message);
                    }

                };
                fetchMethod(currentUrl + "/api/ownedpet/" + ownedpet.owned_pet_id + "/play", callbackForPlay, 'PUT', null, localStorage.getItem("token"));
            });
        });

        responseData.rows.forEach((ownedpet) => {
            const hungerElement = document.getElementById(`hunger-${ownedpet.owned_pet_id}`);
            const showerElement = document.getElementById(`hygiene-${ownedpet.owned_pet_id}`);
            const playElement = document.getElementById(`mood-${ownedpet.owned_pet_id}`);

            if (hungerElement.textContent === 'Hungry') {
                hungerElement.classList.add('text-danger');
            } else {
                hungerElement.classList.add('text-success');
            }

            if (showerElement.textContent === 'Dirty') {
                showerElement.classList.add('text-danger');
            } else {
                showerElement.classList.add('text-success');
            }

            if (playElement.textContent === 'Upset') {
                playElement.classList.add('text-danger');
            } else {
                playElement.classList.add('text-success');
            }
        });

    };
    fetchMethod(currentUrl + `/api/users/singleUser`, callbackForUserInfo, "GET", null, localStorage.getItem("token"));
    fetchMethod(currentUrl + "/api/ownedpet/userownedpets", callbackForShowPets, "GET", null, localStorage.getItem("token"));
})