// src/components/RegisterPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Svg from '../assets/svg.svg';
import Svg1 from '../assets/svg1.svg';
import Svg2 from '../assets/svg2.svg';
import Svg3 from '../assets/svg3.svg';
import Stripe from '../assets/stripe.svg';
import Svg4 from '../assets/svg4.svg';
import Userbtn from '../assets/userbtn.svg';
import Svg5 from '../assets/svg5.svg';
import visaIcon from '../assets/visa.png';
import paypalIcon from '../assets/paypal.png';
import verisignIcon from '../assets/verisign.png';

const RegisterPage = () => {
  return (
    <div className="register-page-desktop">
      <div className="header">
        <div className="header-container">
          <div className="logo-space-block">
            <div className="nexton">NEXTON</div>
            <div className="ecommerce">eCommerce</div>
          </div>
          <div className="searchbar">
            <img src={Svg4} className="svg-icon" alt="Search" />
            <input
              type="text"
              className="search-input"
              placeholder="Search in products..."
            />
          </div>
          <div className="header-buttons">
            <img src={Userbtn} alt="User" style={{ width: 24, height: 24 }} />
            <div className="cart">
              <div className="cart-btn">
                <img src={Svg5} alt="Cart" style={{ width: 24, height: 24 }} />
                <div className="cart-items">
                  <div className="text-21">3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="main-content">
          <div className="h2">Register</div>
          <div className="form">
            <div className="email-input">
              <div className="h5">Email</div>
              <input className="input" placeholder="example@example.com" />
            </div>
            <div className="email-input">
              <div className="h5">Password</div>
              <input className="input" type="password" />
            </div>
            <div className="email-input">
              <div className="h5">Password (Again)</div>
              <input className="input" type="password" />
            </div>
            <button className="continue-btn">
              <div className="text-17">Continue</div>
            </button>
          </div>
          <div className="seperator">
            <div className="divabsolute"></div>
            <div className="spanrelative">
              <div className="text-18">OR</div>
            </div>
          </div>
          <div className="text-19">
            <span className="already-a-member">Already a member? </span>
            <Link to="/login" className="login">Login</Link>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="main-footer">
          <div className="footer-content">
            <div className="info">
              <div className="logo-space-block">
                <div className="nexton">NEXTON</div>
                <div className="ecommerce">eCommerce</div>
              </div>
              <div className="list">
                <div className="list-item">
                  <img src={Svg} className="svg-icon" alt="Facebook" />
                  <div className="text">Facebook</div>
                </div>
                <div className="list-item">
                  <img src={Svg1} className="svg-icon" alt="Youtube" />
                  <div className="text">Youtube</div>
                </div>
                <div className="list-item">
                  <img src={Svg2} className="svg-icon" alt="Telegram" />
                  <div className="text">Telegram</div>
                </div>
                <div className="list-item">
                  <img src={Svg3} className="svg-icon" alt="Twitter" />
                  <div className="text">Twitter</div>
                </div>
              </div>
            </div>
            <div className="info">
              <div className="h5">Getting started</div>
              <div className="list1">
                <div className="text">Release Notes</div>
                <div className="text">Upgrade Guide</div>
                <div className="text">Browser Support</div>
                <div className="text">Dark Mode</div>
              </div>
            </div>
            <div className="info">
              <div className="h5">Explore</div>
              <div className="list1">
                <div className="text">Prototyping</div>
                <div className="text">Design systems</div>
                <div className="text">Pricing</div>
                <div className="text">Security</div>
              </div>
            </div>
            <div className="info">
              <div className="h5">Community</div>
              <div className="list1">
                <div className="text">Discussion Forums</div>
                <div className="text">Code of Conduct</div>
                <div className="text">Contributing</div>
                <div className="text">API Reference</div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="text">Nexton eCommerce. © 2024</div>
          <div className="payment-icons">
            <img src={visaIcon} className="visa-icon" alt="Visa" />
            <img src={paypalIcon} className="visa-icon" alt="Paypal" />
            <img src={Stripe} className="visa-icon" alt="Stripe" />
            <img src={verisignIcon} className="visa-icon" alt="Verisign" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;