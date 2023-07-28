interface IImageDisplayProps {
  imgSrc: string;
  imgAlt: string;
  imgClassName?: string;
}

export default function ImageDisplay({
  imgSrc,
  imgAlt,
  imgClassName = "",
}: IImageDisplayProps) {
  return (
    <div className="!h-full !w-full relative">
      <img
        src={imgSrc}
        alt={imgAlt}
        className={`!object-cover !h-full !w-full ${imgClassName}`}
      />
    </div>
  );
}
