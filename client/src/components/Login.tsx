import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Component() {
  const [showLogin, setShowLogin] = useState(false);
  const [inputClicked, setPasswordClick] = useState(false);
  return (
    <div className="min-h-screen flex lg:flex-row flex-col w-full">
      <div className="flex lg:h-full lg:w-1/2 h-1/3 w-full bg-black text-white relative">
        <div className="flex-grow flex sm:flex-row flex-col items-center h-full justify-center relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/campus.jpeg')`,
              filter: 'opacity(0.4)', // Adjust the opacity as needed
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
            {showLogin ? 'Login' : 'Create an account'}
          </h2>
          {showLogin ? (
            <span className="text-sm text-darkgray">
              Don&apos;t have an account?{' '}
              <span
                onMouseEnter={() => setShowLogin(false)}
                className="hover:underline hover:primary cursor-pointer"
              >
                Sign up
              </span>
            </span>
          ) : (
            <span className="text-sm text-darkgray">
              Already have an account?{' '}
              <span
                onMouseEnter={() => setShowLogin(true)}
                className="hover:underline hover:primary cursor-pointer"
              >
                Login
              </span>
            </span>
          )}
          <p className="xl:text-lg text-xs text-gray-600 xl:mb-4 mb-2">
            {showLogin
              ? 'Login with registered email and password'
              : 'Enter your email below to create your account'}
          </p>
          {/* <div className="flex flex-row xl:mt-0 mt-2">
            <Input
              className="h-11 mb-4 border xl:text-base text-sm border-gray-300 placeholder-primary mr-2"
              placeholder="Name"
            />
            <Input
              className="h-11 mb-4 border xl:text-base text-sm border-gray-300 placeholder-primary ml-2"
              placeholder="Phone Number"
            />
          </div> */}
          <Input
            className="h-11 mb-4 border xl:text-base text-sm border-gray-300 placeholder-primary"
            placeholder="name@example.com"
          />
          <Input
            type="password"
            className="h-11 mb-4 border xl:text-base text-sm border-gray-300 placeholder-primary"
            placeholder="password"
            onClick={() => setPasswordClick(true)}
          />
          {!showLogin && inputClicked ? (
            <div className="border border p-2 text-sm font-body text-darkgray">
              <ul style={{ listStyleType: 'disc', marginLeft: '1.5em' }}>
                <li>At least 8 characters</li>
                <li>At least 3 of the following:</li>
                <ul style={{ listStyleType: 'circle', marginLeft: '1.5em' }}>
                  <li>Lower case letters (a-z)</li>
                  <li>Upper case letters (A-Z)</li>
                  <li>Numbers (0-9)</li>
                  <li>Special characters (e.g. !@#$%^&*)</li>
                </ul>
              </ul>
            </div>
          ) : null}

          <Button className="my-4 py-10 h-10 bg-secondary text-background hover:bg-darkgray shadow font-bold py-3 px-4 rounded flex justify-start items-center cursor-pointer w-full">
            {showLogin ? (
              <span className="mx-auto xl:text-base text-sm">Login with Email</span>
            ) : (
              <span className="mx-auto xl:text-base text-sm">Sign up with Email</span>
            )}
          </Button>
          <div className="flex items-center mb-4">
            <div className="flex-grow h-px bg-secondary" />
            <span className="mx-4 text-sm text-darkgray">or continue with</span>
            <div className="flex-grow h-px bg-secondary" />
          </div>
          <Button className="py-10 h-10 bg-accentLight text-background hover:bg-accent shadow font-bold py-3 px-4 rounded flex mx-auto items-center cursor-pointer w-full">
            <div className="flex flex-row">
              <svg
                viewBox="0 0 24 24"
                className="fill-current w-6 h-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
              </svg>
              {showLogin ? (
                <span className="ml-2 xl:text-base text-sm">Login with Google</span>
              ) : (
                <span className="ml-2 xl:text-base text-sm">Sign up with Google</span>
              )}
            </div>
          </Button>
          <div className="w-full">
            {/* <GoogleLogin  onSuccess={responseMessage} onError={() => errorMessage} /> */}
          </div>
          <p className="text-sm text-darkgray mt-4">
            By clicking continue, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
