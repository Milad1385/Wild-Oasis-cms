import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import useGetBooking from "../bookings/useGetBooking";
import useSetting from "../settings/useSetting";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useState } from "react";
import { useEffect } from "react";
import { formatCurrency } from "../../utils/helpers";
import useUpdate from "../bookings/useUpdate";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  margin: 25px 0;
`;

function CheckinBooking() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isAddBreakFast, setIsAddBreakFast] = useState(false);

  const { booking, isLoading } = useGetBooking();
  const { setting, settingLoading } = useSetting();
  const { updateHandler, isUpdating } = useUpdate();
  const { id } = useParams();
  const moveBack = useMoveBack();

  const breakfastPrice =
    setting?.breakFastPrice * booking?.numGuests * booking?.numNights;

  useEffect(() => {
    if (booking?.isPaid) {
      setIsConfirmed(true);
    }

    if (booking?.hasBreakFast) {
      setIsAddBreakFast(true);
    }
  }, [booking]);

  function handleCheckin() {
    if (!isConfirmed) return true;

    if (isAddBreakFast) {
      updateHandler({
        id,
        breakfast: {
          hasBreakFast: true,
          totalPrice: booking?.totalPrice + breakfastPrice,
          extrasPrice: breakfastPrice,
        },
      });
    } else {
      updateHandler({ id, breakfast: {} });
    }
  }

  if (isLoading || settingLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={isAddBreakFast}
          onChange={() => {
            setIsAddBreakFast(true);
            setIsConfirmed(false);
          }}
          disabled={isAddBreakFast || isUpdating}
          id="addBreakFast"
        >
          Does {booking.guestId.fullName} has breakfast service (price ={" "}
          {formatCurrency(breakfastPrice)} ) ?
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          checked={isConfirmed}
          onChange={() => setIsConfirmed(true)}
          disabled={isConfirmed || isUpdating}
          id="confirmed"
        >
          Are You sure that {booking.guestId.fullName} has paid cabin price{" "}
          {!isAddBreakFast
            ? formatCurrency(booking?.totalPrice)
            : `${formatCurrency(
                booking?.totalPrice + breakfastPrice
              )} => (${formatCurrency(booking?.totalPrice)} + ${formatCurrency(
                breakfastPrice
              )}) `}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!isConfirmed || isUpdating}>
          Check in booking #{id}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
