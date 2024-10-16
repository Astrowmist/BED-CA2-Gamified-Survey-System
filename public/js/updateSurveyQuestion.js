// JS for updating survey question
document.addEventListener("DOMContentLoaded", function () {
    const UpdateQuestionForm = document.getElementById("UpdateSurveyQuestion");
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const questionId = urlParams.get("question_id");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 200) {
            // Reset the form fields
            UpdateQuestionForm.reset();
            // Check if create player was successful
            window.location.reload();
        } else {
            alert(responseData.message);
        }
    };

    const callbackToGetQuestion = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 200) {
            const oneQuestion = document.getElementById("surveyQuestion");
            const displayItem = document.createElement("div");
            displayItem.className =
                `col-12`;
            displayItem.id = `showquestion`;
            displayItem.innerHTML = `
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title"> Question: ${responseData[0].question}</h5>
                      <div class="row">
                      <div class="col-12">
                      <p class="card-text">
                          Question Id: ${responseData[0].question_id} <br>
                          Creator Id: ${responseData[0].creator_id} <br>
                      </p>
                      </div>
                      </div>
                  </div>
              </div>
              `;
            oneQuestion.appendChild(displayItem);
        } else {
            alert(responseData.message);
        }
    };

    UpdateQuestionForm.addEventListener("submit", function (event) {
        console.log("UpdateQuestionForm.addEventListener");
        event.preventDefault();

        const updatedQuestion = document.getElementById("updateValue").value;
        const data = {
            question: updatedQuestion,
        };
        // Perform login request
        fetchMethod(currentUrl + "/api/questions/" + questionId, callback, "PUT", data, localStorage.getItem("token"));
    });
    fetchMethod(currentUrl + "/api/questions/" + questionId, callbackToGetQuestion, "GET", null, localStorage.getItem("token"));
})