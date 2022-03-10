import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import './Packages.css';

import axios from '../../axiosUsers';

export default function Services() {
  const [packages, setPackages] = useState(null);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await axios.get('/packages.json');
        console.log(response.data);
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
                          {packages[item].state}{' '}
                          <span style={{ marginLeft: '32px' }}>
                            {packages[item].price}
                          </span>
                        </h3>
                        <div class="packages-para">
                          <p>
                            <span>
                              <i class="fa fa-angle-right"></i>{' '}
                              {packages[item].days} days {packages[item].nights}{' '}
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
                        <div class="about-btn">
                          <button class="about-view packages-btn">
                            book now
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
