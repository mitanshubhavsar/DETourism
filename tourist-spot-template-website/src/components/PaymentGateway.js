import { React, useState } from "react";
import { useStateValue } from "../ContextAPI/StateProvider";
import Modal from "react-modal";
import { getOverallTourTotal } from "../ContextAPI/reducer";
import "./PaymentGateway.css";

export const PaymentGateway = (props) => {
  const [{ basket, user, tourInfo, hotelsInfo }, dispatch] = useStateValue();

  const customStyles = {
    content: {
      top: "15%",
      left: "15%",
      right: "15%",
    },
  };

  return (
    <div>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModel}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="travelinfo_mod_close_btn" onClick={props.closeModal}>
          <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        <div className="payment_body">
          <div class="container-fluid">
            <div class="row justify-content-center">
              <div class="col-12 col-lg-11">
                <div class="card payment_card0 rounded-0">
                  <div class="row">
                    <div class="col-md-5 d-md-block d-none p-0 box">
                      <div
                        class="card rounded-0 border-0 payment_card1"
                        id="bill"
                        style={{ display: "flex", alignItems: "baseline" }}
                      >
                        <h3 id="payment_heading1">Payment Summary</h3>
                        {basket.map((item, i) => {
                          return (
                            <div class="row">
                              <div class="pl-4">
                                <img
                                  src={
                                    require(`../assets/images/${basket[i].image}`)
                                      .default
                                  }
                                  alt="package-place"
                                  height="155px"
                                  width="230px"
                                />
                                <h2 class="bill-head">{basket[i].state}</h2>

                                <small class="bill-date">
                                  Booked On: &nbsp; &nbsp;{" "}
                                  {new Date().toDateString()}
                                </small>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      marginRight: "27px",
                                      marginBottom: "10px",
                                      color: "white",
                                    }}
                                  >
                                    {basket[i].days} Days {basket[i].nights}{" "}
                                    Nights
                                  </div>
                                  <div
                                    style={{
                                      marginLeft: "10px",
                                      marginBottom: "10px",
                                      color: "white",
                                    }}
                                  >
                                    Rs.&nbsp; {basket[i].price}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        <h4 style={{ marginTop: "10px", color: "white" }}>
                          SubTotal: &nbsp; &nbsp; Rs.&nbsp;{" "}
                          {tourInfo
                            ? getOverallTourTotal(tourInfo).toLocaleString(
                                navigator.language
                              )
                            : "0"}
                        </h4>
                      </div>
                    </div>

                    <div class="col-md-7 col-sm-12 p-0 box">
                      <div
                        class="card rounded-0 border-0 payment_card2"
                        id="paypage"
                      >
                        <div class="form-card">
                          <h2 id="payment_heading2" class="text-danger">
                            Payment Method
                          </h2>
                          <div class="payment_radio-group">
                            <div class="payment_radio" data-value="credit">
                              <img
                                src="https://i.imgur.com/28akQFX.jpg"
                                alt="payment"
                                width="200px"
                                height="60px"
                              />
                            </div>
                            <div class="payment_radio" data-value="paypal">
                              <img
                                src="https://i.imgur.com/5QFsx7K.jpg"
                                width="200px"
                                height="60px"
                                alt="payment"
                              />
                            </div>
                            <br />
                          </div>
                          <label class="pay">Name on Card</label>
                          <input
                            type="text"
                            name="holdername"
                            placeholder="John Smith"
                          />
                          <div class="row">
                            <div class="col-8 col-md-6">
                              <label class="pay">Card Number</label>
                              <input
                                type="text"
                                name="cardno"
                                id="cr_no"
                                placeholder="0000-0000-0000-0000"
                                minlength="19"
                                maxlength="19"
                              />
                            </div>
                            <div class="col-4 col-md-6">
                              <label class="pay">CVV</label>
                              <input
                                type="password"
                                name="cvcpwd"
                                placeholder="&#9679;&#9679;&#9679;"
                                class="payment_placeicon"
                                minlength="3"
                                maxlength="3"
                              />
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <label class="pay">Expiration Date</label>
                            </div>
                            <div class="col-md-12">
                              <input
                                type="text"
                                name="exp"
                                id="exp"
                                placeholder="MM/YY"
                                minlength="5"
                                maxlength="5"
                              />
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-6">
                              <input
                                type="submit"
                                value="MAKE A PAYMENT &nbsp; &#xf178;"
                                class="btn payment_btn-info payment_placeicon"
                                onClick={() => {
                                  props.bookOrder();
                                  props.closeModal();
                                }}
                              />
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
        </div>
      </Modal>
    </div>
  );
};
