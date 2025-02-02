import styled from "styled-components";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";
import { Link } from "react-router-dom";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ booking }) {
  const isArriving = booking.status === "unconfirmed";
  const flag = booking.guests.countryFlag;
  const fullName = booking.guests.fullName;
  const numNights = booking.numNights;
  const bookingId = booking.id;
  return (
    <StyledTodayItem>
      {isArriving && <Tag type="green">Arriving</Tag>}
      {!isArriving && <Tag type="blue">departing</Tag>}
      <Flag src={flag} />
      <Guest>{fullName}</Guest>
      <div>{`${numNights} night${numNights === 1 ? "" : "s"}`}</div>
      {isArriving ? (
        <Button size="small" as={Link} to={`/checkin/${booking.id}`}>
          check-in
        </Button>
      ) : (
        <CheckoutButton bookingId={bookingId} />
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
