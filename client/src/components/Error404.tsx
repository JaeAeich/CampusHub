import { MapPin } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Container from './ui/container';

export default function Error404() {
  return (
    <div className="flex grow">
      <Container>
        <div className="h-full flex justify-center items-center">
          <Alert variant="destructive" className="w-1/2">
            <MapPin className="h-4 w-4" />
            <AlertTitle>Error 404!</AlertTitle>
            <AlertDescription>Are you lost, baby gurl?</AlertDescription>
          </Alert>
        </div>
      </Container>
    </div>
  );
}
