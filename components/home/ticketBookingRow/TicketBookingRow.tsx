import RowWrapper from "@/components/common/RowWrapper";
import { IRowTheme } from "@/types/row";
import TicketBookingForm from "./TicketBookingForm";

interface ITicketBookingRowProps extends IRowTheme {}

function TicketBookingRow(props: ITicketBookingRowProps) {
  return (
    <RowWrapper title="Book Your Navratri Garba Passes" theme={props.theme}>
      <TicketBookingForm />
    </RowWrapper>
  );
}

export default TicketBookingRow;
