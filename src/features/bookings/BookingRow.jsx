import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useCheckout from "./useCheckout";
import useDelete from "./useDelete";
import toast from "react-hot-toast";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guest: { fullName: guestName, email },
    Cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();

  const { checkedOut } = useCheckout();
  const { deleteHandler } = useDelete();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus>
          <Menus.Menu>
            <Menus.Toggle />
            <Menus.List>
              <Menus.Button
                onClick={() => navigate(`/bookings/${bookingId}`)}
                icon={<HiEye />}
              >
                See More
              </Menus.Button>
              {status === "unconfirmed" && (
                <Menus.Button
                  onClick={() => navigate(`/checkBooking/${bookingId}`)}
                  icon={<HiArrowDownOnSquare />}
                >
                  Check In
                </Menus.Button>
              )}

              {status === "checked-in" && (
                <Menus.Button
                  onClick={() => checkedOut(bookingId)}
                  icon={<HiArrowUpOnSquare />}
                >
                  Check out
                </Menus.Button>
              )}

              <Menus.Button icon={<HiTrash />}>
                <Modal.Open opens="delete">
                  <div>Delete</div>
                </Modal.Open>
              </Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </Menus>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() => {
              deleteHandler(bookingId, {
                onSettled: () =>
                  toast.success(`booking ${bookingId} deleted successfully`),
              });
            }}
            disabled={false}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
