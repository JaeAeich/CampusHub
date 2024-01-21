import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Container } from 'lucide-react';
import TrendingStores from './TrendingStores';
import DealOfTheDay from './DealOfTheDay';
import ServiceCards from './ServiceCards';

export default function Landing() {
  return (
    <div>
      <TrendingStores/>
      <DealOfTheDay/>
      <ServiceCards/>
    </div>
  );
}
