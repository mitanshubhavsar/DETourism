import React from 'react';
import { useHistory } from 'react-router-dom';
import './Checkout.css';
import StarRatings from 'react-star-ratings';
import { useStateValue } from '../../ContextAPI/StateProvider';
import { getBasketTotal } from '../../ContextAPI/reducer';
import { db } from '../../firebase';
import firebase from 'firebase/compat/app';

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const bookOrder = () => {
    if (basket.length === 0 && getBasketTotal(basket) === 0) {
      alert('Please add few items in basket!');
    } else {
      db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .add({
          basket: basket,
          amount: getBasketTotal(basket),
          orderedAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          alert('Order Booked Successfully');
          emptyTheBasket();
          history.push('/');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    }
  };

  const removeFromBasket = (removedPackage) => {
    // remove the item from the basket
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      state: removedPackage.state,
    });
  };

  const emptyTheBasket = () => {
    // remove the item from the basket
    dispatch({
      type: 'EMPTY_BASKET',
    });
  };

  return (
    <div className="container">
      <div className="checkout_heading">
        <h3>Your Cart</h3>
      </div>
      {basket.length === 0 ? (
        <div style={{ fontSize: '30px' }}>Your Cart is Empty</div>
      ) : null}
      <div className="checkout_container">
        {basket &&
          basket.map((item, i) => {
            return (
              <div className="checkout_card">
                <div className="checkout_img">
                  <img
                    src={
                      require(`../../assets/images/${basket[i].image}`).default
                    }
                    alt="package-place"
                    height="155px"
                    width="230px"
                  />
                </div>
                <div className="checkout_details">
                  <div className="checkout_title">{basket[i].state}</div>
                  <div className="checkout_info">
                    <div style={{ display: 'flex' }}>
                      <div style={{ marginRight: '27px' }}>
                        {basket[i].days} Days {basket[i].nights} Nights
                      </div>
                      <div>{basket[i].accomodation} Star Accomodation</div>
                    </div>
                    <div>Transportation Food Facilities</div>
                    <StarRatings
                      rating={basket[i].accomodation}
                      starRatedColor="yellow"
                      numberOfStars={5}
                      name="rating"
                      starDimension="24px"
                      starSpacing="1px"
                      className="checkout_info"
                    />
                    <div>{basket[i].reviews} Review</div>
                  </div>
                </div>
                <div className="removeButton_orders">
                  <div className="checkout_price">{basket[i].price}</div>
                  <button
                    class="removeOrder-btn"
                    onClick={() => removeFromBasket(basket[i])}
                  >
                    Remove from Basket
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div className="checkout_SubTotal">
        Your Cart 's has total {basket.length} items with a Subtotal of{' '}
        {getBasketTotal(basket)}
      </div>
      <button className="checkout_proceed_btn" onClick={bookOrder}>
        Proceed to Pay
      </button>
    </div>
  );
}

export default Checkout;
