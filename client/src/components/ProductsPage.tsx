import { useParams, Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import Product from '@/api/products/types';
import { getProductsByStoreId } from '@/api/stores/stores';
// import { products } from '../../app/constants';
import getProductsByQuery from '@/api/products/products';
import ProductCard from './ProductCard';
import NotFound from './NotFound';
import Loading from './Loading';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

function ProductsPage() {
  const { store_id } = useParams();
  const { isAuthenticated } = useAuth0();
  const { search_query } = useParams();
  const [store_products, setProducts] = useState<Product[]>([]);
  const [errorProducts, setErrorProducts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sliderValue, setSliderValue] = useState([500]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [current_page_number, setCurrentPageNumber] = useState(1);
  const [total_pages, setTotalPages] = useState(10);
  const page_size = 10;

  useEffect(() => {
    async function fetchProductsByStoreId() {
      if (store_id !== undefined) {
        const response = await getProductsByStoreId(store_id, page_size, current_page_number);
        if ('error' in response) {
          setErrorProducts(true);
          setIsLoading(false);
        } else if ('products' in response && 'total_pages' in response) {
          setProducts(response.products);
          setTotalPages(response.total_pages as number);
          setIsLoading(false);
        }
      } else if (search_query !== '') {
        const query = search_query;
        const response = await getProductsByQuery(query || '');
        if ('error' in response) {
          setErrorProducts(true);
          setIsLoading(false);
        } else if ('products' in response && 'total_pages' in response) {
          setProducts(response.products);
          setTotalPages(response.total_pages as number);
          setIsLoading(false);
        }
      }
    }
    fetchProductsByStoreId();
  }, [search_query, store_id, current_page_number]);

  if (isLoading) {
    return <Loading />;
  }

  if (store_products.length === 0 || errorProducts) {
    return (
      <div className="mx-auto items-center my-auto">
        <NotFound item="Products" />
      </div>
    );
  }

  const clearFilter = () => {
    setSliderValue([50]);
    setSelectedRating(0);
  };

  const handleSliderChange = (value: number[]) => {
    setSliderValue([value[0]]);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
  };

  return (
    <div className="flex lg:flex-row flex-col w-full">
      <div className="lg:block hidden flex w-full lg:flex-col lg:w-96 bg-secondaryLight p-4">
        <form
        // onSubmit={handleSubmit}
        >
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-heading font-bold text-xll">Filters</h1>
            <p
              className="font-subheading hover:underline hover:cursor-pointer"
              onMouseOver={clearFilter}
              onFocus={clearFilter}
            >
              Clear Filters
            </p>
          </div>
          <div className="flex">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="hover:no-underline font-subheading font-semibold text-lg">
                  Category
                </AccordionTrigger>
                <AccordionContent>
                  <div className="items-top flex flex-col">
                    <div className="flex flex-row mb-2 items-center font-subheading text-base">
                      <Checkbox
                        id="option1"
                        className="m-1"
                        // onClick= {handleCategoryChange}
                      />

                      <label htmlFor="option1">Category 1</label>
                    </div>
                    <div className="flex flex-row mb-2 items-center font-subheading text-base">
                      <Checkbox
                        id="option2"
                        className="m-1"
                        // onClick={handleCategoryChange}
                      />

                      <label htmlFor="option2">Category 2</label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="hover:no-underline font-subheading font-semibold text-lg">
                  Price
                </AccordionTrigger>
                <AccordionContent className="m-1">
                  {/* //TODO: Get price range from APIs */}
                  <div className="flex flex-col font-subheading font-semibold text-base items-center">
                    <div className="flex gap-2 w-full">
                      <p>0</p>
                      <Slider
                        defaultValue={[500]}
                        max={1000}
                        step={1}
                        onValueChange={handleSliderChange}
                      />
                      <p>1000</p>
                    </div>
                    <div className="flex justify-center">
                      <p>Price: {sliderValue[0]}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="hover:no-underline font-subheading font-semibold text-lg">
                  Rating
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <Star
                        fill={`
                                  ${index <= selectedRating ? '#e89ba1' : 'gray'} 
                                `}
                        strokeWidth={0}
                        key={index}
                        type="button"
                        className="w-6 h-6 inline-flex justify-center items-center hover:text-accent"
                        onMouseEnter={() => handleRatingChange(index)}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="hover:no-underline font-subheading font-semibold text-lg">
                  Offers
                </AccordionTrigger>
                <AccordionContent>
                  <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="default"
                        id="option3"
                        // onClick={handleOfferAvailableChange}
                      />
                      <Label htmlFor="option3">Offers-only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="comfortable"
                        id="option4"
                        // onClick={handleOfferAvailableChange}
                      />
                      <Label htmlFor="option4">Show all</Label>
                    </div>
                  </RadioGroup>
                  {/* </div> */}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* <Button>Apply Filters</Button> */}
        </form>
      </div>
      <div className="lg:hidden flex w-full">
        <div className="flex flex-row justify-between w-full px-6 py-3">
          <div className="flex">
            <Dialog>
              <DialogTrigger>
                <Button variant="default" className="px-6 font-normal text-smm">
                  Filters
                </Button>
              </DialogTrigger>
              <DialogContent className="lg:hidden sm:flex hidden">
                <div className="mx-auto w-4/5">
                  <form
                  // onSubmit={handleSubmit}
                  >
                    <div className="flex flex-row justify-between items-center">
                      <h1 className="font-heading font-bold text-xll">Filters</h1>

                      <p
                        className="font-subheading hover:underline hover:cursor-pointer"
                        onMouseOver={clearFilter}
                        onFocus={clearFilter}
                      >
                        Clear Filters
                      </p>
                    </div>
                    <div className="flex">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="hover:no-underline font-subheading font-semibold text-lg">
                            Category
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="items-top flex flex-col">
                              <div className="flex flex-row mb-2 items-center font-subheading text-base">
                                <Checkbox
                                  id="option1"
                                  className="m-1"
                                  // onClick={handleCategoryChange}
                                />

                                <label htmlFor="option1">Category 1</label>
                              </div>
                              <div className="flex flex-row mb-2 items-center font-subheading text-base">
                                <Checkbox
                                  id="option2"
                                  className="m-1"
                                  // onClick={handleCategoryChange}
                                />

                                <label htmlFor="option2">Category 2</label>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger className="hover:no-underline font-subheading font-semibold text-lg">
                            Price
                          </AccordionTrigger>
                          <AccordionContent className="m-1">
                            {/* //TODO: Get price range from APIs */}
                            <div className="flex flex-col font-subheading font-semibold text-base items-center">
                              <div className="flex gap-2 w-full">
                                <p>0</p>
                                <Slider
                                  defaultValue={[500]}
                                  max={1000}
                                  step={1}
                                  onValueChange={handleSliderChange}
                                />
                                <p>1000</p>
                              </div>
                              <div className="flex justify-center">
                                <p>Price: {sliderValue[0]}</p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger className="hover:no-underline font-subheading font-semibold text-lg">
                            Rating
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((index) => (
                                <Star
                                  fill={`
                                    ${index <= selectedRating ? '#e89ba1' : 'gray'}
                                  `}
                                  strokeWidth={0}
                                  key={index}
                                  type="button"
                                  className="w-6 h-6 inline-flex justify-center items-center hover:text-accent"
                                  onMouseEnter={() => handleRatingChange(index)}
                                />
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                          <AccordionTrigger className="hover:no-underline font-subheading font-semibold text-lg">
                            Offers
                          </AccordionTrigger>
                          <AccordionContent>
                            <RadioGroup defaultValue="comfortable">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="default" id="option3" />
                                <Label htmlFor="option3">Offers-only</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="comfortable" id="option4" />
                                <Label htmlFor="option4">Show all</Label>
                              </div>
                            </RadioGroup>
                            {/* </div> */}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    <div className="flex justify-center mt-6">
                      <Button
                        className="bg-accentLight hover:bg-accent"
                        // onClick={handleSubmit}
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="lg:hidden flex">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Price</SelectItem>
                <SelectItem value="dark">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full w-full p-3 my-auto justify-center lg:justify-start">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {store_products.map((prod: Product) => (
            // TODO: Fetch wishlist status.
            <ProductCard product={prod} wishlisted={false} />
          ))}
        </div>
        <div className="mx-auto mt-20">
          {store_id === 'store3' && isAuthenticated && (
            <Link to="/stores/store3/createproduct">
              <Button className="text-sm font-bold ml-3 bg-secondary hover:bg-accent text-primary">
                Add a Product
              </Button>
            </Link>
          )}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={current_page_number === 1 ? 'pointer-events-none opacity-50' : ''}
                onClick={() => {
                  setCurrentPageNumber(current_page_number - 1);
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="pointer-events-none">{current_page_number}</PaginationLink>
            </PaginationItem>
            {/* <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}
            <PaginationItem>
              <PaginationNext
                className={
                  current_page_number === total_pages ? 'pointer-events-none opacity-50' : ''
                }
                onClick={() => {
                  setCurrentPageNumber(current_page_number + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default ProductsPage;
