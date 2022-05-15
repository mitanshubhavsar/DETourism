import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SignUp.css";
import { auth } from "../../firebase";
import axios from "../../axiosUsers";

function Signup() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [destination, setDestination] = useState("Philippines");

  const signupUser = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
          alert("login Successful");
        }
      })
      .catch((error) => alert(error.message));
  };

  const registerUser = (e) => {
    e.preventDefault();
    const users = {
      Name: name,
      Email: email,
      Destination: destination,
    };
    axios
      .post("/users.json", users)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    //some firebase register
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
          alert("Registration Successful");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div class="signupPage">
      <div class="grey-overlay-signup signUpHead">
        <div class="col-md-7 mt-text quote" data-animate-effect="fadeInUp">
          <h1 class="signupquote">Planning Trip To Anywhere in The World?</h1>
        </div>
        <div
          class="col-md-4 col-md-push-1 signupBox"
          data-animate-effect="fadeInRight"
        >
          <div class="SignupBoxline"></div>
          <div class="form-wrap">
            <div class="tab">
              <div class="tab-content">
                <div class="tab-content-inner active" data-content="signup">
                  <h3 class="signupboxHeading">Book Your Trip</h3>
                  <form action="#">
                    <div class="row form-group">
                      <div class="col-md-12">
                        <label for="fullname">Your Name</label>
                        <input
                          type="text"
                          id="fullname"
                          class="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="row form-group">
                      <div class="col-md-12">
                        <label for="activities">Email</label>
                        <input
                          type="email"
                          id="email"
                          class="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="row form-group">
                      <div class="col-md-12">
                        <label for="activities">Password</label>
                        <input
                          type="password"
                          id="password"
                          class="form-control"
                          autocomplete="on"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="row form-group">
                      <div class="col-md-12">
                        <label for="destination">Destination</label>
                        <select
                          name="#"
                          id="destination"
                          class="form-control"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                        >
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Maharastra">Maharastra</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Rajasthan">Rajasthan</option>
                        </select>
                      </div>
                    </div>

                    <div class="row form-group">
                      <div class="col-md-12 ">
                        <input
                          type="submit"
                          class="btn btn-primary btn-block"
                          value="Login"
                          onClick={signupUser}
                        />
                        <input
                          type="submit"
                          class="btn btn-primary btn-block"
                          value="Register If New"
                          onClick={registerUser}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
