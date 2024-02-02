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
import { Link, useNavigate } from 'react-router-dom';

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

  const handleClick = (link: string) => {
    navigate(link);
    window.location.reload();
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
        <DropdownMenuLabel className="text-smm">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {routes.map((route) => (
          <DropdownMenuItem
            key={route.to}
            className="cursor-pointer py-2 px-2 text-smm font-medium"
          >
            <Link to={route.to} onClick={() => handleClick(route.to)}>
              {route.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-700 font-bold">
          <Link to="/" className="text-smm">
            Log Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileButton;
