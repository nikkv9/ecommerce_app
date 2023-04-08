import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import cls from "./Shipping.module.css";
import { Country, State } from "country-state-city";
import Header from "../layout/Header";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { saveShippingInfo } from "../../redux/actions/cart-action";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const navigate = useNavigate();

  const shippingHandler = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      return alert("phone no. should be 10 digit long !");
    }

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );

    navigate("/order/confirm");
  };

  return (
    <>
      <MetaData title="shipping details" />
      <Header />
      <CheckoutSteps activeStepp={0} />
      <div className={cls.shipping}>
        <div className={cls.container}>
          <h2>Shipping Details</h2>
          <form className={cls.form} encType="multipart/form-data">
            <input
              type="text"
              placeholder="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="number"
              placeholder="Pin Code"
              required
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
            <input
              type="number"
              placeholder="Phone Number"
              required
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              size="10"
            />
            <select
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option>Country</option>
              {Country &&
                Country.getAllCountries().map((c) => (
                  <option value={c.isoCode} key={c.isoCode}>
                    {c.name}
                  </option>
                ))}
            </select>

            {country && (
              <select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option>State</option>
                {State &&
                  State.getStatesOfCountry(country).map((s) => (
                    <option value={s.isoCode} key={s.isoCode}>
                      {s.name}
                    </option>
                  ))}
              </select>
            )}
            <button
              disabled={state ? false : true}
              type="submit"
              onClick={shippingHandler}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
