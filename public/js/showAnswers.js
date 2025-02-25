// JS for showing all answers
url = new URL(document.URL);
const urlParams = url.searchParams;
const questionId = urlParams.get("questionId");


const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);


    const petList = document.getElementById("surveyAnswers");
    const question = document.getElementById("question");
    if(responseStatus=404){
        question.textContent="This question has no answers yet. Be the first to submit one !"
    }
    question.textContent=responseData.rows[0].question
    responseData.rows.forEach((answer) => {
        answer.creation_date = answer.creation_date.split("T")[0];
        const displayItem = document.createElement("div");
        displayItem.className =
            "col-xl-4 col-lg-5 col-md-5 col-sm-6 col-xs-12 p-3 px-2";
        displayItem.innerHTML = `
          <div class="card pinkcard">
              <div class="card-body">
                  <h6 class="card-title">Answer: ${answer.answer}</h6>
                  <div class="card-text"  style="height: 100%;">
                     <p> Additional Notes: ${answer.additional_notes} </p>
                     <p> Participant ID: ${answer.participant_id} </p>
                      <p>Creation Date: ${answer.creation_date} </p>
                  </div>
              </div>
          </div>
          `;
        petList.appendChild(displayItem);
    });
};

fetchMethod(currentUrl + "/api/questions/" + questionId + "/answers", callback,"GET",null,localStorage.getItem("token"));