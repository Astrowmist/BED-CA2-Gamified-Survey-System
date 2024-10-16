// JS for review.js. Functionality for creating/updating/deleting reviews
document.addEventListener("DOMContentLoaded", function () {

    const createReviewForm = document.getElementById("createReview");
    const rateInputs = document.querySelectorAll('.rate input[type="radio"]');

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 201) {
            // Reset the form fields
            createReviewForm.reset();
            window.location.reload()
        } else if(responseStatus==401){
            localStorage.removeItem("token");
            window.location.href = "login.html";
        }else {
            alert(responseData.message);
        }
    };

    const callbackForShowReviews = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const reviewList = document.getElementById("Reviews");
        responseData.forEach((review) => {
            const displayItem = document.createElement("div");
            displayItem.className =
                `col-xl-4 col-lg-5 col-md-5 col-sm-6 col-xs-12 p-3 px-2`;
            displayItem.id = `showquestion`;
            displayItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Username: ${review.username}</h5>
                        <div class="row">
                            <div class="col-12">
                            <p class="card-text">
                                Rating: <strong>${review.review_amt}</strong> <br>
                                User ID: ${review.user_id} <br>
                                Creation Date: ${review.created_at} <br>
                            </p>
                            </div>
                        </div>
        <div class="button-group">
            <a class="btn orangebutton allbutton" id="edit-${review.id}">Edit</a>
            <a class="btn btn-danger allbutton" id="delete-${review.id}">Delete</a>
        </div>
                    </div>
                    <div id="editForm-${review.id}" style="display: none; margin-top: 10px;" class="staredit">
                    <div class="ratechange mx-auto">
                        <input type="radio" id="star5-${review.id}" name="ratechange" value="5" />
                        <label for="star5-${review.id}" title="text">5 stars</label>
                        <input type="radio" id="star4-${review.id}" name="ratechange" value="4" />
                        <label for="star4-${review.id}" title="text">4 stars</label>
                        <input type="radio" id="star3-${review.id}" name="ratechange" value="3" />
                        <label for="star3-${review.id}" title="text">3 stars</label>
                        <input type="radio" id="star2-${review.id}" name="ratechange" value="2" />
                        <label for="star2-${review.id}" title="text">2 stars</label>
                        <input type="radio" id="star1-${review.id}" name="ratechange" value="1" />
                        <label for="star1-${review.id}" title="text">1 star</label>
                    </div>
        <div class="button-group-edit p-2">
            <a href="#" class="btn pinkbutton allbutton" id="confirm-${review.id}" style="margin-top: 5px;">Confirm Changes</a>
            <a href="#" class="btn btn-secondary allbutton" id="cancel-${review.id}" style="margin-top: 5px;">Cancel</a>
        </div>
                    </div>
                </div>
                `;
            reviewList.appendChild(displayItem)

            const deleteButton = document.getElementById(`delete-${review.id}`);
            deleteButton.addEventListener("click", (event) => {
                event.preventDefault();
                const callbackForDelete = (responseStatus, responseData) => {
                    if (responseStatus == 204) {
                        console.log("responseStatus:", responseStatus);
                        console.log("responseData:", responseData);
                        window.location.reload();
                    } else if(responseStatus==401){
                        localStorage.removeItem("token");
                        window.location.href = "login.html";
                    }else {
                        alert(responseData.message);
                    }
                };
                fetchMethod(currentUrl + "/api/review/" + review.id, callbackForDelete, 'DELETE', null, localStorage.getItem("token"));
            });
            const editButton = document.getElementById(`edit-${review.id}`);
            editButton.addEventListener("click", (event) => {
                event.preventDefault();
                document.getElementById(`editForm-${review.id}`).style.display = 'block';
            });

            const confirmButton = document.getElementById(`confirm-${review.id}`);
            confirmButton.addEventListener("click", (event) => {
                event.preventDefault();
                const rateInputsEdit = document.querySelectorAll('.ratechange input[type="radio"]');

                let selectedStars = 0;
                rateInputsEdit.forEach((input) => {
                    if (input.checked) {
                        selectedStars = input.value;
                    }
                });
                console.log("Selected stars:", selectedStars);

                const data = {
                    review_amt: selectedStars
                };
                const callbackForEdit = (responseStatus, responseData) => {
                    console.log("responseStatus:", responseStatus);
                    console.log("responseData:", responseData);
                    if (responseStatus === 204) {
                        window.location.reload()
                    } else if(responseStatus==401){
                        localStorage.removeItem("token");
                        window.location.href = "login.html";
                    }else{
                        alert(responseData.message)
                    }
                };

                fetchMethod(currentUrl + `/api/review/${review.id}`, callbackForEdit, 'PUT', data, localStorage.getItem("token"));
            });

            const cancelButton = document.getElementById(`cancel-${review.id}`);
            cancelButton.addEventListener("click", (event) => {
                event.preventDefault();
                document.getElementById(`editForm-${review.id}`).style.display = 'none';
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
    fetchMethod(currentUrl + "/api/review", callbackForShowReviews);

    createReviewForm.addEventListener("submit", function (event) {
        console.log("createReviewForm.addEventListener");
        event.preventDefault();

        let selectedStars = 0;
        rateInputs.forEach((input) => {
            if (input.checked) {
                selectedStars = input.value;
            }
        });
        console.log("Selected stars:", selectedStars);

        const data = {
            review_amt: selectedStars
        };
        // Perform login request
        fetchMethod(currentUrl + "/api/review", callback, "POST", data, localStorage.getItem("token"));
    });
});