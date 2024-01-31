function NotFound({ item }: { item: string }) {
  return (
    <div className="flex flex-col items-center justify-center m-10 mb-20">
      {/* <Frown className="mx-auto" color='#D3D3D3' strokeWidth={1.5} size={150}/> */}
      <img src="./noresult.gif" alt="noResults" className="sm:h-[180px] h-[90px]" />
      <h2 className="align-center text-darkgray font-normal sm:text-lg text-base">
        No {item} found. Come back later!
      </h2>
    </div>
  );
}

export default NotFound;
