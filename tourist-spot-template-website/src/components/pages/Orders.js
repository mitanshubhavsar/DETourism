import React, { useEffect, useState } from "react";
import "./Orders.css";
import StarRatings from "react-star-ratings";
import { db } from "../../firebase";
import { useStateValue } from "../../ContextAPI/StateProvider";

function Orders() {
  const [{ user }] = useStateValue();
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
                        height="200px"
                        width="280px"
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

                        <StarRatings
                          rating={des.accomodation}
                          starRatedColor="yellow"
                          numberOfStars={5}
                          name="rating"
                          starDimension="24px"
                          starSpacing="1px"
                          className="orders_info"
                        />
                      </div>
                      <div className="Tour_info_orders">
                        <div className="Tour_info_orders_heading mt-2">
                          Tour Information
                        </div>
                        <div className="Tour_info_dates">
                          <div className="mr-2">Start Date:</div>
                          <div>
                            {new Date(
                              item.tourInfo[k].startTour?.toDate()
                            ).toDateString()}
                          </div>
                          <div className="ml-4 mr-2">End Date:</div>
                          <div>
                            {new Date(
                              item.tourInfo[k].endTour?.toDate()
                            ).toDateString()}
                          </div>
                        </div>
                        <div className="Tour_info_members">
                          <div className="mr-2">Members:</div>
                          <div>{item.tourInfo[k].TourMembers}</div>
                        </div>
                      </div>

                      <div className="order_info_Ava_hotels">
                        <div className="order_info_Ava_hotels_heading mt-3">
                          Available Hotels
                        </div>
                        {Object.keys(item.hotelsInfo[k].availableHotels).map(
                          (hotel, l) => {
                            return (
                              <div className="ava_hotels">
                                <i
                                  class="fa fa-chevron-circle-right"
                                  aria-hidden="true"
                                ></i>
                                <div className="ml-3">
                                  {
                                    item.hotelsInfo[k].availableHotels[hotel]
                                      .name
                                  }
                                  &nbsp;,{" "}
                                  {
                                    item.hotelsInfo[k].availableHotels[hotel]
                                      .city
                                  }
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>

                      <div className="order_package_price mt-3">
                        <div className="mr-3">Package Price:</div>
                        Rs.&nbsp; {des.price.toLocaleString(navigator.language)}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="order_total">
                <div className="orders_subtotal">
                  SubTotal:&nbsp;&nbsp;Rs.&nbsp;
                  {item.amount.toLocaleString(navigator.language)}
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
