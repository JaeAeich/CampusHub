import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Cat } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

// TODO: ADD ID AFTER AUTH
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
  // TODO: add different dropdown based on if user is logged in or not
  // TODO: get user and add its
  const handleLogOut = () => {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>
            <Cat />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* TODO: replace My Account with User.name */}
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {routes.map((route) => (
          <DropdownMenuItem key={route.to} className="cursor-pointer">
            <Link to={route.to}>{route.label}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        {/* TODO: add func to clear use form cash and redirect to '/' */}
        <DropdownMenuItem className="cursor-pointer">
          <Link to="/" onClick={handleLogOut}>
            Log Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileButton;
