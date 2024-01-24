import Store from '@/api/stores/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';

function StoreCard(props: { store: Store }) {
  return (
    <Card className="w-72 h-96 overflow-hidden bg-white border rounded-md shadow-md transition-transform transform hover:scale-105">
      <CardHeader className="flex flex-col justify-between h-1/4 p-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">{props.store.store_name}</CardTitle>
          {props.store.offer_available && (
            <Badge variant="destructive" className="w-14 h-4">
              Sale
            </Badge>
          )}
        </div>
        <CardDescription className="mt-2 text-sm">{props.store.store_description}</CardDescription>
      </CardHeader>
      <CardContent className="h-1/2 p-4">
        <Carousel className="w-full h-full">
          <CarouselContent className="flex">
            {props.store.store_images.map((image, index) => (
              <CarouselItem key={index} className="w-full">
                <div className="p-1">
                  <Card className="w-full h-full">
                    <CardContent className="aspect-w-4 aspect-h-3">
                      <img src={image} alt="" className="object-cover w-full h-full" />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </CardContent>
      <CardFooter className="flex justify-center h-1/4 p-4">
        <div className="mt-4 text-smm hover:block">
          <p>
            <strong>Address:</strong> <code>{props.store.store_address}</code>
          </p>
          <p>
            <strong>Phone Number:</strong> <code>{props.store.store_phone_number}</code>
          </p>
          <p>
            <strong>Timings:</strong>{' '}
            <code>
              {props.store.timings[0]}:00 - {props.store.timings[1]}:00
            </code>
          </p>
        </div>
        <Button className="w-full bg-accent">Visit</Button>
      </CardFooter>
    </Card>
  );
}

export default StoreCard;
