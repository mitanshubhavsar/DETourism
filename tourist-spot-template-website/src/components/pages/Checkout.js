import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Checkout.css";
import StarRatings from "react-star-ratings";
import { useStateValue } from "../../ContextAPI/StateProvider";
import { getBasketTotal } from "../../ContextAPI/reducer";
import { getOverallTourTotal } from "../../ContextAPI/reducer";
import { db } from "../../firebase";
import firebase from "firebase/compat/app";
import TravelInfoModel from "../TravelInfoModel";
import editFormIcon from "../../assets/images/editform_icon.png";
import { PaymentGateway } from "../PaymentGateway";

function Checkout() {
  const [{ basket, user, tourInfo, hotelsInfo }, dispatch] = useStateValue();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedHotelsData, setSelectedHotelsData] = useState(null);
  const [IsOpenPaymentModel, setIsOpenPaymentModel] = useState(false);

  const history = useHistory();

  function openModal() {
    if (basket.length !== 0) {
      setIsOpen(true);
      filterHotels();
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openPaymentModal() {
    setIsOpenPaymentModel(true);
  }

  function closePaymentModal() {
    setIsOpenPaymentModel(false);
  }
  const filterHotels = () => {
    const selectedHotels = [];
    basket.forEach((element) => {
      selectedHotels.push(element.state);
    });
    setSelectedHotelsData(selectedHotels);
  };

  useEffect(() => {
    setTimeout(() => {
      if (basket) {
        openModal();
      }
    }, 2000);

    return () => {
      openModal();
    };
  }, []);

  const bookOrder = () => {
    if (user) {
      if (basket.length === 0 && getBasketTotal(basket) === 0) {
        alert("Please add few items in basket!");
      } else {
        if (tourInfo.length !== 0 || hotelsInfo.length !== 0) {
          db.collection("users")
            .doc(user?.uid)
            .collection("orders")
            .add({
              basket: basket,
              amount: getOverallTourTotal(tourInfo),
              tourInfo: tourInfo,
              hotelsInfo: hotelsInfo,
              orderedAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
              alert("Order Booked Successfully");
              emptyTheBasket();
              history.push("/");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        } else {
          alert("Please fill tour and hotel Infomation");
        }
      }
    } else {
      alert("Please Login/Signup before ordering");
      history.push("/sign-up");
    }
  };

  const removeFromBasket = (removedPackage) => {
    // remove the item from the basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      state: removedPackage.state,
    });
  };

  const emptyTheBasket = () => {
    dispatch({
      type: "EMPTY_BASKET",
    });
    dispatch({
      type: "EMPTY_TOURINFO",
    });
    dispatch({
      type: "EMPTY_HOTELSINFO",
    });
  };

  return (
    <div className="container">
      <div className="checkout_heading">
        <h3>Your Cart</h3>
      </div>
      <TravelInfoModel
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        selectedHotelsData={selectedHotelsData}
      />
      <PaymentGateway
        modalIsOpen={IsOpenPaymentModel}
        openModal={openPaymentModal}
        closeModal={closePaymentModal}
        bookOrder={bookOrder}
      />
      {basket.length === 0 ? (
        <div style={{ fontSize: "30px" }}>Your Cart is Empty</div>
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
                    <div style={{ display: "flex" }}>
                      <div style={{ marginRight: "27px" }}>
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
                    <div>{Object.keys(basket[i].reviews).length} Reviews</div>
                  </div>
                </div>
                <div className="removeButton_orders">
                  <div className="checkout_price">
                    Rs.&nbsp;
                    {basket[i].price.toLocaleString(navigator.language)}
                  </div>
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
        Your Cart 's has total {basket.length} items with a Overall Subtotal of{" "}
        Rs.&nbsp;
        {tourInfo
          ? getOverallTourTotal(tourInfo).toLocaleString(navigator.language)
          : "0"}
      </div>

      <div className="row align-items-center">
        <div className="checkout_editheading">
          You can Fill/Edit your Tour information and Hotel information
        </div>
        <button className="checkout_editbtn" onClick={openModal}>
          <img
            className="mr-2"
            src={editFormIcon}
            height="21px"
            width="21px"
            alt="edit-icon"
          />
          Edit
        </button>
      </div>

      <button
        className="checkout_proceed_btn"
        onClick={() => openPaymentModal()}
      >
        Proceed to Pay
      </button>
    </div>
  );
}

export default Checkout;
