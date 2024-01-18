import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SVGProps } from 'react';
import { JSX } from 'react/jsx-runtime';
import { GoogleLogin } from 'git status
';

export default function Component() {
  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = (error: any) => {
    console.log(error);
  };
  return (
    <div className="login min-h-screen flex">
      <div className="w-1/2 bg-black text-white px-12 flex flex-col justify-center relative">
  <div className='px-12'>
    <img src="./logo-with-name.png" width="70%" className='loginLogo' alt="CampusHub Logo"></img>
  </div>
</div>
      <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
        <div className="text-right">
          {/* <Link className="text-sm font-medium text-gray-600" href="#">
            Login
          </Link> */}
        </div>
        <div className="mt-12">
          <h2 className="text-login text-3xl font-bold mb-4">Create an account</h2>
          <p className="text-login text-gray-600 mb-8">Enter your email below to create your account</p>
          <Input className="mb-4 border border-gray-300 placeholder-black" placeholder="name@example.com" />
          <Button className="loginEmail w-full mb-4">Sign In with Email</Button>
          <div className="flex items-center mb-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-4 text-sm tzext-gray-500">OR CONTINUE WITH</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>
          {/* <Button className="flex items-center justify-center w-full mb-4" variant="outline">
            <ChromeIcon className="text-gray-600 h-5 w-5 mr-2" />
            Google
          </Button> */}
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} style={{width:"100%"}}/>
          <p className="text-xs text-gray-500 mt-4">
            By clicking continue, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

function ChromeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function FlagIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}
