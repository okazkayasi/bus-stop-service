import React, { useState } from "react";
import InputMask from "react-input-mask";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

const PaymentComponent = ({ sendDonation }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    number: "",
    cvc: "",
    expiry: "",
    amount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = data.name;
    const email = data.email;
    if (name === "") {
      alert("Name is required");
      return;
    }

    if (email) {
      if (!validateEmail(email)) {
        alert("Please enter a valid email");
        return;
      }
    }

    // check number
    const number = data.number.replace(/\s/g, "");
    if (number.length < 16) {
      alert("Please enter a valid card number");
      return;
    }
    const cvc = data.cvc.replace(/\s/g, "");
    if (cvc.length < 3) {
      alert("Please enter a valid CVC");
      return;
    }
    const expiry = data.expiry.replace(/\s/g, "");
    if (expiry.length < 5) {
      alert("Please enter a valid expiry date");
      return;
    }
    const expiryMonth = expiry.substring(0, 2);
    const expiryYear = expiry.substring(3, 5);

    const expiryDate = new Date(`20${expiryYear}-${expiryMonth}-01`).getTime();

    if (isNaN(expiryDate)) {
      alert("Please enter a valid expiry date");
      return;
    }
    const today = new Date().getTime();
    if (expiryDate < today) {
      alert("Please enter a valid expiry date");
      return;
    }
    const currentDate = new Date();
    if (expiryDate < currentDate) {
      alert("Please enter a valid expiry date");
      return;
    }

    const value = parseInt(data.amount);
    if (value < 1) {
      alert("Please enter a valid amount");
      return;
    }
    sendDonation(number, cvc, expiryDate, value);
    setData({
      name: "",
      email: "",
      number: "",
      cvc: "",
      expiry: "",
      amount: 0,
    });
  };

  return (
    <div className="bg-white py-6 rounded-md">
      <div className="w-96 mb-10 mx-auto">
        <div className="px-4">
          <div className="py-4 border-b border-solid border-black50">
            <h3 className="text-center">Card Details</h3>
          </div>
          <form role="form">
            <div className="relative my-6">
              <div>
                <label className="subtitle mb-1 inline-block">Name</label>
                <input
                  className="payment-input"
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-6">
                <label className="subtitle mb-1 inline-block">
                  Email (optional)
                </label>
                <InputMask
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="payment-input"
                />
              </div>

              <div className="mt-6">
                <label className="subtitle mb-1 inline-block">
                  Card Number
                </label>
                <InputMask
                  mask="9999 9999 9999 9999"
                  maskChar=" "
                  className="payment-input"
                  type="text"
                  name="number"
                  placeholder="4242 4242 4242 4242"
                  value={data.number}
                  onChange={handleChange}
                />
              </div>
              <div className="flex mt-6 gap-x-2">
                <div>
                  <label className="subtitle mb-1 inline-block">CVC</label>
                  <InputMask
                    mask="999"
                    maskChar=" "
                    className="payment-input"
                    type="text"
                    name="cvc"
                    placeholder="424"
                    value={data.cvc}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="subtitle mb-1 inline-block">
                    Expiry Date
                  </label>
                  <InputMask
                    mask="99/99"
                    maskChar=" "
                    className="payment-input"
                    type="text"
                    placeholder="MM/DD"
                    name="expiry"
                    value={data.expiry}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="subtitle mb-1 inline-block">
                  Donation Amount
                </label>
                <InputMask
                  placeholder="$10"
                  maskChar=" "
                  className="payment-input w-2/3"
                  value={"$" + data.amount}
                  name="amount"
                  onChange={(e) => {
                    const amount = e.target.value.replace("$", "");
                    const filtered = amount.replace(/[^0-9]/g, "");
                    setData({ ...data, amount: filtered });
                  }}
                />
              </div>
              <div className="mt-6">
                <button className="btn subtitle" onClick={handleSubmit}>
                  Donate
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;
