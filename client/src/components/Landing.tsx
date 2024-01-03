import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Landing() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>CampusHub</CardTitle>
        <CardDescription>A hub for all your needs!</CardDescription>
      </CardHeader>
      <CardContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis impedit natus quas,
        suscipit recusandae porro consectetur voluptatem omnis accusamus beatae est ab optio dolores
        labore. Quia excepturi ad illo illum accusantium ea recusandae corporis reiciendis magni,
        consectetur, quaerat a eveniet. Aperiam repellendus ea maxime labore, at animi nam suscipit
        fugit?
      </CardContent>
      <CardFooter className="flex justify-between">Date: 29 Dec 2023</CardFooter>
    </Card>
  );
}
