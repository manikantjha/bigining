import { ToastContainer, ToastContainerProps } from "react-toastify";

export default function Toast(props: ToastContainerProps) {
  return <ToastContainer autoClose={3000} position="bottom-right" {...props} />;
}
