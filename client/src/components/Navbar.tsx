// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Menu, ShoppingCart, Search, Cat, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Container from '@/components/ui/container';
import { Separator } from '@/components/ui/separator';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RootState } from '@/store/store';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getUserById } from '@/api/users/users';
import {
  addProductToCartAsync,
  removeProductFromCartAsync,
  setCartDataAsync,
} from '@/store/cart/cartSlice';
import { useAppDispatch } from '@/utils/hooks';
import { getSellerById } from '@/api/sellers/sellers';
import Cart from '@/api/cart/types';
import Product from '@/api/products/types';
import { getProductByProductId } from '@/api/products/products';
import ProfileButton from './ProfileButton';
import { services } from '../../app/constants';
import {
  sellerUnauthenticated,
  sellerAuthenticated,
  setSellerId,
} from '../store/seller/sellerSlice';
import { unauthenticated, authenticated, setUserEmail } from '../store/auth/authSlice';
import NotFound from './NotFound';

// TODO: ADD ID AFTER AUTH
const user_id = '1';
const routes = [
  {
    to: '/',
    label: 'Services',
    content: services.map((service) => ({
      name: service.service_name,
    })),
  },
  {
    to: `/users/${user_id}/details`,
    label: 'My Account',
    content: null,
  },
  {
    to: `/users/${user_id}/wishlist`,
    label: 'Wishlist',
    content: null,
  },
  {
    to: `/users/${user_id}/orders`,
    label: 'Past Orders',
    content: null,
  },
  {
    to: '/',
    label: 'Notifications',
    content: null,
  },
];

