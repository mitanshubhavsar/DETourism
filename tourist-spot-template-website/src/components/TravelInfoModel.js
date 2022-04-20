import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useStateValue } from "../ContextAPI/StateProvider";
import StarRatings from "react-star-ratings";
import "./TravelInfoModel.css";
import DatePicker from "react-datepicker";
import axios from "../axiosUsers";
import "react-datepicker/dist/react-datepicker.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const customStyles = {
  content: {
    top: "15%",
    left: "15%",
    right: "15%",
    // right: "auto",
    // bottom: "auto",
    // marginRight: "-50%",
    //transform: "translate(-50%, -50%)",
  },
};

export default function TravelInfoModel() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [hotelsData, setHotelsData] = useState(null);
  const [selectedHotelsData, setSelectedHotelsData] = useState(null);

  const getTourInfo = (
    startTourDate,
    endTourDate,
    selectedTourDuration,
    selectedTourMembers
  ) => {
    if (
      startTourDate.length !== basket.length ||
      endTourDate.length !== basket.length ||
      selectedTourDuration.length !== basket.length ||
      selectedTourMembers.length !== basket.length
    ) {
      alert("Please enter all Tour Information details");
      setTabIndex(2);
    } else {
      for (let i = 0; i < basket.length; i++) {
        dispatch({
          type: "SET_TOURINFO",
          tourInfo: {
            destination: basket[i].state,
            startTour: startTourDate[i],
            endTour: endTourDate[i],
            TourDuration: selectedTourDuration[i],
            TourMembers: selectedTourMembers[i],
          },
        });
      }
    }
  };

  const getHotelInfo = (
    checkInHotelsDate,
    checkOutHotelsDate,
    selectedHotelDuration,
    selectedHotelMembers
  ) => {
    if (
      checkInHotelsDate.length !== basket.length ||
      checkOutHotelsDate.length !== basket.length ||
      selectedHotelDuration.length !== basket.length ||
      selectedHotelMembers.length !== basket.length
    ) {
      alert("Please enter all Hotel Information details");
      setTabIndex(3);
    } else {
      for (let i = 0; i < basket.length; i++) {
        dispatch({
          type: "SET_HOTELS",
          hotelsInfo: {
            destination: basket[i].state,
            checkInDate: checkInHotelsDate[i],
            checkoutDate: checkOutHotelsDate[i],
            hotelDuration: selectedHotelDuration[i],
            hotelMembers: selectedHotelMembers[i],
          },
        });
      }
      closeModal();
    }
  };

  const filterHotels = () => {
    const selectedHotels = [];
    basket.forEach((element) => {
      selectedHotels.push(element.state);
    });
    setSelectedHotelsData(selectedHotels);
  };

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

  const [modalIsOpen, setIsOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const [startTourDate, setStartTourDate] = useState([]);
  const [endTourDate, setEndTourDate] = useState([]);
  const [selectedTourDuration, setSelectedTourDuration] = useState([]);
  const [selectedTourMembers, setSelectedTourMembers] = useState([]);

  const [checkInHotelsDate, setCheckInHotelsDate] = useState([]);
  const [checkOutHotelsDate, setCheckOutHotelsDate] = useState([]);
  const [selectedHotelDuration, setSelectedHotelDuration] = useState([]);
  const [selectedHotelMembers, setSelectedHotelMembers] = useState([]);

  const [exploreStateHotels, setExploreStateHotels] = useState("Gujarat");

  //Setting for Tour
  const settingStartTourDate = (date, i) => {
    const newArray = [...startTourDate];
    newArray[i] = date;
    setStartTourDate(newArray);
  };

  const settingEndTourDate = (date, i) => {
    const newArray = [...endTourDate];
    newArray[i] = date;
    setEndTourDate(newArray);
  };

  const settingTourDuration = (duration, i) => {
    const newArray = [...selectedTourDuration];
    newArray[i] = duration;
    setSelectedTourDuration(newArray);
  };

  const settingTourMembers = (members, i) => {
    const newArray = [...selectedTourMembers];
    newArray[i] = members;
    setSelectedTourMembers(newArray);
  };

  //setting for Hotels
  const settingCheckInHotelsDate = (date, i) => {
    const newArray = [...checkInHotelsDate];
    newArray[i] = date;
    setCheckInHotelsDate(newArray);
  };

  const settingCheckOutHotelsDate = (date, i) => {
    const newArray = [...checkOutHotelsDate];
    newArray[i] = date;
    setCheckOutHotelsDate(newArray);
  };

  const settingHotelsDuration = (duration, i) => {
    const newArray = [...selectedHotelDuration];
    newArray[i] = duration;
    setSelectedHotelDuration(newArray);
  };

  const settingHotelsMembers = (members, i) => {
    const newArray = [...selectedHotelMembers];
    newArray[i] = members;
    setSelectedHotelMembers(newArray);
  };

  function openModal() {
    setIsOpen(true);
    filterHotels();
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <Tabs selectedIndex={tabIndex}>
          <TabList className="model-tabs">
            <Tab onClick={() => setTabIndex(0)}>
              <div className="model-tabs-panel">
                <i class="fa fa-box-open mr-2"></i>
                Package Hotels
              </div>
            </Tab>
            <Tab onClick={() => setTabIndex(1)}>
              <div className="model-tabs-panel">
                <i class="fa fa-search mr-2" aria-hidden="true"></i>
                Explore
              </div>
            </Tab>
            <Tab onClick={() => setTabIndex(2)}>
              <div className="model-tabs-panel">
                <i class="fa fa-tree mr-2"></i>
                Tours
              </div>
            </Tab>
            <Tab onClick={() => setTabIndex(3)}>
              <div className="model-tabs-panel">
                <i class="fa fa-building mr-2"></i>
                hotels
              </div>
            </Tab>
          </TabList>

          <TabPanel>
            <div className="row">
              <div class="single-tab-select-box">
                <h2 className="ml-4 mb-2 mt-3 Avai_hotel_heading">
                  Available Hotels in Package :
                </h2>
              </div>
            </div>

            {selectedHotelsData?.map((ele) => {
              return (
                <>
                  <div className="row justify-content-center">
                    <div class="single-tab-select-box">
                      <h2 className="hotel_dest_heading mb-3 mt-3 ">{ele}</h2>
                    </div>
                  </div>
                  {Object.keys(hotelsData[ele]).map((item) => {
                    return (
                      <div className="hotels_card">
                        <div className="hotels_img">
                          <img
                            src={
                              require(`../assets/images/hotels/${hotelsData[ele][item].image}`)
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
                              {hotelsData[ele][item].name}
                            </div>
                            <div className="hotels_city ml-5">
                              {hotelsData[ele][item].city}
                            </div>
                          </div>
                          <div className="hotelss_info">
                            <div>{hotelsData[ele][item].intro}</div>
                            <div style={{ marginTop: "10px" }}>
                              <i class="fa fa-angle-right mr-2"></i>
                              Amenities: <br />
                              {hotelsData[ele][item].amenities}
                            </div>
                            <div className="d-flex align-items-center">
                              <i class="fa fa-angle-right mr-2"></i>
                              <div className="mr-3">Rating:</div>
                              <StarRatings
                                rating={hotelsData[ele][item].rating}
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
                </>
              );
            })}
          </TabPanel>
          <TabPanel>
            <div class="tab-para">
              <div className="row">
                <div class="single-tab-select-box">
                  <h2 className="mb-5">
                    Select a State to checkout its Hotels :
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
            <div class="tab-para">
              {basket.map((item, i) => {
                return (
                  <>
                    <div className="row">
                      <div class="single-tab-select-box">
                        <h2 className="mb-4">
                          Your Destination : {item.state}
                        </h2>
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-lg-3 col-md-4 col-sm-5">
                        <div class="single-tab-select-box">
                          <h2>start date</h2>
                          <div class="travel-check-icon">
                            <DatePicker
                              selected={startTourDate[i]}
                              onChange={(date) => settingStartTourDate(date, i)}
                              className="datepicker_style"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3 col-md-4 col-sm-5">
                        <div class="single-tab-select-box">
                          <h2>end date</h2>
                          <div class="travel-check-icon">
                            <DatePicker
                              selected={endTourDate[i]}
                              onChange={(date) => settingEndTourDate(date, i)}
                              className="datepicker_style"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-5">
                        <div class="single-tab-select-box">
                          <h2>duration</h2>
                          <div class="travel-select-icon">
                            <select
                              class="form-control "
                              value={selectedTourDuration[i]}
                              onChange={(e) =>
                                settingTourDuration(e.target.value, i)
                              }
                            >
                              <option selected="true" disabled="disabled">
                                Duration
                              </option>
                              <option value="5">5 days</option>

                              <option value="10">10 days</option>

                              <option value="15">15 days</option>
                              <option value="20">20 days</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-5">
                        <div class="single-tab-select-box">
                          <h2>members</h2>
                          <div class="travel-select-icon">
                            <select
                              class="form-control "
                              value={selectedTourMembers[i]}
                              onChange={(e) =>
                                settingTourMembers(e.target.value, i)
                              }
                            >
                              <option selected="true" disabled="disabled">
                                Members
                              </option>
                              <option value="1">1</option>

                              <option value="2">2</option>

                              <option value="4">4</option>
                              <option value="8">8</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}

              <div class="clo-sm-7">
                <div class="about-btn travel-mrt-0 pull-right">
                  <button
                    class="about-view travel-btn"
                    onClick={() => setTabIndex(3)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div class="tab-para">
              {basket.map((item, i) => {
                return (
                  <>
                    <div className="row">
                      <div class="single-tab-select-box">
                        <h2 className="mb-4">
                          Your Destination : {item.state}
                        </h2>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-3 col-md-4 col-sm-5">
                        <div class="single-tab-select-box">
                          <h2>check in</h2>
                          <div class="travel-check-icon">
                            <DatePicker
                              selected={checkInHotelsDate[i]}
                              onChange={(date) =>
                                settingCheckInHotelsDate(date, i)
                              }
                              className="datepicker_style"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3 col-md-4 col-sm-5">
                        <div class="single-tab-select-box">
                          <h2>check out</h2>
                          <div class="travel-check-icon">
                            <DatePicker
                              selected={checkOutHotelsDate[i]}
                              onChange={(date) =>
                                settingCheckOutHotelsDate(date, i)
                              }
                              className="datepicker_style"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-5">
                        <div class="single-tab-select-box">
                          <h2>duration</h2>
                          <div class="travel-select-icon">
                            <select
                              class="form-control "
                              value={selectedHotelDuration[i]}
                              onChange={(e) =>
                                settingHotelsDuration(e.target.value, i)
                              }
                            >
                              <option selected="true" disabled="disabled">
                                Duration
                              </option>
                              <option value="5">5</option>
                              <option value="10">10</option>

                              <option value="15">15</option>
                              <option value="20">20</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-5">
                        <div class="single-tab-select-box">
                          <h2>members</h2>
                          <div class="travel-select-icon">
                            <select
                              class="form-control "
                              value={selectedHotelMembers[i]}
                              onChange={(e) =>
                                settingHotelsMembers(e.target.value, i)
                              }
                            >
                              <option selected="true" disabled="disabled">
                                Members
                              </option>
                              <option value="1">1</option>

                              <option value="2">2</option>

                              <option value="4">4</option>
                              <option value="8">8</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}

              <div class="clo-sm-7">
                <div class="about-btn travel-mrt-0 pull-right">
                  <button
                    class="about-view travel-btn"
                    onClick={() => {
                      getTourInfo(
                        startTourDate,
                        endTourDate,
                        selectedTourDuration,
                        selectedTourMembers
                      );
                      getHotelInfo(
                        checkInHotelsDate,
                        checkOutHotelsDate,
                        selectedHotelDuration,
                        selectedHotelMembers
                      );
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </Modal>
    </div>
  );
}
