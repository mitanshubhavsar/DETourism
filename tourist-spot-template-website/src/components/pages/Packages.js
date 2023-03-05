import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import MoreInfoModel from "../MoreInfoModel";
import ReviewModel from "../ReviewModel";
import { useStateValue } from "../../ContextAPI/StateProvider";
import "./Packages.css";

import axios from "../../axiosUsers";

export default function Services() {
  const [packages, setPackages] = useState(null);
  const [hotelState, setHotelState] = useState(null);
  const [exploreStateHotels, setExploreStateHotels] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [reviewModalIsOpen, setReviewModelIsOpen] = useState(false);
  const [selectedReviewState, setSelectedReviewState] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [, dispatch] = useStateValue();

  const [destinationData, setDestinationData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  function openModal() {
    setIsOpen(true);
    setExploreStateHotels("Gujarat");
  }

  function closeModal() {
    setIsOpen(false);
    setHotelState(null);
    setExploreStateHotels(null);
    setDestinationData(null);
    setSelectedCity(null);
    setTabIndex(0);
  }

  function openReviewModal(state) {
    setReviewModelIsOpen(true);
  }

  function closeReviewModal() {
    setReviewModelIsOpen(false);
  }

  const addToBasket = (addedPacket) => {
    //dispatch the item into the Data Layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        state: addedPacket.state,
        image: addedPacket.image,
        accomodation: addedPacket.accomodation,
        days: addedPacket.days,
        nights: addedPacket.nights,
        price: addedPacket.price,
        reviews: addedPacket.reviews,
      },
    });
  };

  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await axios.get("/packages.json");
        setPackages(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPackages();
  }, []);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        axios
          .get(`/destinations/${hotelState.toLowerCase()}.json`)
          .then((response) => {
            setDestinationData(response.data);
          });
      } catch (error) {
        console.error(error);
      }
    }
    if (hotelState) {
      fetchDestinations();
    }
  }, [hotelState]);

  return (
    <section id="pack" class="packages">
      <div class="container">
        <div class="gallary-header text-center">
          <h1>Special Packages</h1>
          <h3>
            Grab our best package offer deals to add more experience in our
            Journey !
          </h3>
        </div>
        <MoreInfoModel
          modalIsOpen={modalIsOpen}
          openModal={openModal}
          closeModal={closeModal}
          hotelState={hotelState}
          exploreStateHotels={exploreStateHotels}
          setExploreStateHotels={setExploreStateHotels}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          destinationData={destinationData}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />

        <div class="packages-content">
          <div class="row">
            {selectedReviewState ? (
              <ReviewModel
                reviewModalIsOpen={reviewModalIsOpen}
                openReviewModal={openReviewModal}
                closeReviewModal={closeReviewModal}
                selectedReviewState={selectedReviewState}
                packages={packages}
              />
            ) : null}

            {packages &&
              Object.keys(packages).map((item, i) => {
                return (
                  <>
                    <div class="col-md-4 col-sm-6">
                      <div class="single-package-item">
                        <img
                          src={
                            require(`../../assets/images/${packages[item].image}`)
                              .default
                          }
                          alt="package-place"
                        />
                        <div class="single-package-item-txt">
                          <h3>
                            {packages[item].state}{" "}
                            <span style={{ marginLeft: "32px" }}>
                              Rs.&nbsp;
                              {packages[item].price.toLocaleString(
                                navigator.language
                              )}
                            </span>
                          </h3>
                          <div class="packages-para">
                            <p>
                              <span>
                                <i class="fa fa-angle-right"></i>{" "}
                                {packages[item].days} days{" "}
                                {packages[item].nights} nights
                              </span>
                              <i class="fa fa-angle-right"></i> 5 star
                              accomodation
                            </p>
                            <p>
                              <span>
                                <i class="fa fa-angle-right"></i> transportation
                              </span>
                              <i class="fa fa-angle-right"></i> food facilities
                            </p>
                          </div>
                          <div class="packages-review">
                            <p>
                              <StarRatings
                                rating={packages[item].accomodation}
                                starRatedColor="yellow"
                                numberOfStars={5}
                                name="rating"
                                starDimension="24px"
                                starSpacing="1px"
                              />
                              <span
                                onClick={() => {
                                  setSelectedReviewState(packages[item].state);
                                  openReviewModal();
                                }}
                                className="reviews_btn"
                              >
                                {Object.keys(packages[item].reviews).length}{" "}
                                reviews
                              </span>
                            </p>
                          </div>
                          <div class="packages_about-btn">
                            <button
                              class="about-view packages-btn"
                              onClick={() => addToBasket(packages[item])}
                            >
                              book now
                            </button>
                          </div>
                          <div class="packages_moreinfo-btn">
                            <button
                              class="about-view packages-btn pck_moreinfo_btn"
                              onClick={() => {
                                setHotelState(packages[item].state);
                                openModal();
                              }}
                            >
                              more info
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
