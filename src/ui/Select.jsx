import styled from "styled-components";
import React from "react";
import { useSearchParams } from "react-router-dom";
const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get("sortBy");

  const handleChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <StyledSelect value={value} type="white" onChange={handleChange}>
      {options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </StyledSelect>
  );
}

export default Select;
