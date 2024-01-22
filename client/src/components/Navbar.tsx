import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Menu, ShoppingCart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Container from '@/components/ui/container';
import { Separator } from '@/components/ui/separator';
import ProfileButton from './ProfileButton';

const routes = [
  {
    to: '/',
    label: 'Products',
  },
  {
    to: '/',
    label: 'Categories',
  },
  {
    to: '/',
    label: 'On Sale',
  },
];

function Navbar() {
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = () => {
    // TODO: add search functionality
  };
  return (
    <header className="sm:flex bg-black  sm:justify-between py-3 sm:px-4 px-1 border-b">
      <Container>
        <div className="relative px-1 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu color="#fff" className="h-6 sm:hidden w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] gap-2">
                <div className="flex w-full items-center space-x-2 mb-2">
                  <Input
                    type="text"
                    placeholder="Search stores"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <Search onClick={handleSearch} color="#000" />
                </div>
                <Separator />
                <nav className="flex flex-col gap-4 mt-2">
                  {routes.map((route) => (
                    <Link key={route.label} to={route.to} className="block px-2 py-1 text-lg">
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link to="/" className="flex ml-4 lg:ml-0 justify-center items-center gap-2">
              <Avatar>
                <AvatarImage src="./logo.png" alt="campushub" />
              </Avatar>
              <h1 className="sm:block hidden font-heading font-extrabold sm:block xl:text-2xl md:text-xl sm:text-xl text-background">
                CampusHub
              </h1>
            </Link>
          </div>
          <nav className="ml-4 flex w-full justify-center items-center space-x-4 lg:space-x-6 sm:block hidden">
            <div className="mx-2 flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Search stores"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button type="button" size="icon" onClick={handleSearch}>
                <Search color="#fff" />
              </Button>
            </div>
          </nav>
          <div className="mx-4 flex items-center">
            <Button size="icon" className="mr-2">
              <ShoppingCart color="#fff" className="h-6 w-6" />
              <span className="sr-only">Shopping Cart</span>
            </Button>
            <ProfileButton />
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Navbar;
