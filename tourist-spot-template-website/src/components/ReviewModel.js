import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useStateValue } from "../ContextAPI/StateProvider";
import StarRatings from "react-star-ratings";
import axios from "../axiosUsers";
import { useHistory } from "react-router-dom";

export default function ReviewModel(props) {
  const [{ basket, user }, dispatch] = useStateValue();

  const [currentRating, setCurrentRating] = useState(4);
  const [reviewComments, setReviewComments] = useState(null);

  const history = useHistory();

  const clearReviewForm = () => {
    setReviewComments("");
  };

  const submitReviews = (e) => {
    e.preventDefault();

    const userReviews = {
      user: user.email,
      rating: currentRating,
      comments: reviewComments,
    };
    axios
      .post(`/packages/${props.selectedReviewState}/reviews.json`, userReviews)
      .then((response) => {
        console.log(response);
        clearReviewForm();
        props.closeReviewModal();
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const customStyles = {
    content: {
      top: "15%",
      left: "15%",
      right: "15%",
    },
  };

  const settingCurrentRating = (newRating) => {
    setCurrentRating(newRating);
  };

  return (
    <div>
      <Modal
        isOpen={props.reviewModalIsOpen}
        onRequestClose={props.closeReviewModal}
        style={customStyles}
        contentLabel="Review Modal"
      >
        <div
          className="travelinfo_mod_close_btn"
          onClick={props.closeReviewModal}
        >
          <i class="fa fa-times" aria-hidden="true"></i>
        </div>

        <div className="d-flex flex-column align-items-center">
          <div>
            <h3>Reviews of {props.selectedReviewState} Package </h3>
          </div>

          {Object.keys(props.packages[props.selectedReviewState].reviews).map(
            (item, i) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "80%",
                    marginTop: "20px",
                  }}
                >
                  <div>
                    User: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp;
                    {
                      props.packages[props.selectedReviewState].reviews[item]
                        .user
                    }
                  </div>
                  <div>
                    {" "}
                    Rating: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                    <StarRatings
                      rating={
                        props.packages[props.selectedReviewState].reviews[item]
                          .rating
                      }
                      starRatedColor="yellow"
                      numberOfStars={5}
                      name="rating"
                      starDimension="24px"
                      starSpacing="1px"
                    />
                  </div>
                  <div>
                    Comments: &nbsp; &nbsp;{" "}
                    {
                      props.packages[props.selectedReviewState].reviews[item]
                        .comments
                    }
                  </div>
                  <div
                    style={{
                      border: "0.2px solid darkgrey",
                      marginTop: "15px",
                    }}
                  ></div>
                </div>
              );
            }
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            marginTop: "80px",
          }}
        >
          <div
            className="d-flex justify-content-center"
            style={{ fontSize: "22px" }}
          >
            Add Your Comments & Rating
          </div>
          <div className="mt-4 ml-4 d-flex justify-content-center">
            {" "}
            Rating: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
            <StarRatings
              rating={currentRating}
              starRatedColor="yellow"
              starHoverColor="yellow"
              numberOfStars={5}
              changeRating={settingCurrentRating}
              name="rating"
              starDimension="24px"
              starSpacing="1px"
            />
          </div>
          <div class="form-group">
            <div className="d-flex justify-content-center mt-2">
              <label style={{ marginRight: "15px", marginLeft: "20px" }}>
                Your Comments:
              </label>
              <textarea
                id="exampleFormControlTextarea1"
                rows="3"
                cols="50"
                onChange={(e) => setReviewComments(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div style={{ letterSpacing: "1.2px", marginTop: "10px" }}>
              <button class="about-view packages-btn" onClick={submitReviews}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
