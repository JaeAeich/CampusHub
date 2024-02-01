function NotFound({ item }: { item: string }) {
  return (
    <div className="flex flex-col items-center justify-center m-10 mb-20">
      <img src="/noresult.gif" alt="noResults" className="h-16 w-42 md:h-48 md:w-92" />
      <h2 className="align-center text-darkgray text-smm md:text-lg">
        {item} not found. Come back later!
      </h2>
    </div>
  );
}

export default NotFound;
