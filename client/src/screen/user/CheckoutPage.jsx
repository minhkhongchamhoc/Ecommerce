import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import Footer from '../../components/Footer.jsx';
import { CartContext } from '../../contexts/CartContext';
import { OrdersContext } from '../../contexts/OrderContext';

const CheckoutPage = () => {
  const { cart, fetchCart, removeCartItem, loading: cartLoading, error: cartError } = useContext(CartContext);
  const { checkout, loading: orderLoading, error: orderError } = useContext(OrdersContext);

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

  // Input validation functions
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim());
  };

  const validatePhone = (value) => {
    const phoneRegex = /^\+?\d{10,15}$/;
    return !value || phoneRegex.test(value.replace(/\D/g, ''));
  };

  const validateCardNumber = (value) => {
    const cardRegex = /^\d{16}$/;
    return cardRegex.test(value.replace(/\D/g, ''));
  };

  const validateExpiryDate = (value) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(value)) return false;
    const [month, year] = value.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    return month >= 1 && month <= 12 && (year > currentYear || (year === currentYear && month >= currentMonth));
  };

  const validateCvc = (value) => {
    const cvcRegex = /^\d{3,4}$/;
    return cvcRegex.test(value);
  };

  // Handle checkout
  const handleCheckout = async () => {
    console.log('handleCheckout started', { cart });
    if (!cart?.items?.length) {
      console.log('Checkout blocked: Empty cart');
      alert('Your cart is empty');
      return;
    }

    // Validate form inputs
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedCardNumber = cardNumber.replace(/\D/g, '');
    const trimmedExpiryDate = expiryDate.trim();
    const trimmedCvc = cvc.trim();

    if (!trimmedEmail || !firstName.trim() || !lastName.trim() || !address1.trim() || !city.trim() || !country.trim() || !state.trim() || !postalCode.trim() || !trimmedCardNumber || !cardName.trim() || !trimmedExpiryDate || !trimmedCvc) {
      console.log('Checkout blocked: Incomplete form');
      alert('Please fill in all required fields.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      console.log('Checkout blocked: Invalid email');
      alert('Please enter a valid email address.');
      return;
    }

    if (trimmedPhone && !validatePhone(trimmedPhone)) {
      console.log('Checkout blocked: Invalid phone');
      alert('Please enter a valid phone number (10-15 digits) or leave it empty.');
      return;
    }

    if (!validateCardNumber(trimmedCardNumber)) {
      console.log('Checkout blocked: Invalid card number');
      alert('Please enter a valid 16-digit card number.');
      return;
    }

    if (!validateExpiryDate(trimmedExpiryDate)) {
      console.log('Checkout blocked: Invalid expiry date');
      alert('Please enter a valid expiration date (MM/YY) that is not in the past.');
      return;
    }

    if (!validateCvc(trimmedCvc)) {
      console.log('Checkout blocked: Invalid CVC');
      alert('Please enter a valid CVC (3 or 4 digits).');
      return;
    }

    try {
      // Validate cart
      if (!cart || !cart.items || cart.items.length === 0) {
        console.log('Checkout blocked: Invalid cart');
        alert('Your cart is empty or invalid. Please add items to proceed.');
        return;
      }

      // Use cart item IDs
      const selectedItems = cart.items.map((item) => item._id);
      console.log('Selected Items:', selectedItems);
      console.log('Cart Items:', cart.items);

      // Validate selectedItems
      if (selectedItems.length === 0) {
        console.log('Checkout blocked: No valid items');
        alert('No items available for checkout.');
        return;
      }

      const checkoutData = {
        selectedItems,
        shippingAddress: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          addressLine1: address1.trim(),
          aptSuite: aptSuite.trim(),
          addressLine2: address2.trim(),
          city: city.trim(),
          country: country.trim(),
          state: state.trim(),
          postalCode: postalCode.trim(),
        },
        contactInfo: {
          phoneNumber: trimmedPhone,
          email: trimmedEmail,
        },
        paymentInfo: {
          cardNumber: trimmedCardNumber,
          nameOnCard: cardName.trim(),
          expirationDate: trimmedExpiryDate,
          cvc: trimmedCvc,
          paymentMethod: 'credit_card',
        },
      };

      console.log('Checkout payload:', checkoutData);
      const response = await checkout(checkoutData);
      console.log('Checkout success:', response);
      alert('Checkout completed successfully!');
    } catch (err) {
      console.error('Checkout error:', err.message, err.response?.data);
      let errorMessage = orderError || 'Checkout failed. Please try again.';
      if (err.message === 'No valid items selected') {
        errorMessage = 'Selected items are invalid or not in your cart. Please review your cart.';
      } else if (err.message.includes('payment') || err.response?.data?.error?.includes('payment')) {
        errorMessage = 'Invalid payment information. Please check your card details.';
      } else if (err.message.includes('401')) {
        errorMessage = 'Session expired. Please log in again.';
      }
      alert(errorMessage);
    }
  };

  // Calculate order totals
  const subtotal = cart?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const shipping = 5.00;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center font-poppins">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  if (cartError) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center font-poppins">
        <div className="text-red-600 text-lg">{cartError}</div>
      </div>
    );
  }

  return (
    <div className="checkout-page min-h-screen bg-white flex flex-col font-poppins">
      <main className="flex-1 py-6 md:py-8 lg:py-10 flex justify-center">
        <div className="w-full max-w-6xl px-4 sm:px-6">
          {/* Breadcrumbs and Heading */}
          <div className="flex flex-col gap-2 md:gap-4 mb-6 md:mb-8 lg:mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900">Checkout</h2>
            <div className="flex gap-2 text-sm md:text-base text-gray-600">
              <Link to="/" className="hover:underline">Homepage</Link>
              <span>/</span>
              <span>Checkout</span>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Checkout Details */}
            <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
              {/* Contact Info */}
              <div className="border rounded-lg shadow-sm">
                <div className="flex items-center gap-4 p-4 md:p-6 border-b">
                  <span className="text-gray-900 font-semibold text-sm md:text-base">CONTACT INFO</span>
                </div>
                <div className="p-4 md:p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-medium text-gray-900">Your phone number</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md text-sm md:text-base"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-medium text-gray-900">Email address</label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded-md text-sm md:text-base"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border rounded-lg shadow-sm">
                <div className="flex items-center gap-4 p-4 md:p-6 border-b">
                  <span className="text-gray-900 font-semibold text-sm md:text-base">SHIPPING ADDRESS</span>
                </div>
                <div className="p-4 md:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="space-y-2 w-full sm:w-1/2">
                      <label className="text-xs md:text-sm font-medium text-gray-900">First name</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md text-sm md:text-base"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 w-full sm:w-1/2">
                      <label className="text-xs md:text-sm font-medium text-gray-900">Last name</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md text-sm md:text-base"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="space-y-2 w-full sm:w-1/2">
                      <label className="text-xs md:text-sm font-medium text-gray-900">Address line 1</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md text-sm md:text-base"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 w-full sm:w-1/2">
                      <label className="text-xs md:text-sm font-medium text-gray-900">Apt, Suite</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md text-sm md:text-base"
                        value={aptSuite}
                        onChange={(e) => setAptSuite(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-medium text-gray-900">Address line 2</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md text-sm md:text-base"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="space-y-2 w-full sm:w-1/2">
                      <label className="text-xs md:text-sm font-medium text-gray-900">City</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md text-sm md:text-base"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 w-full sm:w-1/2">
                      <label className="text-xs md:text-sm font-medium text-gray-900">Country</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md text-sm md:text-base"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="space-y-2 w-full sm:w-1/2">
                      <label className="text-xs md:text-sm font-medium text-gray-900">State/Province</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md text-sm md:text-base"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 w-full sm:w-1/2">
                      <label className="text-xs md:text-sm font-medium text-gray-900">Postal code</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md text-sm md:text-base"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="border rounded-lg shadow-sm">
                <div className="flex items-center gap-4 p-4 md:p-6 border-b">
                  <span className="text-gray-900 font-semibold text-sm md:text-base">PAYMENT</span>
                </div>
                <div className="p-4 md:p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-medium text-gray-900">Card number</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md text-sm md:text-base"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-medium text-gray-900">Name on the card</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md text-sm md:text-base"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="space-y-2 w-full sm:w-1/2">
                      <label className="text-xs md:text-sm font-medium text-gray-900">Expiration date (MM/YY)</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md text-sm md:text-base"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="space-y-2 w-full sm:w-1/2">
                      <label className="text-xs md:text-sm font-medium text-gray-900">CVC</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md text-sm md:text-base"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary - shown below checkout details on mobile, adjacent on larger screens */}
            <div className="w-full lg:w-1/2 mt-6 lg:mt-0 space-y-4 md:space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Order summary</h3>
              <div className="space-y-4 md:space-y-6 border rounded-lg shadow-sm p-4 md:p-6 bg-gray-50">
                {cart?.items?.length ? (
                  cart.items.map((item) => (
                    <div key={item._id} className="flex gap-3 md:gap-4 border-t pt-4 md:pt-6">
                      <div className="w-16 h-20 md:w-24 md:h-28 overflow-hidden rounded-lg bg-white">
                        <img
                          src={item.product.images?.[0] || 'https://placehold.co/100x100'}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1 md:space-y-2">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="text-sm md:text-base font-semibold text-gray-900">{item.product.name}</h4>
                            <p className="text-xs md:text-sm text-gray-600">Size: {item.size}</p>
                          </div>
                          <div className="text-xs md:text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-sm md:text-base font-semibold text-gray-900">${item.price.toFixed(2)}</span>
                          <span className="text-xs md:text-sm text-gray-600 line-through">${(item.price * 1.2).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-600 text-base md:text-lg py-4">Your cart is empty</div>
                )}

                {/* Order Total */}
                <div className="border-t pt-4 md:pt-6 space-y-2 md:space-y-4">
                  <div className="flex justify-between text-sm md:text-base text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base text-gray-600">
                    <span>Shipping estimate</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base text-gray-600">
                    <span>Tax estimate</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base md:text-lg text-gray-900 font-semibold pt-2 border-t">
                    <span>Order total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Confirm Order Button */}
                <button
                  className="w-full bg-gray-900 text-white py-3 px-4 text-sm md:text-base rounded-full shadow-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex justify-center items-center"
                  onClick={handleCheckout}
                  disabled={orderLoading || cartLoading}
                >
                  {orderLoading ? 'Processing...' : 'Confirm order'}
                </button>
                
                {/* Back to shopping link - added for better mobile UX */}
                <div className="text-center pt-2">
                  <Link to="/products" className="text-sm md:text-base text-gray-600 hover:text-gray-900 underline">
                    Continue shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;