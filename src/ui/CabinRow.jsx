import React from "react";
import styled from "styled-components";
import Input from "./Input";
import FileInput from "./FileInput";
import Textarea from "./Textarea";

export const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

export const Label = styled.label`
  font-weight: 500;
`;

export const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CabinRow({
  register,
  errors,
  label,
  name,
  type,
  isTextArea,
  isImage,
  isLoading,
  isEdittng
}) {
  if (isTextArea) {
    return (
      <FormRow>
        <Label htmlFor={name}>{label}</Label>
        <Textarea
          {...register(name, {
            required: `The ${name} is required !`,
          })}
          type={type}
          id={name}
          disabled={isLoading}
        ></Textarea>
        {errors[name] && <Error>{errors[name].message}</Error>}
      </FormRow>
    );
  } else if (isImage) {
    return (
      <FormRow>
        <Label htmlFor={name}>{label}</Label>
        <FileInput
          {...register(name, {
            required: isEdittng ? false : "The image is required !",
          })}
          type={type}
          id={name}
          disabled={isLoading}
          accept="image/*"
        />
        {errors[name] && <Error>{errors[name].message}</Error>}
      </FormRow>
    );
  } else {
    return (
      <FormRow>
        <Label htmlFor={name}>{label}</Label>
        <Input
          {...register(name, {
            required: `The ${name} is required !`,
          })}
          type={type}
          disabled={isLoading}
          id={name}
        />
        {errors[name] && <Error>{errors[name].message}</Error>}
      </FormRow>
    );
  }
}

export default CabinRow;
