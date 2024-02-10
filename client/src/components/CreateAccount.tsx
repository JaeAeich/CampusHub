import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import addUser from '@/api/users/users';
import { useAuth0 } from '@auth0/auth0-react';
import User from '@/api/users/types';
import { Input } from './ui/input';
import { Button } from './ui/button';

function CreateAccount() {
  const navigate = useNavigate();
  const { user_email } = useParams();
  const { user } = useAuth0();
  const [userDetails, setUserDetails] = useState<User>({
    user_id: '',
    user_name: '',
    user_phone_number: '',
    user_email: user_email || '',
    user_gender: '',
    order_ids: [],
    user_image:
      user?.picture ||
      'https://www.nicepng.com/png/full/933-9332131_profile-picture-default-png.png',
    user_address: '',
    cart_id: '',
    wishlist_cart_id: '',
  });
  const [fieldLeft, setMandatory] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);

  const handleChange = (field: string, value: string) => {
    const details: User = userDetails;
    // @ts-expect-error: user_address field was not getting set :|
    details[`${field}`] = value;
    setUserDetails(details);
  };

  const handleSubmit = async () => {
    setMandatory(false);
    setTryAgain(false);
    if (
      userDetails.user_name === '' ||
      userDetails.user_phone_number === '' ||
      userDetails.user_address === '' ||
      userDetails.user_gender === ''
    ) {
      setMandatory(true);
      return;
    }
    const addedUser = await addUser(userDetails as User);
    if ('error' in addedUser) {
      setMandatory(false);
      setTryAgain(true);
    } else {
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <div className="w-full justify-center mx-auto px-2 md:px-4 py-16">
      <div className="w-4/5 sm:max-w-3xl sm:rounded-lg justify-center mx-auto ">
        <h2 className="text-center mx-auto md:text-2xl font-semibold text-xl">
          Create your account
        </h2>
        <div className="grid max-w-2xl mx-auto mt-8">
          <div className="justify-center flex flex-col items-center sm:flex-row sm:space-y-0 space-y-5">
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

          <div className="items-center mt-8 sm:mt-14 text-primary">
            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-smm font-medium text-primary dark:text-background"
                >
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  className="bg-background border darkgray text-primary text-smm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  placeholder="Name"
                  defaultValue={user?.name}
                  value={userDetails.user_name}
                  onChange={(e) => handleChange('user_name', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-2 sm:mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-smm font-medium text-primary dark:text-background"
              >
                Email
              </label>
              <Input
                type="email"
                id="email"
                className="bg-background border darkgray text-primary text-smm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                value={user_email}
                disabled
              />
            </div>
            <div className="mb-2 sm:mb-6">
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-smm font-medium text-primary dark:text-background"
              >
                Phone Number
              </label>
              <Input
                type="number"
                id="phoneNumber"
                className="bg-background border darkgray text-primary text-smm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                placeholder="9876543210"
                onChange={(e) => handleChange('user_phone_number', String(e.target.value))}
                required
              />
            </div>

            <div className="mb-2 sm:mb-6">
              <label
                htmlFor="gender"
                className="block mb-2 text-smm font-medium text-primary dark:text-background"
              >
                Gender
              </label>
              <Select onValueChange={(e) => handleChange('user_gender', e)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent className="text-smm">
                  <SelectGroup>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="address"
                className="block mb-2 text-smm font-medium text-primary dark:text-background"
              >
                Address
              </label>
              <Input
                id="address"
                className="block p-2.5 w-full text-smm text-primary bg-background rounded-lg border darkgray focus:ring-primary focus:border-primary"
                placeholder="Address 1"
                // value={userDetails.user_address}
                onChange={(e) => handleChange('user_address', e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <Button
                type="submit"
                className="w-1/3 flex mx-auto text-background bg-accent  hover:bg-accentDark focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-accent dark:focus:ring-accentDark"
                onClick={handleSubmit}
              >
                Create Account
              </Button>
              {fieldLeft && (
                <p className="pt-3 font-semibold flex mx-auto text-accent text-smm">
                  All fields are mandatory!
                </p>
              )}
              {tryAgain && (
                <p className="pt-3 font-semibold flex mx-auto text-accent text-smm">Try Again!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
