export default function BlankInput() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <div className="grid grid-rows-[auto_auto_auto] gap-1 place-items-center">
        <svg
          aria-hidden="true"
          className="w-10 h-10 mb-3 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <p className="mb-2 text-base text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to Upload</span> or Drag and
          Drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          SVG, PNG, JPG or GIF (MAX. 800x400px)
        </p>
      </div>
    </div>
  );
}
