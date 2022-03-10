import React, { useState, useEffect } from 'react';
import './Destinations.css';
import StarRatings from 'react-star-ratings';
import axios from '../../axiosUsers';

export default function Products() {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [destinationData, setDestinationData] = useState(null);
  const [selectedDestinationData, setSelectedDestinationData] = useState(null);
  //let selectedDestinationData = null;

  const checkDestinations = () => {
    console.log(selectedCity);
    console.log(selectedState);
    console.log(destinationData[selectedState]);

    setSelectedDestinationData(destinationData[selectedState][selectedCity]);
    //selectedDestinationData = destinationData[selectedState][selectedCity];
    console.log(selectedDestinationData);
  };

  useEffect(() => {
    async function fetchDestinations() {
      try {
        axios.get('/destinations.json').then((response) => {
          console.log(response.data);
          setDestinationData(response.data);
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchDestinations();
  }, []);

  return (
    <>
      <section class="travel-box">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="single-travel-boxes">
                <div id="desc-tabs" class="desc-tabs">
                  <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active">
                      <a
                        href="#tours"
                        aria-controls="tours"
                        role="tab"
                        data-toggle="tab"
                      >
                        <i class="fa fa-tree"></i>
                        tours
                      </a>
                    </li>
                  </ul>

                  <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active " id="tours">
                      <div class="tab-para">
                        <div class="row">
                          <div class="col-lg-4 col-md-4 col-sm-12">
                            <div class="single-tab-select-box">
                              <h2>destination</h2>

                              <div class="travel-select-icon">
                                <select
                                  class="form-control "
                                  value={selectedState}
                                  onChange={(e) =>
                                    setSelectedState(e.target.value)
                                  }
                                >
                                  <option value="default">
                                    enter your destination state
                                  </option>
                                  {destinationData &&
                                    Object.keys(destinationData).map(
                                      (item, i) => {
                                        return (
                                          <option value={item}>{item}</option>
                                        );
                                      }
                                    )}
                                </select>
                              </div>

                              <div class="travel-select-icon">
                                <select
                                  class="form-control "
                                  value={selectedCity}
                                  onChange={(e) =>
                                    setSelectedCity(e.target.value)
                                  }
                                >
                                  <option value="default">
                                    enter your destination city
                                  </option>
                                  {selectedState &&
                                    Object.keys(
                                      destinationData[selectedState]
                                    ).map((item, i) => {
                                      return (
                                        <option value={item}>{item}</option>
                                      );
                                    })}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="clo-sm-7">
                          <div class="about-btn travel-mrt-0 pull-right">
                            <button
                              class="about-view travel-btn"
                              onClick={checkDestinations}
                            >
                              search
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="blog" class="blog">
        <div class="container">
          <div class="blog-details">
            <div class="gallary-header text-center">
              <h2 style={{ marginBottom: '16px' }}>Available Destinations</h2>
              <h5>
                Travel these wonderful destinations with great joyful
                experience!
              </h5>
            </div>
            <div class="blog-content">
              <div class="row">
                {selectedDestinationData &&
                  Object.keys(selectedDestinationData).map((item, i) => {
                    return (
                      <div class="col-sm-4 col-md-4">
                        <div class="thumbnail">
                          <h2>{item}</h2>
                          <div class="thumbnail-img">
                            <img
                              src={
                                require(`../../assets/images/${selectedDestinationData[item].image}`)
                                  .default
                              }
                              alt="blog-img"
                            />
                            <div class="thumbnail-img-overlay"></div>
                          </div>

                          <div class="caption">
                            <div class="blog-txt">
                              <div class="caption_rating">
                                <div
                                  style={{
                                    marginRight: '11px',
                                    fontFamily: 'sans-serif',
                                  }}
                                >
                                  Ratings:
                                </div>
                                <StarRatings
                                  rating={selectedDestinationData[item].rating}
                                  starRatedColor="yellow"
                                  numberOfStars={5}
                                  name="rating"
                                  starDimension="24px"
                                  starSpacing="1px"
                                />
                              </div>

                              <div class="blog-txt-review">
                                {selectedDestinationData[item].reviews}
                                {'   '} review
                              </div>
                              <div class="blog-txt-about">
                                {selectedDestinationData[item].about}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
