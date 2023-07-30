export interface IImageDisplayProps {
  imgSrc: string;
  imgAlt: string;
  imgClassName?: string;
  imgContainerClassName?: string;
}

export default function ImageDisplay({
  imgSrc,
  imgAlt,
  imgClassName = "",
  imgContainerClassName = "",
}: IImageDisplayProps) {
  return (
    <div className={`h-full w-full overflow-hidden ${imgContainerClassName}`}>
      <img
        src={imgSrc}
        alt={imgAlt}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
