import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { addSeller } from '@/api/sellers/sellers';
import { sellerAuthenticated, setSellerId } from '@/store/seller/sellerSlice';
import Seller from '@/api/sellers/types';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';

export default function Component() {
  const { user } = useAuth0();
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sellerAuth = useSelector((state: RootState) => state.seller.sellerAuth);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const formTarget = event.currentTarget as HTMLFormElement;

    const formData: Omit<Seller, 'seller_id'> = {
      seller_name: (formTarget.elements.namedItem('username') as HTMLInputElement).value,
      seller_phone_number: (formTarget.elements.namedItem('phoneNumber') as HTMLInputElement).value,
      seller_email: (formTarget.elements.namedItem('email') as HTMLInputElement).value,
      seller_image: user?.picture || 'unknown',
      seller_gender: (formTarget.elements.namedItem('gender') as HTMLSelectElement).value as
        | 'Male'
        | 'Female'
        | 'Other',
      seller_address: (formTarget.elements.namedItem('address') as HTMLInputElement).value,
      store_ids: [],
    };

    const response = await addSeller(formData);
    if ('id' in response) {
      toast({
        title: 'Seller created',
        description: `Your id is ${response.id}`,
      });
      dispatch(sellerAuthenticated());
      dispatch(setSellerId(response.id));
      navigate(`/sellers/${response.id}/dashboard`);
    } else if ('message' in response) {
      toast({
        variant: 'destructive',
        title: 'Seller Already Exists',
        description: response.message,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: response.toString(),
      });
    }
  };
  if(sellerAuth){
    return (
      <div className='items-center my-auto mx-auto justify-center'>
        Seller Exists! 
      </div>
    )
  }
  return (
    <form onSubmit={handleSubmit} className="flex lg:flex-row flex-col w-full">
      <div className="mx-auto justify-center lg:h-full lg:w-1/2 h-2/3 w-full bg-white p-5 flex flex-col justify-center">
          
          <div className="flex flex-col justify-center items-center gap-5">
          <div className="justify-center flex flex-col items-center sm:flex-row sm:space-y-0 space-y-5 mt-5 mb-8" >
            <img
              className="object-cover w-32 h-32 p-1 rounded-full ring-2 ring-secondary dark:ring-background"
              src={
                user
                  ? user.picture
                  : 'https://www.nicepng.com/png/full/933-9332131_profile-picture-default-png.png'
              }
              alt="Bordered avatar"
            />
            <div className="flex flex-col space-y-5 sm:ml-8">
              <Button
                type="button"
                className="py-1.5 px-3 sm:text-smm text-basefont-medium text-primary focus:outline-none bg-accent rounded-lg border border-accent hover:bg-accentDark focus:z-10 focus:ring-4 focus:ring-accent "
              >
                Change picture
              </Button>
              <Button
                type="button"
                className="py-1.5 px-3 sm:text-smm text-basefont-medium text-primary focus:outline-none bg-secondary rounded-lg border border-secondary hover:bg-darkgray hover:text-primary focus:z-10 focus:ring-4 focus:ring-darkgray "
              >
                Delete picture
              </Button>
            </div>
          </div>
          <div className='w-full justify-start'>
            <label
                  htmlFor="name"
                  className="block mb-2 text-smm font-medium text-primary dark:text-background"
                >
                  Name
                </label>
              <Input
                name="username"
                type="text" id="name"
                className="border xl:text-base text-sm border-gray-300 placeholder-primary mb-2 md:mb-0"
                required
              />
              </div>
              <div className='w-full justify-start'>
              <label
                htmlFor="phone"
                className="block mb-2 text-smm font-medium text-primary dark:text-background"
              >
                Phone Number
              </label>
              <Input id="phone"
                name="phoneNumber"
                type="number"
                className="border xl:text-base text-sm border-gray-300 placeholder-primary"
                placeholder="Phone Number"
                required
              />
              </div>
              <div className='w-full justify-start'>
              <label
                htmlFor="email"
                className="block mb-2 text-smm font-medium text-primary dark:text-background"
              >
                Email
              </label>
            <Input 
              className="border xl:text-base text-sm border-gray-300 placeholder-primary"
              name="email"
              type="email" value={user?.email} disabled
              placeholder="Email"
            />
            </div>
            <div className='w-full justify-start'>
            <label
                htmlFor="gender"
                className="block mb-2 text-smm font-medium text-primary dark:text-background"
              >
                Gender
              </label>
            <Select name="gender" required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            </div>
            <div className='w-full justify-start'>
            <label
                htmlFor="address"
                className="block mb-2 text-smm font-medium text-primary dark:text-background"
              >
                Address
              </label>
            <Input
              type="text"
              name="address"
              className="border xl:text-base text-sm border-gray-300 placeholder-primary"
              required
              placeholder="Address"
            />
            </div>
          </div>
          <Button
            type="submit"
            className="my-4 bg-accent h-10 text-background hover:bg-darkgray shadow font-bold py-3 px-4 rounded flex items-center cursor-pointer"
          >
            Register as Seller
          </Button>
        </div>
    </form>
  );
}
