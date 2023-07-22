export default function NoData() {
  return (
    <div className="h-[calc(100vh_-_80px)] flex justify-center items-center bg-bgLight">
      <div className="!max-w-xl h-fit grid grid-rows-[1fr_auto] place-items-center gap-12">
        <img
          src="./assets/not_found.svg"
          alt=""
          className="h-[350px] md:h-[400px]"
        />
        <p className="text-2xl ">No Data to Show :(</p>
      </div>
    </div>
  );
}
