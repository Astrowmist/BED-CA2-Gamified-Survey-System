// JS for users.html. Shows all users
const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const petList = document.getElementById("userList");
    responseData.rows.forEach((user) => {
        const displayItem = document.createElement("div");
        displayItem.className =
            "col-xl-3 col-lg-5 col-md-6 col-sm-7 col-xs-12 p-3 px-2";
        displayItem.innerHTML = `
          <div class="card pinkcard">
              <div class="card-body">
                  <h6 class="card-title">Username: ${user.username}</h6>
                  <p class="card-text">
                      User ID: ${user.user_id} <br>
                      Points: ${user.points} <br>
                  </p>
              </div>
          </div>
          `;
        petList.appendChild(displayItem);
    });
};

fetchMethod(currentUrl + "/api/users", callback);