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
  const handleLogOut = () => {
    console.log("You've been logged out!");
  };

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
