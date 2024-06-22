import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useGetBooking from "./useGetBooking";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import useCheckout from "./useCheckout";
import useDelete from "./useDelete";
import toast from "react-hot-toast";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { checkedOut, isCheckingOut } = useCheckout();
  const { deleteHandler, isDeleting } = useDelete();
  const { booking, isLoading } = useGetBooking();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[booking?.status]}>
            {booking?.status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup style={{ marginTop: "15px" }}>
        <Button
          disabled={isCheckingOut}
          variation="danger"
          onClick={() => {
            deleteHandler(id, {
              onSettled: () => {
                toast.success(`booking ${id} deleted successfully`);
                navigate("/bookings");
              },
            });
          }}
        >
          Delete #{id}
        </Button>
        {booking?.status === "unconfirmed" && (
          <Button
            variation="primary"
            onClick={() => navigate(`/checkBooking/${id}`)}
          >
            Checked In #{id}
          </Button>
        )}
        {booking?.status === "checked-in" && (
          <Button
            disabled={isCheckingOut}
            variation="primary"
            onClick={() => {
              checkedOut(id);
              navigate("/bookings");
            }}
          >
            Checked Out #{id}
          </Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
