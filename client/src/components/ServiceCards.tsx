import { Card, CardContent } from "@/components/ui/card"
import Container from './ui/container';
import {services} from '../../app/constants'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
 
export default function ServiceCards() {
  return (
    <Container>
      <h1 className='font-Oswald text-2xl font-bold my-4'>Service in your campus</h1>
      <div className="mb-10">
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {services.map((service, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="m-1 relative group">
        <Card>
          <CardContent className="flex aspect-[3/2] items-center justify-center p-6">
            <img
              src={service['image']}
              alt={service['name']}
              className="blog-banner h-full transition-transform transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gray-600 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white font-helvetica text-2xl font-bold text-center">{service['name']}</p>
            </div>
          </CardContent>
        </Card>
      </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
    </Container>
  )
}