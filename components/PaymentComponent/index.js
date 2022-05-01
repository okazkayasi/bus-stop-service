import React, { useState } from "react";
import InputMask from "react-input-mask";

const PaymentComponent = ({ sendDonation }) => {
  const [data, setData] = useState({
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
    console.log(data, "data");
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
    const expiry_month = expiry.substring(0, 2);
    const expiry_year = expiry.substring(3, 5);

    const expiry_date = new Date(
      `20${expiry_year}-${expiry_month}-01`,
    ).getTime();

    if (isNaN(expiry_date)) {
      alert("Please enter a valid expiry date");
      return;
    }
    const today = new Date().getTime();
    if (expiry_date < today) {
      alert("Please enter a valid expiry date");
      return;
    }
    const current_date = new Date();
    if (expiry_date < current_date) {
      alert("Please enter a valid expiry date");
      return;
    }

    const value = parseInt(data.amount);
    if (value < 1) {
      alert("Please enter a valid amount");
      return;
    }
    sendDonation(number, cvc, expiry_date, value);
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
                <label className="subtitle">Card Number</label>
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
                  <label className="subtitle">CVC</label>
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
                  <label className="subtitle">Expiry Date</label>
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
                <label className="subtitle">Donation Amount</label>
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
