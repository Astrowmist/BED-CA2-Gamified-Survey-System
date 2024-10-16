// JS for quest.js
const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const questList = document.getElementById("questList");
    responseData.forEach((quest) => {
        const displayItem = document.createElement("div");
        function capitalizeWords(str) {
            return str.split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' ');
        }
        quest.quest_desc=capitalizeWords(quest.quest_desc)
        displayItem.className =
            "col-xl-3 col-lg-4 col-md-5 col-sm-6 col-xs-12 p-3 px-2";
        displayItem.innerHTML = `
          <div class="card pinkcard">
              <img src="../images/quests/quest${quest.quest_id}.png" class="card-img-top quest" alt="Quest Image">
              <div class="card-body">
                  <h6 class="card-title">Name: ${quest.quest_name}</h6>
                  <p class="card-text">
                      ID: ${quest.quest_id} <br>
                      Desc: ${quest.quest_desc} <br><br>
                      Boss HP: ${quest.boss_hp} <br>
                      Boss ATK: ${quest.boss_atk} <br>
                      Boss DEF: ${quest.boss_def} <br>
                  </p>
                  <a class="btn allbutton btn-danger" id="quest-${quest.quest_id}">Accept</a>
              </div>
          </div>
          `;
        questList.appendChild(displayItem);

        const acceptButton = document.getElementById(`quest-${quest.quest_id}`);
        acceptButton.addEventListener("click", (event) => {
            event.preventDefault();
            window.location.href = `chooseQuestPet.html?quest_id=${quest.quest_id}`;
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

fetchMethod(currentUrl + "/api/quest", callback);