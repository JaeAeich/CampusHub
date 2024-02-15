import React, { useState } from 'react';

function AccountDetails() {
  const { storeName, setStoreName } = useState('');
  const { storeDescription, setStoreDescription } = useState('');
  const { storeAddress, setStoreAddress } = useState('');
  const { storePhone, setStorePhone } = useState('');
  const { storeEmail, setStoreEmail } = useState('');
  const { storeImage, setStoreImage } = useState('');
  const { storeCategory, setStoreCategory } = useState('');
  const { stripeId, setStripeId } = useState('');
  const { storeTimings, setStoreTimings } = useState('');

  function handleSubmit(): void {
    
  }

  return (
    <div className="px-2 md:p-4 flex justify-center w-screen">
      <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
        <h2 className="mx-auto md:text-xl font-semibold text-lgg">Store Details</h2>
        <div className="items-center mt-2 sm:mt-14 text-primary">
          <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
            <div className="w-full">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-primary dark:text-background"
              >
                Store Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-background border darkgray text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                placeholder="Store Name"
                required
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="Description"
              className="block mb-2 text-sm font-medium text-primary dark:text-background"
            >
              Description
            </label>
            <textarea
              id="description"
              className="bg-background border darkgray text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 h-40"
              placeholder="description"
              required
              onChange={(e) => setStoreDescription(e.target.value)}
            />
          </div>

          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-primary dark:text-background"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-background border darkgray text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
              placeholder="store.email@mail.com"
              required
              onChange={(e) => setStoreEmail(e.target.value)}
            />
          </div>

          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-primary dark:text-background"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="bg-background border darkgray text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
              placeholder="9876543210"
              required
              onChange={(e) => setStorePhone(e.target.value)}
            />
          </div>

          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="Categories"
              className="block mb-2 text-sm font-medium text-primary dark:text-background"
            >
              Categories
            </label>
            <input
              type="text"
              id="categories"
              className="bg-background border darkgray text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="Enter categories separated by commas"
              required
              onChange={(e) => setStoreCategory(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-primary dark:text-background"
            >
              Address
            </label>
            <textarea
              id="address"
              rows={4}
              className="block p-2.5 w-full text-sm text-primary bg-background rounded-lg border darkgray focus:ring-primary focus:border-primary "
              placeholder="Address 1"
            />
          </div>

          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="stripeId"
              className="block mb-2 text-sm font-medium text-primary dark:text-background"
            >
              Stripe Id
            </label>
            <input
              type="text"
              id="stripeId"
              className="bg-background border darkgray text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="Stripe Id"
              required
              onChange={(e) => setStripeId(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="text-background bg-accent  hover:bg-accentDark focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-accent dark:focus:ring-accentDark"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;
