import { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import webFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import PasswordForgot from "./component/User/PasswordForgot.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  };

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/product/:id" Component={ProductDetails} />
          <Route exact path="/products" Component={Products} />
          <Route path="/products/:keyword" Component={Products} />
          <Route exact path="/search" Component={Search} />
          <Route exact path="/login" Component={LoginSignUp} />
          <Route
            exact
            path="/account"
            element={<ProtectedRoute Component={Profile} />}
          />
          <Route
            exact
            path="/me/update"
            element={<ProtectedRoute Component={UpdateProfile} />}
          />
          <Route
            exact
            path="/password/update"
            element={<ProtectedRoute Component={UpdatePassword} />}
          />
          <Route exact path="/password/forgot" Component={PasswordForgot} />
          <Route path="/password/reset/:token" Component={ResetPassword} />
          <Route exact path="/cart" Component={Cart} />
          <Route
            exact
            path="/shipping"
            element={<ProtectedRoute Component={Shipping} />}
          />
          <Route
            exact
            path="/order/confirm"
            element={<ProtectedRoute Component={ConfirmOrder} />}
          />
          {stripeApiKey && (
            <Route
              exact
              path="/process/payment"
              element={
                <ProtectedRoute
                  stripeApiKey={stripeApiKey}
                  Component={Payment}
                />
              }
            />
          )}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
