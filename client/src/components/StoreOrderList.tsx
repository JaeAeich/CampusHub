import Orders from './Orders';

function StoreOrderList() {
  return (
    <div className="bg-background pt-6 w-full px-3 lg:pr-10 lg:flex-row text-primary">
      <div className="flex flex-col w-full text-sm border-secondary">
        <h2 className="mt-3 text-xl font-bold font-heading justify-center mx-auto">
          Store orders list
        </h2>

        <main className="sm:w-4/5 mx-auto justify-center min-h-screen py-1">
            <Orders />
      </main>
    </div>
    </div>
    )
};

export default StoreOrderList;