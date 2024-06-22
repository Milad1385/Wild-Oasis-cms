import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Sppiner from "./../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import useCabins from "./useCabins";

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();
  const filterType = searchParams.get("discount") || "all";

  if (isLoading) return <Sppiner />;

  let filteredProduct = cabins;
  console.log(cabins);

  if (filterType === "all") filteredProduct = cabins;
  if (filterType === "no-discount")
    filteredProduct = cabins.filter((cabin) => cabin.discount === 0);

  if (filterType === "with-discount")
    filteredProduct = cabins.filter((cabin) => cabin.discount > 0);

  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, order] = sortBy.split("-");
  const orderType = order === "asc" ? 1 : -1;

  let sortedCabins = filteredProduct.sort(
    (a, b) => (a[field] - b[field]) * orderType
  );

  return (
    <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        items={sortedCabins}
        name={"cabin"}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      ></Table.Body>
    </Table>
  );
}

export default CabinTable;
