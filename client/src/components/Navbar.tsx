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
    console.log(searchValue);
  };
  return (
    <header className="sm:flex sm:justify-between py-3 px-4 border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 sm:hidden w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] gap-2">
                <div className="flex w-full items-center space-x-2 mb-2">
                  <Input
                    type="text"
                    placeholder="Search stores"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={handleSearch}>
                    <Search />
                  </Button>
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
                <AvatarImage src="../../public/logo.png" alt="campushub" />
              </Avatar>
              <h1 className="text-2xl font-bold sm:block hidden">CampusHub</h1>
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
              <Button type="button" variant="ghost" size="icon" onClick={handleSearch}>
                <Search />
              </Button>
            </div>
          </nav>
          <div className="mx-4 flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" aria-label="Shopping Cart">
              <ShoppingCart className="h-6 w-6" />
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
