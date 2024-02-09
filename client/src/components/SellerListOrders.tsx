import Orders from './Orders';

function SellerOrderList() {
  return (
    <div className="bg-background w-full :gap-5 px-3 lg:pr-10 lg:flex-row text-primary">
      <div className="flex flex-col gap-2 w-full p-4 text-sm border-secondary top-12">
        <h2 className="mt-3 mb-4 text-xl font-bold font-heading justify-center mx-auto">
          Store orders list
        </h2>

        <main className="sm:w-4/5 mx-auto justify-center min-h-screen py-1">
            <Orders />
      </main>
    </div>
    </div>
    )
};

export default SellerOrderList;