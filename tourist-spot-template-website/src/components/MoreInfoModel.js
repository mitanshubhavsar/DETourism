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
    //overflow: "none",
    // right: "auto",
    // bottom: "auto",
    // marginRight: "-50%",
    //transform: "translate(-50%, -50%)",
  },
};

export default function MoreInfoModel(props) {
  const [{ basket, user }, dispatch] = useStateValue();
  const [destinationData, setDestinationData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
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

    async function fetchDestinations() {
      try {
        axios
          .get(`/destinations/${props.hotelState.toLowerCase()}.json`)
          .then((response) => {
            setDestinationData(response.data);
            console.log(response.data);
            console.log("my bitch");
          });
      } catch (error) {
        console.error(error);
        console("fuck you");
      }
    }
    if (props.hotelState) {
      fetchDestinations();
    }
  }, [props.hotelState]);

  const [tabIndex, setTabIndex] = useState(0);

  const [exploreStateHotels, setExploreStateHotels] = useState("Gujarat");

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
        <Tabs selectedIndex={tabIndex}>
          <TabList className="model-tabs">
            <Tab onClick={() => setTabIndex(0)}>
              <div className="model-tabs-panel">
                <i class="fa fa-building mr-2"></i>
                package Hotels
              </div>
            </Tab>

            <Tab onClick={() => setTabIndex(1)}>
              <div className="model-tabs-panel">
                <i class="fa fa-search mr-2" aria-hidden="true"></i>
                Explore Hotels
              </div>
            </Tab>

            <Tab onClick={() => setTabIndex(2)}>
              <div className="model-tabs-panel">
                <i class="fa fa-building mr-2"></i>
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
                        value={exploreStateHotels}
                        onChange={(e) => setExploreStateHotels(e.target.value)}
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
                Object.keys(hotelsData[exploreStateHotels]).map((item) => {
                  return (
                    <div className="hotels_card">
                      <div className="hotels_img">
                        <img
                          src={
                            require(`../assets/images/hotels/${hotelsData[exploreStateHotels][item].image}`)
                              .default
                          }
                          alt="hotels-place"
                          height="155px"
                          width="230px"
                        />
                      </div>
                      <div className="hotels_details">
                        <div className="hotels_title">
                          <div className="hotels_name">
                            {hotelsData[exploreStateHotels][item].name}
                          </div>
                          <div className="hotels_city ml-5">
                            {hotelsData[exploreStateHotels][item].city}
                          </div>
                        </div>
                        <div className="hotelss_info">
                          <div>
                            {hotelsData[exploreStateHotels][item].intro}
                          </div>
                          <div style={{ marginTop: "10px" }}>
                            <i class="fa fa-angle-right mr-2"></i>
                            Amenities: <br />
                            {hotelsData[exploreStateHotels][item].amenities}
                          </div>
                          <div className="d-flex align-items-center">
                            <i class="fa fa-angle-right mr-2"></i>
                            <div className="mr-3">Rating:</div>
                            <StarRatings
                              rating={
                                hotelsData[exploreStateHotels][item].rating
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
                })}
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
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      <option selected="true" disabled="disabled">
                        enter your destination city
                      </option>
                      {destinationData &&
                        Object.keys(destinationData).map((item, i) => {
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
                  {selectedCity ? (
                    <div class="blog-content">
                      <div class="row">
                        {selectedCity &&
                          Object.keys(destinationData[selectedCity]).map(
                            (item, i) => {
                              return (
                                <div class="col-sm-4 col-md-4">
                                  <div class="thumbnail">
                                    <h2>{item}</h2>
                                    <div class="thumbnail-img">
                                      <img
                                        src={
                                          require(`../assets/images/${destinationData[selectedCity][item].image}`)
                                            .default
                                        }
                                        alt="blog-img"
                                      />
                                      <div class="thumbnail-img-overlay"></div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
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
