import TrendingStores from './TrendingStores';
import DealOfTheDay from './DealOfTheDay';
import ServiceCards from './ServiceCards';

export default function Landing() {
  return (
    <div className="mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
      <TrendingStores />
      <DealOfTheDay />
      <ServiceCards />
    </div>
  );
}
