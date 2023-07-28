export interface ITitle {
  title: string;
  description?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  titleContainerClassName?: string;
}

export default function Title({
  title,
  description = "",
  titleClassName = "",
  descriptionClassName = "",
  titleContainerClassName = "",
}: ITitle) {
  return (
    <div className={`text-center mb-16 ${titleContainerClassName}`}>
      <h2
        className={`text-3xl md:text-4xl mb-4 font-display uppercase ${titleClassName}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-lg ${descriptionClassName}`}>{description}</p>
      )}
    </div>
  );
}
