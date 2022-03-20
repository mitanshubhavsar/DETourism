import React from 'react';
import './Checkout.css';
import img1 from '../../assets/images/agraFort.jpg';
import StarRatings from 'react-star-ratings';

function Checkout() {
  return (
    <div className="container">
      <div className="checkout_heading">
        <h3>Your Cart</h3>
      </div>
      <div className="checkout_container">
        <div className="checkout_card">
          <div className="checkout_img">
            <img src={img1} alt="package-place" height="155px" width="230px" />
          </div>
          <div className="checkout_details">
            <div className="checkout_title">Gujarat</div>
            <div className="checkout_info">
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '27px' }}>4 Days 5 Nights</div>
                <div>5 Star Accomodation</div>
              </div>
              <div>Transportation Food Facilities</div>
              <StarRatings
                rating={5}
                starRatedColor="yellow"
                numberOfStars={5}
                name="rating"
                starDimension="24px"
                starSpacing="1px"
                className="checkout_info"
              />
              <div>2544 Review</div>
            </div>
          </div>
          <div className="removeButton_orders">
            <div className="checkout_price">Rs. 45,000</div>
            <button class="removeOrder-btn">Remove from Basket</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
