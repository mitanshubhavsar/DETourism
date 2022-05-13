import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useStateValue } from "../ContextAPI/StateProvider";
import StarRatings from "react-star-ratings";
import "./MoreInfoModel.css";
import axios from "../axiosUsers";
import "react-datepicker/dist/react-datepicker.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const customStyles = {
  content: {
    top: "15%",
    left: "15%",
    right: "15%",
  },
};

export default function MoreInfoModel(props) {
  const [{ basket, user }, dispatch] = useStateValue();

  const [hotelsData, setHotelsData] = useState(null);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const response = await axios.get("/hotels.json");
        setHotelsData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchHotels();
  }, []);

  return (
    <div>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="travelinfo_mod_close_btn" onClick={props.closeModal}>
          <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        <Tabs selectedIndex={props.tabIndex}>
          <TabList className="model-tabs">
            <Tab onClick={() => props.setTabIndex(0)}>
              <div className="model-tabs-panel">
                <i class="fa fa-building mr-2"></i>
                package Hotels
              </div>
            </Tab>

            <Tab onClick={() => props.setTabIndex(1)}>
              <div className="model-tabs-panel">
                <i class="fa fa-search mr-2" aria-hidden="true"></i>
                Explore Hotels
              </div>
            </Tab>

            <Tab onClick={() => props.setTabIndex(2)}>
              <div className="model-tabs-panel">
                <i class="fa fa-tree mr-2"></i>
                destinations
              </div>
            </Tab>
          </TabList>

          <TabPanel>
            <div className="row">
              <div class="single-tab-select-box">
                <h2 className="ml-4 mb-2 mt-3 Avai_hotel_heading">
                  Included Hotels in Package :
                </h2>
              </div>
            </div>

            {hotelsData &&
              props.hotelState &&
              Object.keys(hotelsData[props.hotelState]).map((item) => {
                return (
                  <div className="hotels_card">
                    <div className="hotels_img">
                      <img
                        src={
                          require(`../assets/images/hotels/${
                            hotelsData[props.hotelState][item].image
                          }`).default
                        }
                        alt="hotels-place"
                        height="155px"
                        width="230px"
                      />
                    </div>
                    <div className="hotels_details">
                      <div className="hotels_title">
                        <div className="hotels_name">
                          {hotelsData[props.hotelState][item].name}
                        </div>
                        <div className="hotels_city ml-5">
                          {hotelsData[props.hotelState][item].city}
                        </div>
                      </div>
                      <div className="hotelss_info">
                        <div>{hotelsData[props.hotelState][item].intro}</div>
                        <div style={{ marginTop: "10px" }}>
                          <i class="fa fa-angle-right mr-2"></i>
                          Amenities: <br />
                          {hotelsData[props.hotelState][item].amenities}
                        </div>
                        <div className="d-flex align-items-center">
                          <i class="fa fa-angle-right mr-2"></i>
                          <div className="mr-3">Rating:</div>
                          <StarRatings
                            rating={hotelsData[props.hotelState][item].rating}
                            starRatedColor="yellow"
                            numberOfStars={5}
                            name="rating"
                            starDimension="24px"
                            starSpacing="1px"
                            className="orders_info"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </TabPanel>
          <TabPanel>
            <div class="tab-para">
              <div className="row">
                <div class="single-tab-select-box">
                  <h2 className="mb-5">
                    Select a State to check out its Hotels :
                  </h2>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-6">
                  <div class="single-tab-select-box">
                    <h2>Select State:</h2>
                    <div class="travel-select-icon">
                      <select
                        class="form-control "
                        value={props.exploreStateHotels}
                        onChange={(e) =>
                          props.setExploreStateHotels(e.target.value)
                        }
                      >
                        <option selected="true" disabled="disabled">
                          Enter State
                        </option>
                        {hotelsData &&
                          Object.keys(hotelsData).map((item, i) => {
                            return <option value={item}>{item}</option>;
                          })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {hotelsData &&
                props.exploreStateHotels &&
                Object.keys(hotelsData[props.exploreStateHotels]).map(
                  (item) => {
                    return (
                      <div className="hotels_card">
                        <div className="hotels_img">
                          <img
                            src={
                              require(`../assets/images/hotels/${
                                hotelsData[props.exploreStateHotels][item].image
                              }`).default
                            }
                            alt="hotels-place"
                            height="155px"
                            width="230px"
                          />
                        </div>
                        <div className="hotels_details">
                          <div className="hotels_title">
                            <div className="hotels_name">
                              {hotelsData[props.exploreStateHotels][item].name}
                            </div>
                            <div className="hotels_city ml-5">
                              {hotelsData[props.exploreStateHotels][item].city}
                            </div>
                          </div>
                          <div className="hotelss_info">
                            <div>
                              {hotelsData[props.exploreStateHotels][item].intro}
                            </div>
                            <div style={{ marginTop: "10px" }}>
                              <i class="fa fa-angle-right mr-2"></i>
                              Amenities: <br />
                              {
                                hotelsData[props.exploreStateHotels][item]
                                  .amenities
                              }
                            </div>
                            <div className="d-flex align-items-center">
                              <i class="fa fa-angle-right mr-2"></i>
                              <div className="mr-3">Rating:</div>
                              <StarRatings
                                rating={
                                  hotelsData[props.exploreStateHotels][item]
                                    .rating
                                }
                                starRatedColor="yellow"
                                numberOfStars={5}
                                name="rating"
                                starDimension="24px"
                                starSpacing="1px"
                                className="orders_info"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          </TabPanel>
          <TabPanel>
            <div class="row">
              <div class="col-lg-4 col-md-5 col-sm-6">
                <div class="single-tab-select-box">
                  <h2>Select a city:</h2>
                  <div class="travel-select-icon">
                    <select
                      class="form-control "
                      value={props.selectedCity}
                      onChange={(e) => props.setSelectedCity(e.target.value)}
                    >
                      <option selected="true" disabled="disabled">
                        enter your destination city
                      </option>
                      {props.destinationData &&
                        Object.keys(props.destinationData).map((item, i) => {
                          return (
                            <option selected="true" value={item}>
                              {item}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <section id="blog" class="moreInfo_Des">
              <div class="container">
                <div class="blog-details">
                  {props.selectedCity ? (
                    <div class="blog-content">
                      <div class="row">
                        {props.selectedCity &&
                          Object.keys(
                            props.destinationData[props.selectedCity]
                          ).map((item, i) => {
                            return (
                              <div class="col-sm-4 col-md-4">
                                <div class="thumbnail">
                                  <h2>{item}</h2>
                                  <div class="thumbnail-img">
                                    <img
                                      src={
                                        require(`../assets/images/${
                                          props.destinationData[
                                            props.selectedCity
                                          ][item].image
                                        }`).default
                                      }
                                      alt="blog-img"
                                    />
                                    <div class="thumbnail-img-overlay"></div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ) : (
                    <div class="gallary-header text-center">
                      <h2 style={{ marginBottom: "16px" }}>
                        Explore these Destinations
                      </h2>
                      <h5>
                        Travel these wonderful destinations with great joyful
                        experience!
                      </h5>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </TabPanel>
        </Tabs>
      </Modal>
    </div>
  );
}
