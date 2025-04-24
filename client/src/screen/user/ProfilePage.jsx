import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import UserContext from '../../contexts/UserContext';

const ProfilePage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { user, loading, error, updateUserProfile, addAddress } = useContext(UserContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    addresses: []
  });
  const [newAddress, setNewAddress] = useState({
    type: 'home',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    isDefault: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (user) {
      setProfile({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phoneNumber: user.phoneNumber || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
        gender: user.gender || '',
        addresses: user.addresses || []
      });
    }
  }, [isLoggedIn, user, navigate]);

  const handleInputChange = (e, field) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  const handleAddressInputChange = (e, field) => {
    const value = field === 'isDefault' ? e.target.checked : e.target.value;
    setNewAddress({ ...newAddress, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      await updateUserProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phoneNumber,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender
      });
      setIsEditing(false);
    } catch (err) {
      setFormError(err.message || 'Failed to update profile');
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      await addAddress(newAddress);
      setNewAddress({
        type: 'home',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        isDefault: false
      });
      setIsAddingAddress(false);
    } catch (err) {
      setFormError(err.message || 'Failed to add address');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex justify-center items-center font-poppins">
        <div className="text-gray-600 text-lg">Loading...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white flex justify-center items-center font-poppins">
        <div className="text-red-600 text-lg">{error}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-10 flex justify-center font-poppins">
      <div className="w-full max-w-6xl px-6">
        <h2 className="text-4xl font-semibold text-gray-900 mb-8">My Profile</h2>
        <div className="border rounded-lg p-6 bg-white shadow-sm space-y-6">
          {formError && (
            <div className="text-red-600 text-sm">{formError}</div>
          )}
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">First Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={profile.firstName}
                    onChange={(e) => handleInputChange(e, 'firstName')}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Last Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={profile.lastName}
                    onChange={(e) => handleInputChange(e, 'lastName')}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Phone Number</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={profile.phoneNumber}
                    onChange={(e) => handleInputChange(e, 'phoneNumber')}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Date of Birth</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md"
                    value={profile.dateOfBirth}
                    onChange={(e) => handleInputChange(e, 'dateOfBirth')}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Gender</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={profile.gender}
                    onChange={(e) => handleInputChange(e, 'gender')}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 text-gray-900 py-2 px-4 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Name:</span> {profile.firstName} {profile.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Phone:</span> {profile.phoneNumber || 'Not provided'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Date of Birth:</span>{' '}
                    {profile.dateOfBirth
                      ? new Date(profile.dateOfBirth).toLocaleDateString()
                      : 'Not provided'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Gender:</span> {profile.gender || 'Not provided'}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Addresses</h3>
                {profile.addresses.length === 0 ? (
                  <p className="text-sm text-gray-600">No addresses added.</p>
                ) : (
                  <div className="mt-2 space-y-4">
                    {profile.addresses.map((address, index) => (
                      <div key={index} className="border p-4 rounded-md">
                        <p className="text-sm font-medium text-gray-900 capitalize">
                          {address.type} {address.isDefault && '(Default)'}
                        </p>
                        <p className="text-sm text-gray-600">{address.addressLine1}</p>
                        {address.addressLine2 && (
                          <p className="text-sm text-gray-600">{address.addressLine2}</p>
                        )}
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state} {address.postalCode}
                        </p>
                        <p className="text-sm text-gray-600">{address.country}</p>
                      </div>
                    ))}
                  </div>
                )}
                {!isAddingAddress && (
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="mt-4 bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800"
                  >
                    Add New Address
                  </button>
                )}
              </div>
              {isAddingAddress && (
                <form onSubmit={handleAddAddress} className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">New Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">Address Type</label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={newAddress.type}
                        onChange={(e) => handleAddressInputChange(e, 'type')}
                        required
                      >
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">Address Line 1</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={newAddress.addressLine1}
                        onChange={(e) => handleAddressInputChange(e, 'addressLine1')}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">Address Line 2</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={newAddress.addressLine2}
                        onChange={(e) => handleAddressInputChange(e, 'addressLine2')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">City</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={newAddress.city}
                        onChange={(e) => handleAddressInputChange(e, 'city')}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">State/Province</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={newAddress.state}
                        onChange={(e) => handleAddressInputChange(e, 'state')}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">Postal Code</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={newAddress.postalCode}
                        onChange={(e) => handleAddressInputChange(e, 'postalCode')}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">Country</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={newAddress.country}
                        onChange={(e) => handleAddressInputChange(e, 'country')}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-900">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={newAddress.isDefault}
                          onChange={(e) => handleAddressInputChange(e, 'isDefault')}
                        />
                        Set as Default
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800"
                    >
                      Save Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="bg-gray-200 text-gray-900 py-2 px-4 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;