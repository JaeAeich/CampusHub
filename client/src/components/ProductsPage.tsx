import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
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
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
// import Slider from 'react-input-slider';
import ProductCard from './ProductCard';

function ProductsPage() {
  const [sliderValue, setSliderValue] = useState([500]);
  // const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  // const [offerAvailable, setOfferAvailable] = useState('option-4');
  const clearFilter = () => {
    setSliderValue({ x: 50 });
    // setSelectedCategories([]);
    setSelectedRating(0);
    // setOfferAvailable('option-4');
  };
  const handleSliderChange = (value) => {
    setSliderValue([value[0]]);
  };

  // const handleCategoryChange = (event) => {
  //   setSelectedCategories((prevCategories) => {
  //     if (prevCategories.includes(event.target.id)) {
  //       return prevCategories.filter((c) => c !== event.target.id);
  //     }
  //     return [...prevCategories, event.target.id];
  //   });
  // };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
  };

  // const handleOfferAvailableChange = (event) => {
  //   setOfferAvailable(event.target.id);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // TODO: Handle submit
  // console.log('Selected Categories:', selectedCategories);
  // console.log('Selected Price:', sliderValue.x * 10);
  // console.log('Selected Rating:', selectedRating);
  // console.log('Offer Available:', offerAvailable);
  // };

  return (
    <div className="flex lg:flex-row flex-col w-full">
      <div className="lg:block hidden flex w-full lg:flex-col lg:w-96 min-h-screen bg-secondaryLight p-4">
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
                  {/* <div className="items-top flex flex-col">
      <div className="flex flex-row mb-2 items-center font-subheading text-base"> */}
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
                            {/* <div className="items-top flex flex-col">
      <div className="flex flex-row mb-2 items-center font-subheading text-base"> */}
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
      <div className="lg:block grid lg:justify-left justify-center">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}

export default ProductsPage;
