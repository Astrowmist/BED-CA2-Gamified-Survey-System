// JS for survey.js
document.addEventListener("DOMContentLoaded", function () {

  function updateCharCount(textareaId, maxChars) {
    const textarea = document.getElementById(textareaId);
    const charCountDiv = document.getElementById(`charCount-${textareaId.split('-')[1]}`);

    // Initial count display
    charCountDiv.textContent = `${maxChars} characters left`;

    textarea.addEventListener('input', () => {
        const remainingChars = maxChars - textarea.value.length;
        charCountDiv.textContent = `${remainingChars} characters left`;
    });
}

  const createQuestionForm = document.getElementById("createSurveyQuestion");

  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    if (responseStatus == 201) {
      // Reset the form fields
      createQuestionForm.reset();
      // Check if create player was successful
      window.location.href = "survey.html";
    } else {
      alert(responseData.message);
    }
  };

  const callbackForShowQuestions = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const questionList = document.getElementById("surveyQuestions");
    responseData.rows.forEach((question) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        `col-12`;
      displayItem.id = `showquestion`;
      displayItem.innerHTML = `
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">${question.question}</h5>
                      <div class="row">
                      <div class="col-12">
                      <p class="card-text">
                          Question Id: ${question.question_id} <br>
                          Creator Id: ${question.creator_id} <br>
                      </p>
                      </div>
                      </div>
                      <div class="row">
                      <div class="col-6 radiobutton">
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="radio-${question.question_id}" value="True" required/>
                        <label class="form-check-label" for="true">
                             True
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="radio-${question.question_id}" value="False"/>
                        <label class="form-check-label" for="false">
                             False
                        </label>
                      </div>
                      </div>
                      <div class="col-6">
                      <div class="mb-3">
                      <label for="additionalNotes" class="form-label">Additional Notes</label>
                      <textarea class="form-control" id="additionalNotes-${question.question_id}" rows="3" maxlength="60"></textarea>
                      <div id="charCount-${question.question_id}" class="text-muted mt-1">60 characters left</div>
                      </div>
                      </div>
                      </div>
                    <div class="d-flex justify-content-between mt-3">
                    <a class="btn allbutton pinkbutton" id="submit-${question.question_id}">Submit</a>
                    <div>
                        <a class="btn btn-primary allbutton" href="showAnswers.html?questionId=${question.question_id}">Show Answers</a>
                        <a class="btn orangebutton allbutton" id="update-${question.question_id}">Update</a>
                        <a class="btn btn-danger allbutton" id="delete-${question.question_id}">Delete</a>
                    </div>
                    </div>
                  </div>
              </div>
              `;
      questionList.appendChild(displayItem);
      updateCharCount(`additionalNotes-${question.question_id}`, 60); // Set maximum characters to 62

      const updateButton = document.getElementById(`update-${question.question_id}`);
      updateButton.addEventListener("click", (event) => {
        event.preventDefault();

        window.location.href = `updateQuestion.html?question_id=${question.question_id}`;
      });

      const deleteButton = document.getElementById(`delete-${question.question_id}`);
      deleteButton.addEventListener("click", (event) => {
        event.preventDefault();
        const callbackForDelete = (responseStatus, responseData) => {
          if (responseStatus == 204) {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
            window.location.reload()
          } else {
            alert(responseData.message);
          }

        };
        fetchMethod(currentUrl + "/api/questions/" + question.question_id, callbackForDelete, 'DELETE', null, localStorage.getItem("token"));
      });


      const submitButton = document.getElementById(`submit-${question.question_id}`);
      const surveyForm = document.getElementById("surveyForm");
      const points = document.getElementById("points");
      submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        var selectedOption = document.querySelector(`input[id="radio-${question.question_id}"]:checked`).value;
        if (selectedOption == "False")
          selectedOption = false
        else selectedOption = true
        var addNotes = document.getElementById(`additionalNotes-${question.question_id}`).value;
        const data = {
          answer: selectedOption,
          creation_date: new Date().toISOString().split('T')[0],
          additional_notes: addNotes
        };
        const callbackForSubmit = (responseStatus, responseData) => {
          if (responseStatus == 201) {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
            surveyForm.reset()
            var oldPoints = parseInt(points.textContent.slice(8));
            animatePoints(points, oldPoints + 5, 800);
          } else {
            alert(responseData.message);
          }

        };
        fetchMethod(currentUrl + "/api/questions/" + question.question_id + "/answers", callbackForSubmit, 'POST', data, localStorage.getItem("token"));
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
  fetchMethod(currentUrl + "/api/questions", callbackForShowQuestions);

  createQuestionForm.addEventListener("submit", function (event) {
    console.log("createQuestionForm.addEventListener");
    event.preventDefault();

    const question = document.getElementById("createValue").value;
    const data = {
      question: question,
    };
    // Perform login request
    fetchMethod(currentUrl + "/api/questions", callback, "POST", data, localStorage.getItem("token"));
  });
});
