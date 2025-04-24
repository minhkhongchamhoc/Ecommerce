import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import Footer from '../../components/Footer.jsx';

const CheckoutPage = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [aptSuite, setAptSuite] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  return (
    <div className="checkout-page-desktop min-h-screen bg-white flex flex-col">
    
      
      <main className="flex-1 py-10 flex justify-center">
        <div className="w-full max-w-6xl px-6">
          {/* Breadcrumbs and Heading */}
          <div className="flex flex-col gap-4 mb-10">
            <h2 className="text-4xl font-semibold text-gray-900">Checkout</h2>
            <div className="flex gap-2 text-gray-600">
              <Link to="/" className="hover:underline">Homepage</Link>
              <span>/</span>
              <span>Checkout</span>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex gap-8">
            {/* Checkout Details */}
            <div className="w-1/2 space-y-6">
              {/* Contact Info */}
              <div className="border rounded-lg">
                <div className="flex items-center gap-4 p-6 border-b">
                  <span className="text-gray-900 font-semibold">CONTACT INFO</span>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Your phone number</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Email address</label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded-md"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border rounded-lg">
                <div className="flex items-center gap-4 p-6 border-b">
                  <span className="text-gray-900 font-semibold">SHIPPING ADDRESS</span>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex gap-4">
                    <div className="space-y-2 flex-1">
                      <label className="text-sm font-medium text-gray-900">First name</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <label className="text-sm font-medium text-gray-900">Last name</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="space-y-2 flex-1">
                      <label className="text-sm font-medium text-gray-900">Address line 1</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <label className="text-sm font-medium text-gray-900">Apt, Suite</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={aptSuite}
                        onChange={(e) => setAptSuite(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Address line 2</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="space-y-2 flex-1">
                      <label className="text-sm font-medium text-gray-900">City</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <label className="text-sm font-medium text-gray-900">Country</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="space-y-2 flex-1">
                      <label className="text-sm font-medium text-gray-900">State/Province</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <label className="text-sm font-medium text-gray-900">Postal code</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="border rounded-lg">
                <div className="flex items-center gap-4 p-6 border-b">
                  <span className="text-gray-900 font-semibold">PAYMENT</span>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Card number</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Name on the card</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="space-y-2 flex-1">
                      <label className="text-sm font-medium text-gray-900">Expiration date (MM/YY)</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <label className="text-sm font-medium text-gray-900">CVC</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-1/2 space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">Order summary</h3>
              <div className="space-y-6">
                {/* Cart Item 1 */}
                <div className="flex gap-4 border-t pt-6">
                  <div className="w-24 h-28 overflow-hidden rounded-lg">
                    <img src="/item-image.png" alt="Black Automatic Watch" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">Black Automatic Watch</h4>
                        <p className="text-gray-600 text-sm">One size</p>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                        <button className="text-gray-600">-</button>
                        <span>1</span>
                        <button className="text-gray-600">+</button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-base font-semibold text-gray-900">$169.99</span>
                      <span className="text-sm text-gray-600 line-through">$199.99</span>
                    </div>
                  </div>
                </div>

                {/* Cart Item 2 */}
                <div className="flex gap-4 border-t pt-6">
                  <div className="w-24 h-28 overflow-hidden rounded-lg">
                    <img src="/item-image.png" alt="Black Automatic Watch" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">Black Automatic Watch</h4>
                        <p className="text-gray-600 text-sm">One size</p>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                        <button className="text-gray-600">-</button>
                        <span>1</span>
                        <button className="text-gray-600">+</button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-base font-semibold text-gray-900">$169.99</span>
                      <span className="text-sm text-gray-600 line-through">$199.99</span>
                    </div>
                  </div>
                </div>

                {/* Order Total */}
                <div className="border-t pt-6 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>$169.99</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping estimate</span>
                    <span>$5.00</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax estimate</span>
                    <span>$24.90</span>
                  </div>
                  <div className="flex justify-between text-gray-900 font-semibold">
                    <span>Order total</span>
                    <span>$199.89</span>
                  </div>
                </div>

                {/* Confirm Order Button */}
                <button className="w-full bg-gray-900 text-white py-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors">
                  Confirm order
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
    
    </div>
  );
};

export default CheckoutPage;