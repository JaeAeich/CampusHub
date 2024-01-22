import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import Slider from 'react-input-slider';

function ProductsPage() {
  const [sliderValue, setSliderValue] = useState([500]);

  const handleSliderChange = (value) => {
    setSliderValue([value[0] * 10]);
  };
  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-1/5 min-h-screen bg-secondary p-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-heading font-bold text-xll">Filters</h1>
          {/* //TODO: Add functionality clear filters  */}
          <p className="font-subheading hover:underline">Clear Filters</p>
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
                    <Checkbox id="option1" className="m-1" />

                    <label htmlFor="option1">Category 1</label>
                  </div>
                  <div className="flex flex-row mb-2 items-center font-subheading text-base">
                    <Checkbox id="option2" className="m-1" />

                    <label htmlFor="option2">Category 2</label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:no-underline font-subheading font-semibold text-lg">
                Price
              </AccordionTrigger>
              <AccordionContent className="m-2">
                {/* //TODO: Get price range from APIs */}
                <div className="flex flex-row justify-between">
                  <p>0</p>
                  <Slider
                    value={sliderValue}
                    min={0}
                    max={1000}
                    onChange={handleSliderChange}
                    stylescolor="black"
                    className="m-2"
                  />
                  <p>Price: {sliderValue}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="hover:no-underline font-subheading font-semibold text-lg">
                Rating
              </AccordionTrigger>
              <AccordionContent>
                Yes. It is animated by default, but you can disable it if you prefer.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="hover:no-underline font-subheading font-semibold text-lg">
                Offer Available
              </AccordionTrigger>
              <AccordionContent>
                Yes. It is animated by default, but you can disable it if you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="flex w-4/5">hi</div>
    </div>
  );
}

export default ProductsPage;
