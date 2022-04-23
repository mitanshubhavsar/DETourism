import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import MoreInfoModel from "../MoreInfoModel";
import { useStateValue } from "../../ContextAPI/StateProvider";
import "./Packages.css";

import axios from "../../axiosUsers";

export default function Services() {
  const [packages, setPackages] = useState(null);
  const [hotelState, setHotelState] = useState("Gujarat");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [, dispatch] = useStateValue();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
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
        />
        <div class="packages-content">
          <div class="row">
            {packages &&
              Object.keys(packages).map((item, i) => {
                return (
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
                              {packages[item].days} days {packages[item].nights}{" "}
                              nights
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
                            <span>{packages[item].reviews} review</span>
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
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
