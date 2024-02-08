function Orders() {
  return (
    <div className="lg:pt-10 pt-2 sm:mx-12 mx-6">
      <div className="mx-auto max-w-8xl justify-center lg:mx-10 mx-6 xl:flex xl:space-x-6 xl:px-0">
        <div className="rounded-lg xl:w-full">
          <div className="justify-between mb-6 rounded-lg bg-background p-6 shadow-md sm:flex sm:justify-start">
            <img
              src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="product"
              className="w-full rounded-lg sm:w-40"
            />
            <div className="flex flex-col w-full sm:ml-4">
              <div className="sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-primary text-subheading">
                    Nike Air Max 2019
                  </h2>
                  <p className="font-semibold md:text-base text-smm text-secondary text-subheading">
                    Store Name
                  </p>
                </div>
                <div className="flex flex-col space-between">
                  <p className="flex sm:text-xl text-lg font-bold  justify-end text-accent">
                    Delivered
                  </p>
                  <p className="flex md:text-lg text-smm justify-end font-bold">&#8377; 259.000</p>
                </div>
              </div>

              <div className="h-full flex sm:mb-0 mb-2 justify-end">
                <p className="flex md:text-base text-smm text-secondary justify-end">
                  Order Id: #123456789
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
