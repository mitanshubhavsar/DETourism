import React, { useEffect, useState } from "react";
import "./Orders.css";
import img1 from "../../assets/images/agraFort.jpg";
import StarRatings from "react-star-ratings";
import { db } from "../../firebase";
import axios from "../../axiosUsers";
import { useStateValue } from "../../ContextAPI/StateProvider";

function Orders() {
  const [{ basket, user, tourInfo, hotelsInfo }] = useStateValue();
  const [orderData, setOrderData] = useState(null);

  const items = [];

  useEffect(() => {
    async function fetchOrders() {
      try {
        db.collection("users")
          .doc(user.uid)
          .collection("orders")
          .orderBy("orderedAt", "desc")
          .onSnapshot((querySnapShot) => {
            querySnapShot.forEach((doc) => {
              items.push(doc.data());
            });
            setOrderData(items);
          });
      } catch (error) {
        console.log(error);
      }
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    console.log(tourInfo);
    console.log(hotelsInfo);
  }, []);

  return (
    <div className="container">
      <div className="order_heading">
        <h3>Orders</h3>
      </div>
      {orderData &&
        orderData.map((item, i) => {
          return (
            <div className="orders_container">
              {item.basket.map((des, k) => {
                return (
                  <div className="orders_card">
                    <div className="orders_img">
                      <img
                        src={
                          require(`../../assets/images/${des.image}`).default
                        }
                        alt="package-place"
                        height="155px"
                        width="230px"
                      />
                    </div>
                    <div className="orders_details">
                      <div className="orders_title">{des.state}</div>
                      <div className="orders_info">
                        <div style={{ display: "flex" }}>
                          <div style={{ marginRight: "27px" }}>
                            {des.days} Days {des.nights} Nights
                          </div>
                          <div>5 Star Accomodation</div>
                        </div>
                        <div>Transportation Food Facilities</div>
                        <StarRatings
                          rating={des.accomodation}
                          starRatedColor="yellow"
                          numberOfStars={5}
                          name="rating"
                          starDimension="24px"
                          starSpacing="1px"
                          className="orders_info"
                        />
                        <div>{des.reviews} Review</div>
                      </div>
                      <div className="removeButton_orders">
                        <div className="orders_price">
                          Rs.&nbsp;{" "}
                          {des.price.toLocaleString(navigator.language)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="order_total">
                <div className="orders_subtotal">
                  SubTotal:&nbsp;&nbsp;Rs.&nbsp;{item.amount}
                </div>
                <div>
                  Ordered on:&nbsp;
                  {new Date(item.orderedAt?.toDate()).toDateString()}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Orders;
