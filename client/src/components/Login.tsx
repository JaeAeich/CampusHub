import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth0 } from '@auth0/auth0-react';
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
import Seller from '@/api/sellers/types';
import { useNavigate } from 'react-router-dom';

export default function Component() {
  const { user } = useAuth0();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const formTarget = event.currentTarget as HTMLFormElement;

    const formData: Omit<Seller, 'seller_id'> = {
      seller_name: user?.name || 'unknown',
      seller_phone_number: (formTarget.elements.namedItem('phoneNumber') as HTMLInputElement).value,
      seller_email: user?.email || 'unknown',
      seller_image: user?.picture || 'unknown',
      seller_gender: (formTarget.elements.namedItem('gender') as HTMLSelectElement).value as
        | 'Male'
        | 'Female'
        | 'Other',
      seller_address: (formTarget.elements.namedItem('address') as HTMLInputElement).value,
      store_ids: [],
      order_ids: [],
    };

    const response = await addSeller(formData);
    if ('id' in response) {
      toast({
        title: 'Seller create',
        description: response.id,
      });
      navigate('/');
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

  return (
    <form onSubmit={handleSubmit} className="flex lg:flex-row flex-col w-full">
      <div className="flex lg:h-full lg:w-1/2 h-1/3 w-full bg-black text-white relative">
        <div className="flex-grow flex sm:flex-row flex-col items-center h-full justify-center relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/campus.jpeg')`,
              filter: 'opacity(0.4)',
            }}
          />
          <img
            src="/logo.png"
            className="xl:h-1/6 sm:h-[90px] h-[60px] z-10"
            alt="CampusHub Logo"
          />
          <div className="flex flex-col z-10">
            <h1 className="font-heading xl:text-4xll text-3xl font-bold xl:leading-8 leading-5">
              CampusHub
            </h1>
            <h3 className="xl:ml-7 xl:text-base text-smm italic xl:leading-10 leading-8">
              Connecting campus, connecting ventures
            </h3>
          </div>
        </div>
      </div>
      <div className="lg:h-full lg:w-1/2 h-2/3 w-full bg-white p-12 flex flex-col justify-center">
        <div className="mt-12">
          <h2 className="xl:text-3xl md:text-2xl text-xl font-bold xl:mb-1 xl:leading-10 text-subheading">
            Start you Business with us!
          </h2>
          <p className="xl:text-lg text-xs text-gray-600 xl:mb-4 mb-2">
            Enter your email below to create your account
          </p>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex w-full md:flex-row flex-col justify-center items-center md:gap-2">
              <Input
                name="username"
                type="text"
                disabled
                className="border xl:text-base text-sm border-gray-300 placeholder-primary"
                placeholder={user?.name}
                required
              />
              <Input
                name="phoneNumber"
                type="number"
                className="border xl:text-base text-sm border-gray-300 placeholder-primary"
                placeholder="Phone Number"
                required
              />
            </div>
            <Input
              className="border xl:text-base text-sm border-gray-300 placeholder-primary"
              type="email"
              disabled
              placeholder={user?.email}
            />
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
            <Input
              type="text"
              name="address"
              className="border xl:text-base text-sm border-gray-300 placeholder-primary"
              required
              placeholder="Address"
            />
          </div>
          <Button
            type="submit"
            className="my-4 bg-accent h-10 text-background hover:bg-darkgray shadow font-bold py-3 px-4 rounded flex justify-start items-center cursor-pointer w-full"
          >
            <span className="mx-auto xl:text-base text-sm">Register as Seller</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
