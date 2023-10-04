export default function NoData() {
  return (
    <div className="h-auto flex justify-center items-center bg-bgLight">
      <div className="!max-w-xl h-fit grid grid-rows-[1fr_auto] place-items-center gap-12">
        <p className="text-2xl ">Opps! No Data to Show :(</p>
        <img
          src="/assets/not_found.svg"
          alt=""
          className="h-[350px] md:h-[400px]"
        />
      </div>
    </div>
  );
}
