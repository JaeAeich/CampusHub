import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth0 } from '@auth0/auth0-react';
import { Cat } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from './ui/button';
import { unauthenticated } from '../store/auth/authSlice';

const user_id = 1;
const routes = [
  {
    to: `/users/${user_id}/details`,
    label: 'Profile',
  },
  {
    to: `/users/${user_id}/wishlist`,
    label: 'Wishlist',
  },
  {
    to: `/users/${user_id}/orders`,
    label: 'Past Orders',
  },
  {
    to: '/',
    label: 'Notifications',
  },
];

function ProfileButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (link: string) => {
    navigate(link);
    window.location.reload();
  };
  // TODO: add different dropdown based on if user is logged in or not
  // TODO: get user and add its
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

  const handleLogout = async () => {
    dispatch(unauthenticated());
    await logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {isAuthenticated ? (
            <AvatarImage src={user?.picture} />
          ) : (
            <AvatarFallback>
              <Cat
                onClick={() => loginWithRedirect()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    loginWithRedirect();
                  }
                }}
                tabIndex={0} // Add tabIndex to make the element focusable
                role="button" // Add role to indicate it's a button
              />
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isAuthenticated ? (
          <>
            <DropdownMenuLabel className="text-smm">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {routes.map((route) => (
              <DropdownMenuItem
                key={route.to}
                className="cursor-pointer py-2 pr-20 text-smm font-medium"
              >
                <Link to={route.to} onClick={() => handleClick(route.to)}>
                  {route.label}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            {/* TODO: add func to clear user form cache and redirect to '/' */}
            <Button
              className="w-full bg-accent cursor-pointer text-red-700 font-bold active:bg-accentDark"
              onClick={handleLogout}
              onKeyDown={handleLogout}
            >
              {isAuthenticated ? 'Log Out' : 'Please wait'}
            </Button>
          </>
        ) : (
          <Button className="w-full bg-accent" onClick={() => loginWithRedirect()}>
            Log in
          </Button>
        )}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileButton;
