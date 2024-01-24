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
import { Slider } from '@/components/ui/slider';
import StoreCard from './StoreCard';
import { stores } from '../../app/constants';
import Store from '@/api/stores/types';

function StorePage() {
  return (
    <div className="flex lg:flex-row flex-col w-full">
      <div className="lg:block hidden flex w-full lg:flex-col lg:w-96 bg-secondaryLight p-4">
        {/* TODO: implement onSubmit={handleSubmit} */}
        <form onSubmit={() => {}}>
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-heading font-bold text-xll">Filters</h1>
            {/* TODO: implemment clearFilter */}
            <p className="font-subheading hover:underline hover:cursor-pointer">Clear Filters</p>
          </div>
          <div className="flex">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="hover:no-underline font-subheading font-semibold text-lg">
                  Category
                </AccordionTrigger>
                <AccordionContent>
                  {/* TODO: implement changeCategory */}
                  <div className="items-top flex flex-col">
                    <div className="flex flex-row mb-2 items-center font-subheading text-base">
                      <Checkbox id="option1" className="m-1" onClick={() => {}} />
                      <label htmlFor="option1">Category 1</label>
                    </div>
                    <div className="flex flex-row mb-2 items-center font-subheading text-base">
                      <Checkbox id="option2" className="m-1" onClick={() => {}} />
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
                  {/* TODO: Get price range from APIs */}
                  <div className="flex flex-col font-subheading font-semibold text-base items-center">
                    <div className="flex gap-2 w-full">
                      <p>0</p>
                      <Slider defaultValue={[500]} max={1000} step={1} onValueChange={() => {}} />
                      <p>1000</p>
                    </div>
                    {/* TODO: get slider value from state which change on above onValueChange */}
                    <div className="flex justify-center">
                      <p>Price: {}</p>
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
                    {/* TODO: implement rating change to trigger API call for stores */}
                    {/* TODO: add below line to change color, and be compliant to @aishikanandi's 
                    productsPage implementation:
                    fill={`${index <= selectedRating ? '#e89ba1' : 'gray'} `} */}
                    {[1, 2, 3, 4, 5].map((index) => (
                      <Star
                        strokeWidth={0}
                        key={index}
                        type="button"
                        className="w-6 h-6 inline-flex justify-center items-center hover:text-accent"
                        onMouseEnter={() => {}}
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
                  {/* TODO: implement filter store based on offer avail */}
                  <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="default" id="option3" onClick={() => {}} />
                      <Label htmlFor="option3">Offers-only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="comfortable" id="option4" onClick={() => {}} />
                      <Label htmlFor="option4">Show all</Label>
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <Button>Apply Filters</Button>
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
                  <form onSubmit={() => {}}>
                    <div className="flex flex-row justify-between items-center">
                      <h1 className="font-heading font-bold text-xll">Filters</h1>
                      {/* TODO: implement filter change as above */}
                      <p
                        className="font-subheading hover:underline hover:cursor-pointer"
                        onMouseOver={() => {}}
                        onFocus={() => {}}
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
                            {/* TODO: implement change in category */}
                            <div className="items-top flex flex-col">
                              <div className="flex flex-row mb-2 items-center font-subheading text-base">
                                <Checkbox id="option1" className="m-1" onClick={() => {}} />
                                <label htmlFor="option1">Category 1</label>
                              </div>
                              <div className="flex flex-row mb-2 items-center font-subheading text-base">
                                <Checkbox id="option2" className="m-1" onClick={() => {}} />
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
                            {/* TODO: Get price range from APIs */}
                            {/* TODO: Get slider value and display below */}
                            <div className="flex flex-col font-subheading font-semibold text-base items-center">
                              <div className="flex gap-2 w-full">
                                <p>0</p>
                                <Slider
                                  defaultValue={[500]}
                                  max={1000}
                                  step={1}
                                  onValueChange={() => {}}
                                />
                                <p>1000</p>
                              </div>
                              <div className="flex justify-center">
                                <p>Price: </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger className="hover:no-underline font-subheading font-semibold text-lg">
                            Rating
                          </AccordionTrigger>
                          <AccordionContent>
                            {/* TODO: implement rating change */}
                            {/* TODO:
                              add fill={`${index <= selectedRating ? '#e89ba1' : 'gray'}`} */}
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((index) => (
                                <Star
                                  strokeWidth={0}
                                  key={index}
                                  type="button"
                                  className="w-6 h-6 inline-flex justify-center items-center hover:text-accent"
                                  onMouseEnter={() => {}}
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
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    <div className="flex justify-center mt-6">
                      {/* TODO: implement apply change */}
                      <Button className="bg-accentLight hover:bg-accent">Apply Filters</Button>
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
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 lg:justify-left justify-center">
        {stores.map((store: Store) => (
          <StoreCard key={store.store_id} store={store} />
        ))}
      </div>
    </div>
  );
}

export default StorePage;
