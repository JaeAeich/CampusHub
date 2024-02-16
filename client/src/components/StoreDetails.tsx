import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Service from '@/api/services/types';
import { getServices } from '@/api/services/services';
import Store from '@/api/stores/types';
import { useSelector } from 'react-redux';
import handleFile from '@/utils/fileUpload';
import { add_store } from '@/api/sellers/sellers';
import { services } from '../../app/constants';
import { RootState } from '../store/store';

function AccountDetails() {
  const [service, setServices] = useState<Service[]>([]);
  const seller_id = useSelector((state: RootState) => state.seller.sellerId);
  const { toast } = useToast();
  const navigate = useNavigate();
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
    seller_id: seller_id as string,
    service_id: '',
    coordinates: [0,0],
    store_address: '',
    timings: [0,0], overall_rating: 0, offer_available: false
  });

  const handleChange = (field: string, value: number | string | string[]) => {
    if (field === 'coordinates[0]') {
      setStoreDetails((prevDetails) => ({
        ...prevDetails,
        coordinates: [Number(value) as number, prevDetails.coordinates[1]],
      }));
    } else if (field === 'coordinates[1]') {
      setStoreDetails((prevDetails) => ({
        ...prevDetails,
        coordinates: [prevDetails.coordinates[0], Number(value) as number],
      }));
    } else if (field === 'timings[0]') {
      setStoreDetails((prevDetails) => ({
        ...prevDetails,
        timings: [Number(value) as number, prevDetails.timings[1]],
      }));
    } else if (field === 'timings[1]') {
      setStoreDetails((prevDetails) => ({
        ...prevDetails,
        timings: [prevDetails.timings[0], Number(value) as number],
      }));
    }else {
      setStoreDetails((prevDetails) => ({
        ...prevDetails,
        [field]: value,
      }));
    }
  };
  
  const handleFileChange = async (event) => {
      const imageUrl:string|undefined = await handleFile(event);
      setStoreDetails((prevDetails: Store[]) => ({
        ...prevDetails,
        store_images: [imageUrl],
      }));  
  }; 

  useEffect(() => {
    const fetchData = async () => {
        const response = await getServices();
        if ('error' in response) {
          setServices(services); 
        } else if ('services' in response) {
          setServices(response.services as Service[]);
        }
    };

    fetchData(); 
  }, []);  
   
  

  async function handleSubmit(): Promise<void> {
    const response = await add_store(seller_id, storeDetails);
    if ('id' in response) {
      toast({
        title: 'Store created',
        description: `Your store id is ${response.id}`,
      });
      navigate(`/sellers/${seller_id}/stores`);
    } else if ('message' in response) {
      toast({
        variant: 'destructive',
        title: 'Error while creating store',
        description: response.message,
      });
    }
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
                className="bg-background border darkgray text-primary text-baserounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                placeholder="Store Name"
                required
                onChange={(e) => handleChange('store_name', String(e.target.value))}
              />
            </div>
          </div>

          <div className="mb-2 sm:mb-6 w-full">
          <label
                htmlFor="service"
                className="block mb-2 text-base font-medium text-primary dark:text-background"
              >
                Service
              </label>
              <Select required onValueChange={(e) => handleChange('service_id', e)}>
                <SelectTrigger className="w-full text-smm">
                  <SelectValue placeholder="service" />
                </SelectTrigger>
                <SelectContent className="text-base">
                  <SelectGroup>
                  {service.map((ser)=><SelectItem className="text-smm" key={ser.service_id} value={ser.service_id}>{ser.service_name}</SelectItem>)}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="Description"
              className="block mb-2 text-base font-medium text-primary dark:text-background"
            >
              Description
            </label>
            <textarea
              id="description"
              className="bg-background border darkgray text-primary text-base rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 h-40"
              placeholder="description"
              required
              onChange={(e) => handleChange('store_description', String(e.target.value))}
            />
          </div>

          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-base font-medium text-primary dark:text-background"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-background border darkgray text-primary text-base rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
              placeholder="store.email@mail.com"
              required
              onChange={(e) => handleChange('store_email', String(e.target.value))}
            />
          </div>

          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-base font-medium text-primary dark:text-background"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="bg-background border darkgray text-primary text-base rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
              placeholder="9876543210"
              required
              onChange={(e) => handleChange('store_phone_number', String(e.target.value))}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block mb-2 text-base font-medium text-primary dark:text-background"
            >
              Address
            </label>
            <textarea
            required
              id="address"
              rows={4}
              className="block p-2.5 w-full text-base text-primary bg-background rounded-lg border darkgray focus:ring-primary focus:border-primary "
              placeholder="Address 1" onChange={(e) => handleChange('store_address', String(e.target.value))}

            />
          </div>
          <div className="mb-2 justify-between sm:mb-6 sm:space-x-5 sm:space-y-0 space-y-5 flex sm:flex-row flex-col">
            <div className='flex'>
            <label
              htmlFor="x-coordie"
              className="block mb-2 text-base font-medium text-primary dark:text-background"
            >
              Address X-Coordinate
            </label>
            <input
              type="number"
              id="x-coordie"
              className="bg-background border darkgray text-primary text-base rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="Enter X-Coordinate of your store"
              required
              onChange={(e) => handleChange('coordinates[0]', e.target.value)}
            />
            </div>
            <div className='flex'>
            <label
              htmlFor="y-coordie"
              className="block mb-2 text-base font-medium text-primary dark:text-background"
            >
              Address Y-Coordinate
            </label>
            <input
              type="number"
              id="y-coordie"
              className="bg-background border darkgray text-primary text-base rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="Enter Y-Coordinate of your store"
              required
              onChange={(e) => handleChange('coordinates[1]', e.target.value)}
            />
            </div>
          </div>
          <div className="mb-2 justify-between sm:mb-6 sm:space-x-5 sm:space-y-0 space-y-5 flex sm:flex-row flex-col">
            <div className='flex'>
            <label
              htmlFor="opening-hours"
              className="block mb-2 text-base font-medium text-primary dark:text-background"
            >
              Opening Hours
            </label>
            <input
              type="number"
              id="opening-hours"
              className="bg-background border darkgray text-primary text-base rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="Enter opening time in 24 hour format"
              required
              onChange={(e) => handleChange('timings[0]', e.target.value)}
            />
            </div>
            <div className='flex'>
            <label
              htmlFor="closing-hours"
              className="block mb-2 text-base font-medium text-primary dark:text-background"
            >
              Closing Hours
            </label>
            <input
              type="number"
              id="closing-hours"
              className="bg-background border darkgray text-primary text-base rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="Enter closing time in 24 hour format"
              required
              onChange={(e) => handleChange('timings[1]', e.target.value)}
            />
            </div>
          </div>
          <div className="mb-2 sm:mb-6 w-full">
            <label
              htmlFor="storeImage"
              className="block mb-2 text-base font-medium text-primary dark:text-background"
            >
              Store Image
            </label>
            <input
              type="file"
              id="storeImage"
              accept="image/*" required
              className="bg-background border darkgray text-primary text-base rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
              onChange={(e) => handleFileChange(e)}
            />
          </div>
          <div className="flex justify-end my-5">
            <button
              type="submit"
              className="text-background bg-accent font-bold hover:bg-accentDark focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-accent dark:focus:ring-accentDark"
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
