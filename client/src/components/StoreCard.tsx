import Store from '@/api/stores/types';
import { Card } from '@/components/ui/card';
import Stars from './Stars';

function StoreCard({ store }: { store: Store }) {
  const { store_name, store_address, store_description, store_images, timings } = store;
  return (
    <Card id="app" className="w-full mb-10 h-60 rounded shadow-md flex card">
      <div className="lg:w-72 w-48 h-full object-cover">
        <img
          className="w-full h-full rounded-l-sm object-cover"
          src={store_images[0]}
          alt={store_name}
        />
      </div>

      <div className="m-4 ml-7 w-full flex flex-col justify-between">
        <div className="flex flex-col">
          <h1 className="lg:text-2xl text-lgg font-heading font-bold overflow-hidden line-clamp-1">
            {store_name}
          </h1>
          <h1 className="text-md font-body font-semibold text-accent overflow-hidden line-clamp-1">
            {store_address}
          </h1>
          <p className="mt-5 mb-5 text-md font-body text-gray-600 overflow-hidden line-clamp-2">
            {store_description}
          </p>
        </div>
        <div className="flex xl:flex-row flex-col justify-between">
          {/* // TODO: Rating is hardcoded here. */}
          <div className="flex items-center">
            <Stars rating={4.8} />
            <span className="mr-2 md:ml-3 rounded bg-secondaryLight md:px-2.5 md:py-0.5 px-1.5 py-0.5 text-xs font-semibold">
              5.0
            </span>
          </div>
          <div className="flex items-center mt-2 md:mt-0">
            <span className="rounded text-xs font-medium md:flex md:items-center md:gap-2 mt-2">
              <div className="md:block hidden text-gray-600">Timings:</div>
              <div className="text-smm md:text-sm flex gap-2">
                <div>{timings[0]}:00hrs</div>-<div>{timings[1]}:00hrs</div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default StoreCard;
