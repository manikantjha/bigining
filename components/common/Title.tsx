interface ITitle {
  title: string;
  description?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  containerClassName?: string;
}

export default function Title(props: ITitle) {
  return (
    <div className={`text-center mb-16 ${props.containerClassName || ""}`}>
      <h2
        className={`text-3xl md:text-4xl mb-4 font-display uppercase ${
          props?.titleClassName || ""
        }`}
      >
        {props.title}
      </h2>
      {props.description && (
        <p className={`text-lg ${props?.descriptionClassName || ""}`}>
          {props.description}
        </p>
      )}
    </div>
  );
}
