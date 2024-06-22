import styled from "styled-components";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import CreateCabinForm from "./CreateCabinForm";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import {
  HiOutlinePencil,
  HiOutlineSquare2Stack,
  HiOutlineTrash,
} from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";


const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const queryClient = useQueryClient();
  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return (
    <>
      <Table.Row>
        <Img src={cabin.image} />
        <Cabin>{cabin.name}</Cabin>
        <div>Fits Up to {cabin.maxCapacity} guests</div>
        <Price>${cabin.price.toLocaleString("en")}</Price>
        <Discount>
          {cabin.discount ? `$${cabin.discount.toLocaleString("en")}` : "---"}
        </Discount>
        <Modal>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={cabin.id} />
              <Menus.List id={cabin.id}>
                <Modal.Open opens={"delete"}>
                  <Menus.Button icon={<HiOutlineTrash />}>Delete</Menus.Button>
                </Modal.Open>
                <Modal.Open opens={"update"}>
                  <Menus.Button icon={<HiOutlinePencil />}>Update</Menus.Button>
                </Modal.Open>
                <Menus.Button icon={<HiOutlineSquare2Stack />}>
                  Duplicate
                </Menus.Button>
              </Menus.List>
            </Menus.Menu>
          </Menus>
          <Modal.Window name={"delete"}>
            <ConfirmDelete
              disabled={isDeleting}
              resourceName={"Cabin"}
              onConfirm={() => deleteCabin(cabin.id)}
            />
          </Modal.Window>
          <Modal.Window name={"update"}>
            <CreateCabinForm cabinInfo={cabin} />
          </Modal.Window>
        </Modal>
      </Table.Row>
    </>
  );
}

export default CabinRow;
