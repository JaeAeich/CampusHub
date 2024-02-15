import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Service from '@/api/services/types';
import { getServices } from '@/api/services/services';
import Store from '@/api/stores/types';
import { services } from '../../app/constants';

function AccountDetails() {
  const [service, setServices] = useState<Service[]>([]);
  const [storeDetails, setStoreDetails] = useState<Store>({
    store_id: '',
    store_name: '',
    store_images: [],
    store_description: '',
    store_categories: [],
    store_phone_number: '',
    store_email: '',
    customer_order_ids: [],
    product_ids: [],
    seller_id: '',
    service_id: '',
    coordinates: [0,0],
    store_address: '',
    timings: [0,0], overall_rating: 0, offer_available: false
  });
  const handleChange = (field: string, value: string) => {
    const details: Store = storeDetails;
    // @ts-expect-error: user_address field was not getting set :|
    details[`${field}`] = value;
    setStoreDetails(details);
  };
  
    const response = getServices();
    if ('error' in response) {
      setServices(services);
    } else if ('services' in response) {
      setServices(response.services as Service[]);
    }

  function handleSubmit(): void {
    
  }

  return (
    <div className="px-2 md:p-4 flex justify-center w-screen">
      <div className="w-full px-6 pb-2 mt-2 sm:max-w-3xl sm:rounded-lg">
        <h2 className="mx-auto md:text-xl font-subheading font-bold text-lgg text-center">Enter Store Details</h2>
        <div className="items-center mt-2 text-primary">
          <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
            <div className="w-full">
              <label
                htmlFor="name"
                className="block mb-2 text-base font-medium text-primary dark:text-background"
              >
                Store Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-background border darkgray text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                placeholder="Store Name"
                required
                onChange={(e) => handleChange('store_name', String(e.target.value))}
              />
            </div>
          </div>

          <div className="mb-2 sm:mb-6 w-full">
          <label
                htmlFor="name"
                className="block mb-2 text-base font-medium text-primary dark:text-background"
              >
                Service
              </label>
            <Select required>
      <SelectTrigger>
        <SelectValue placeholder="Select a service" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {service.map((ser)=><SelectLabel>{ser.service_name}</SelectLabel>)}
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>

          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="Description"
              className="block mb-2 text-smm font-medium text-primary dark:text-background"
            >
              Description
            </label>
            <textarea
              id="description"
              className="bg-background border darkgray text-primary text-smm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 h-40"
              placeholder="description"
              required
              onChange={(e) => setStoreDescription(e.target.value)}
            />
          </div>

          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-smm font-medium text-primary dark:text-background"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-background border darkgray text-primary text-smm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
              placeholder="store.email@mail.com"
              required
              onChange={(e) => setStoreEmail(e.target.value)}
            />
          </div>

          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-smm font-medium text-primary dark:text-background"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="bg-background border darkgray text-primary text-smm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
              placeholder="9876543210"
              required
              onChange={(e) => setStorePhone(e.target.value)}
            />
          </div>

          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="Categories"
              className="block mb-2 text-smm font-medium text-primary dark:text-background"
            >
              Categories
            </label>
            <input
              type="text"
              id="categories"
              className="bg-background border darkgray text-primary text-smm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="Enter categories separated by commas"
              required
              onChange={(e) => setStoreCategory(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block mb-2 text-smm font-medium text-primary dark:text-background"
            >
              Address
            </label>
            <textarea
            required
              id="address"
              rows={4}
              className="block p-2.5 w-full text-smm text-primary bg-background rounded-lg border darkgray focus:ring-primary focus:border-primary "
              placeholder="Address 1"
            />
          </div>
          <div className="mb-2 justify-between sm:mb-6 sm:space-x-5 sm:space-y-0 space-y-5 flex sm:flex-row flex-col">
            <div className='flex'>
            <label
              htmlFor="x-coordie"
              className="block mb-2 text-smm font-medium text-primary dark:text-background"
            >
              Address X-Coordinate
            </label>
            <input
              type="number"
              id="x-coordie"
              className="bg-background border darkgray text-primary text-smm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="Enter X-Coordinate of your store"
              required
              onChange={(e) => setStoreCategory(e.target.value)}
            />
            </div>
            <div className='flex'>
            <label
              htmlFor="y-coordie"
              className="block mb-2 text-smm font-medium text-primary dark:text-background"
            >
              Address Y-Coordinate
            </label>
            <input
              type="number"
              id="y-coordie"
              className="bg-background border darkgray text-primary text-smm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="Enter Y-Coordinate of your store"
              required
              onChange={(e) => setStoreCategory(e.target.value)}
            />
            </div>
          </div>
          <div className="mb-2 justify-between sm:mb-6 sm:space-x-5 sm:space-y-0 space-y-5 flex sm:flex-row flex-col">
            <div className='flex'>
            <label
              htmlFor="opening-hours"
              className="block mb-2 text-smm font-medium text-primary dark:text-background"
            >
              Opening Hours
            </label>
            <input
              type="number"
              id="opening-hours"
              className="bg-background border darkgray text-primary text-smm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="Enter opening time in 24 hour format"
              required
              onChange={(e) => setStoreCategory(e.target.value)}
            />
            </div>
            <div className='flex'>
            <label
              htmlFor="closing-hours"
              className="block mb-2 text-smm font-medium text-primary dark:text-background"
            >
              Closing Hours
            </label>
            <input
              type="number"
              id="closing-hours"
              className="bg-background border darkgray text-primary text-smm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="Enter closing time in 24 hour format"
              required
              onChange={(e) => setStoreCategory(e.target.value)}
            />
            </div>
          </div>
          <div className="flex justify-end my-5">
            <button
              type="submit"
              className="text-background bg-accent font-bold hover:bg-accentDark focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-smm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-accent dark:focus:ring-accentDark"
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
