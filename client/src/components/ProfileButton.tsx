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
import { RootState } from '@/store/store';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import { unauthenticated } from '../store/auth/authSlice';
import { sellerUnauthenticated } from '../store/seller/sellerSlice';

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
    to: `/users/${user_id}/cart`,
    label: 'Cart',
  },
  {
    to: `/users/${user_id}/orders`,
    label: 'Past Orders',
  },
  {
    to: '/notifications',
    label: 'Notifications',
  },
];

function ProfileButton() {
  const dispatch = useDispatch();
  const sellerId = useSelector((state: RootState) => state.seller.sellerId);
  const sellerAuth = useSelector((state: RootState) => state.seller.sellerAuth);
  const userExists = useSelector((state: RootState) => state.auth.value);

  // TODO: add different dropdown based on if user is logged in or not
  // TODO: get user and add its
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

  const handleLogout = async () => {
    await logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
    setTimeout(() => {
      dispatch(unauthenticated());
      dispatch(sellerUnauthenticated());
    }, 2000);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {isAuthenticated ? (
            <AvatarImage src={user && user.picture} />
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
            {userExists ? (
              <>
                <DropdownMenuLabel className="text-smm">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {routes.map((route) => (
                  <Link key={route.to} to={route.to}>
                    <DropdownMenuItem className="cursor-pointer w-48 text-smm font-medium">
                      {route.label}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </>
            ) : null}
            {/* TODO: add func to clear user form cache and redirect to '/' */}
            {sellerAuth ? (
              <>
                <DropdownMenuItem key="/login" className="cursor-pointer w-48 text-smm font-medium">
                  <Link to={`/sellers/${sellerId}/stores`}>Dashboard</Link>
                </DropdownMenuItem>
                {!userExists && (
                  <DropdownMenuItem
                    key="/login"
                    className="cursor-pointer w-48 text-smm font-medium"
                  >
                    <Link to="/user/register">Become a user</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
              </>
            ) : (
              <>
                <DropdownMenuItem key="/login" className="cursor-pointer w-48 text-smm font-medium">
                  <Link to="/seller/register">Become a seller</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}

            <Button
              className="bg-accent cursor-pointer text-red-700 font-bold hover:bg-accentDark w-48"
              onClick={handleLogout}
              onKeyDown={handleLogout}
            >
              {isAuthenticated ? 'Log Out' : 'Please wait'}
            </Button>
          </>
        ) : (
          <Button
            className="bg-accent cursor-pointer text-red-700 font-bold hover:bg-accentDark w-48"
            onClick={() => loginWithRedirect()}
          >
            Log in
          </Button>
        )}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileButton;
