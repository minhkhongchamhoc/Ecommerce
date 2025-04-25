const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const userApi = {
  GET_PROFILE: `${BASE_URL}/api/user/profile`,
  UPDATE_PROFILE: `${BASE_URL}/api/user/profile`,
  ADD_ADDRESS: `${BASE_URL}/api/user/addresses`,
  ADD_PAYMENT_METHOD: `${BASE_URL}/api/user/payment-methods`,
  UPDATE_PREFERENCES: `${BASE_URL}/api/user/preferences`
};

export default userApi;