import React from "react";

interface IFormSectionTitle {
  title: string;
}

export default function FormSectionTitle(props: IFormSectionTitle) {
  return <h2 className="text-2xl font-bold mb-6">{props.title}</h2>;
}
