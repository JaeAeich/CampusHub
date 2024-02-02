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
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const routes = [
  {
    to: 'profile',
    label: 'Profile',
  },
  {
    to: 'Wishlist',
    label: 'wishlist',
  },
  {
    to: 'settings',
    label: 'Setting',
  },
];

function ProfileButton() {
  // TODO: add different dropdown based on if user is logged in or not
  // TODO: get user and add its
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

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
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {routes.map((route) => (
              <DropdownMenuItem key={route.to} className="cursor-pointer">
                <Link to={route.to}>{route.label}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            {/* TODO: add func to clear user form cache and redirect to '/' */}
            <Button
              className="w-full bg-accent"
              onKeyDown={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
              Log Out
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
