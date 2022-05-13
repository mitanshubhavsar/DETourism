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
  },
};

export default function TravelInfoModel(props) {
  const [{ basket, user }, dispatch] = useStateValue();
  const [hotelsData, setHotelsData] = useState(null);
  const [packageSubtotal, setPackageSubtotal] = useState([]);

  const getTourInfo = (
    startTourDate,
    endTourDate,
    selectedTourDuration,
    selectedTourAdult,
    selectedTourChild,
    packageSubtotal
  ) => {
    if (
      startTourDate.length !== basket.length ||
      endTourDate.length !== basket.length ||
      selectedTourAdult.length !== basket.length ||
      selectedTourChild.length !== basket.length
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
            TourAdults: selectedTourAdult[i],
            TourChild: selectedTourChild[i],
            TourSubtotal: packageSubtotal[i],
          },
        });
      }
    }
    props.closeModal();
  };

  const getHotelInfo = () => {
    for (let i = 0; i < basket.length; i++) {
      dispatch({
        type: "SET_HOTELS",
        hotelsInfo: {
          destination: basket[i].state,
          availableHotels: hotelsData[basket[i].state],
        },
      });
    }
    props.closeModal();
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

  const [tabIndex, setTabIndex] = useState(0);

  const [startTourDate, setStartTourDate] = useState([]);
  const [endTourDate, setEndTourDate] = useState([]);
  const [selectedTourDuration, setSelectedTourDuration] = useState([]);
  const [selectedTourAdult, setSelectedTourAdult] = useState([]);
  const [selectedTourChild, setSelectedTourChild] = useState([]);

  const calculatingPackageTotal = (adultmembers, childmembers, i) => {
    gettingCalculatedDuration(i);
    const newArrayAdult = [...selectedTourAdult];
    const newArrayChild = [...selectedTourChild];

    if (adultmembers) {
      newArrayAdult[i] = adultmembers;
      setSelectedTourAdult(newArrayAdult);
    }

    if (childmembers) {
      newArrayChild[i] = childmembers;
      setSelectedTourChild(newArrayChild);
    }

    let newArray = [];
    for (let i = 0; i < basket.length; i++) {
      if (newArrayAdult[i] && newArrayChild[i]) {
        newArray[i] =
          newArrayAdult[i] * basket[i].price +
          (newArrayChild[i] / 2) * basket[i].price;
        console.log(newArray);
        console.log(basket[i].price);
      }
    }
    setPackageSubtotal(newArray);
  };

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

  const gettingCalculatedDuration = (i) => {
    if (endTourDate[i] !== null && startTourDate[i] !== null) {
      const newArray = [...selectedTourDuration];
      newArray[i] = new Date(endTourDate[i] - startTourDate[i]).getDate();
      setSelectedTourDuration(newArray);
    }
  };

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
                <i class="fa fa-box-open mr-2"></i>
                Package Hotels
              </div>
            </Tab>
            <Tab onClick={() => setTabIndex(1)}>
              <div className="model-tabs-panel">
                <i class="fa fa-suitcase mr-2" aria-hidden="true"></i>
                Tours
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

            {props.selectedHotelsData?.map((ele) => {
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
                              minDate={new Date()}
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
                              minDate={
                                startTourDate[i] ? startTourDate[i] : new Date()
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-5">
                        <div class="single-tab-select-box">
                          <h2>duration</h2>
                          <div className="travel-input-number">
                            <input
                              class="form-control "
                              //value={selectedTourDuration[i]}
                              value={new Date(
                                endTourDate[i] - startTourDate[i]
                              ).getDate()}
                              //value={selectedTourDuration[i]}
                              // onChange={(e) =>
                              //   settingTourDuration(e.target.value, i)
                              // }
                              type="number"
                              min="2"
                              max="180"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-2 col-md-2 col-sm-5">
                        <div class="single-tab-select-box">
                          <h2>Adults</h2>
                          <div className="travel-input-number">
                            <input
                              class="form-control "
                              value={selectedTourAdult[i]}
                              onChange={(e) =>
                                // settingTourAdults(e.target.value, i);
                                calculatingPackageTotal(e.target.value, null, i)
                              }
                              type="number"
                              min="1"
                              max="50"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-2 col-md-2 col-sm-5">
                        <div class="single-tab-select-box">
                          <h2>Children</h2>
                          <div className="travel-input-number">
                            <input
                              class="form-control "
                              value={selectedTourChild[i]}
                              onChange={(e) => {
                                calculatingPackageTotal(
                                  null,
                                  e.target.value,
                                  i
                                );
                              }}
                              type="number"
                              min="0"
                              max="50"
                            />
                          </div>
                        </div>
                      </div>
                      {packageSubtotal[i] && (
                        <div className="travelInfo_subtotal mt-3 d-flex">
                          <div className="ml-4 mr-2">Subtotal:</div>
                          <div>
                            Rs.{" "}
                            {packageSubtotal[i].toLocaleString(
                              navigator.language
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                );
              })}

              <div class="clo-sm-7">
                <div class="about-btn travel-mrt-0 pull-right">
                  <button
                    class="about-view travel-btn"
                    onClick={() => {
                      getHotelInfo();
                      getTourInfo(
                        startTourDate,
                        endTourDate,
                        selectedTourDuration,
                        selectedTourAdult,
                        selectedTourChild,
                        packageSubtotal
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