function Navbar() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const userExists = useSelector((state: RootState) => state.auth.value);
  const sellerId = useSelector((state: RootState) => state.seller.sellerId);
  const sellerAuth = useSelector((state: RootState) => state.seller.sellerAuth);

  useEffect(() => {
    if (user && user.email && !sellerAuth && !userExists) {
      const userPromise = getUserById(user.email);
      const sellerPromise = getSellerById(user.email);
      Promise.all([userPromise, sellerPromise]).then((responses) => {
        const [userResponse, sellerResponse] = responses;

        if ('error' in userResponse && 'error' in sellerResponse) {
          navigate(`/createuser/${user.email}`);
        } else if ('user' in userResponse && 'seller' in sellerResponse) {
          appDispatch(setCartDataAsync(userResponse.user.user_id as string));
          dispatch(authenticated(userResponse.user.user_id));

          dispatch(setUserEmail(userResponse.user.user_email));
          dispatch(sellerAuthenticated());
          dispatch(setSellerId(sellerResponse.seller.seller_id));
        } else if ('user' in userResponse) {
          appDispatch(setCartDataAsync(userResponse.user.user_id as string));
          dispatch(authenticated(userResponse.user.user_id));
          dispatch(setUserEmail(userResponse.user.user_email));
          navigate('/');
        } else if ('seller' in sellerResponse) {
          dispatch(sellerAuthenticated());
          dispatch(setSellerId(sellerResponse.seller.seller_id));
        }
      });
    }
  }, [user, dispatch, navigate, sellerAuth, userExists, appDispatch]);

  const handleLogout = async () => {
    dispatch(unauthenticated());
    dispatch(sellerUnauthenticated());
    setIsLoggingOut(true);
    await logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
    setIsLoggingOut(false);
  };

  const handleSearch = () => {
    if (searchValue === '') {
      return;
    }
    navigate(`/products/${searchValue}`);
  };

  const handleEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // cart stuff
  const cart = useSelector((state: RootState) => state.cart) as Cart;
  const [product_details, setProductDetails] = useState<{ [key: string]: Product }>({});

  const handleIncrement = (p_id: string) => {
    appDispatch(addProductToCartAsync(p_id));
  };

  const handleDecrement = (p_id: string) => {
    appDispatch(removeProductFromCartAsync(p_id));
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      const promises = cart.carts.map(async (item) => {
        const response = await getProductByProductId(item.product_id);
        return { [item.product_id]: response };
      });

      const productDetailsArray = await Promise.all(promises);
      const details = productDetailsArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setProductDetails(details as { [key: string]: Product });
    };

    fetchProductDetails();
  }, [cart]);

  return (
    <header className="sm:flex bg-black  sm:justify-between py-3 border-b">
      <Container>
        <div className="relative flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu color="#fff" className="h-6 md:hidden w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] gap-2">
                <div className="flex flex-row items-center">
                  <Avatar>
                    {isAuthenticated ? (
                      <AvatarImage src={user && user.picture} />
                    ) : (
                      <AvatarFallback>
                        <Cat />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex flex-col justify-left m-1 ml-2">
                    {/* // TODO: Add name and address of user. */}
                    <p className="flex font-subheading font-bold">
                      {isAuthenticated && user ? `Hi ${user?.name}` : 'Hey there!'}
                    </p>
                    <p className="flex font-subheading">
                      {isAuthenticated && user
                        ? 'Delivering to your address'
                        : 'Welcome to Campus Hub'}
                    </p>
                  </div>
                </div>
                <Separator />
                <nav className="flex flex-col gap-4 mt-2">
                  <Accordion type="single" collapsible>
                    {isAuthenticated && (
                      <>
                        {routes.map((route, index) =>
                          route.content ? (
                            <AccordionItem value={`item-${index}`} key={route.label}>
                              <AccordionTrigger className="text-base font-subheading">
                                {route.label}
                              </AccordionTrigger>
                              {route.content ? (
                                <AccordionContent>
                                  {route.content.map((service) => (
                                    <div key={service.name}>{service.name}</div>
                                  ))}
                                </AccordionContent>
                              ) : (
                                <AccordionContent />
                              )}
                            </AccordionItem>
                          ) : (
                            <div key={route.label}>
                              <Link
                                className="flex text-base font-subheading py-5 hover:underline"
                                to={route.to}
                              >
                                {route.label}
                              </Link>
                              <Separator />
                            </div>
                          ),
                        )}
                      </>
                    )}
                    {isAuthenticated &&
                      (sellerAuth ? (
                        <Button className="w-full bg-accent">
                          <Link to={`/sellers/${sellerId}/stores`}>Dashboard</Link>
                        </Button>
                      ) : (
                        <Button className="w-full bg-accent">
                          <Link to={`/createseller/${user?.email}`}>Become a seller</Link>
                        </Button>
                      ))}
                    {isAuthenticated ? (
                      <Button variant="destructive" className="w-full" onClick={handleLogout}>
                        {isLoggingOut ? 'Please Wait' : 'Logout'}
                      </Button>
                    ) : (
                      <Button className="w-full bg-accent" onClick={() => loginWithRedirect()}>
                        Login
                      </Button>
                    )}
                  </Accordion>
                </nav>
              </SheetContent>
            </Sheet>
            <Link to="/" className="flex md:flex hidden ml-4 lg:ml-0 justify-center items-center">
              <Avatar>
                <AvatarImage className="md:block hidden" src="./logo.png" alt="campushub" />
              </Avatar>
              <h1 className="md:block hidden font-heading font-extrabold xl:text-2xl md:text-xl sm:text-xl text-background">
                CampusHub
              </h1>
            </Link>
          </div>
          <nav className="ml-4 flex w-full justify-center items-center space-x-4 lg:space-x-6">
            <div className="md:mx-2 flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Search stores"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleEnterSearch}
              />
              <Button type="button" size="icon" onClick={handleSearch}>
                <Search color="#fff" />
              </Button>
            </div>
          </nav>
          <div className=" flex items-center justify-left">
            <Drawer>
              <DrawerTrigger asChild>
                <Button size="icon" className="md:ml-1 md:mr-3">
                  <ShoppingCart color="#fff" />
                  <span className="sr-only">Shopping Cart</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto justify-center lg:w-4/6 sm:w-4/5 w-full sm:p-3 px-10">
                  {cart.carts.length !== 0 ? (
                    cart.carts.map((item) => (
                      <Table>
                        <TableHeader>
                          <TableRow className="font-subheading sm:text-lgg text-smm font-semibold items-center">
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="font-body sm:text-base text-smm">
                            <TableCell>
                              <img
                                className="object-cover"
                                src={
                                  product_details[item.product_id] &&
                                  product_details[item.product_id].product_images &&
                                  product_details[item.product_id].product_images[0]
                                }
                                alt={item.product_id}
                                width={100}
                                height={100}
                              />
                            </TableCell>
                            <TableCell>
                              {product_details[item.product_id] &&
                                product_details[item.product_id].product_name}
                            </TableCell>
                            <TableCell className="flex flex-row items-center mt-4">
                              <Minus
                                className="m-1"
                                onClick={() => handleDecrement(item.product_id)}
                              />
                              {item.quantity}
                              <Plus
                                className="m-1"
                                onClick={() => handleIncrement(item.product_id)}
                              />
                            </TableCell>
                            <TableCell className="font-bold font-heading sm:text-lgg text-base">
                              &#8377;{' '}
                              {product_details[item.product_id] &&
                                product_details[item.product_id].product_cost * item.quantity}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    ))
                  ) : (
                    <div className="my-auto item-center mx-auto text-center">
                      <NotFound item="Products" />
                    </div>
                  )}
                </div>
              </DrawerContent>
            </Drawer>

            <div className="sm:block hidden">
              <ProfileButton />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Navbar;
