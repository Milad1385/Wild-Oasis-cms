import styled from "styled-components";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import CabinRow from "./../../ui/CabinRow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const FormRow = styled.div`
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

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinInfo = {}, onModalClose }) {
  const { id, ...valuesOfCabin } = cabinInfo;
  const isEditting = Boolean(id);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditting ? valuesOfCabin : {},
  });
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
      onModalClose();
    },

    onError: (err) => toast.error(err.message),
  });

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("cabin updated successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
      onModalClose();
    },

    onError: (err) => toast.error(err.message),
  });

  const createCabinHandler = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditting) {
      updateCabin({ newCabinData: { ...data, image }, id });
    } else {
      createCabin({ ...data, image });
    }
  };

  const isWorking = isCreating || isUpdating;

  return (
    <Form
      onSubmit={handleSubmit(createCabinHandler)}
      type={onModalClose ? "modal" : "regular"}
    >
      <CabinRow
        register={register}
        errors={errors}
        label={"Cabin name"}
        name={"name"}
        type={"text"}
        isLoading={isWorking}
      />

      <CabinRow
        register={register}
        errors={errors}
        label={"Maximum capacity"}
        name={"maxCapacity"}
        type={"number"}
        isLoading={isWorking}
      />

      <CabinRow
        register={register}
        errors={errors}
        label={"Regular price"}
        name={"price"}
        type={"number"}
        isLoading={isWorking}
      />

      <CabinRow
        register={register}
        errors={errors}
        label={"Discount"}
        name={"discount"}
        type={"number"}
        isLoading={isWorking}
      />

      <CabinRow
        register={register}
        errors={errors}
        isTextArea={true}
        label={"Description for website"}
        name={"desc"}
        type={"text"}
        isLoading={isWorking}
      />

      <CabinRow
        register={register}
        errors={errors}
        isImage={true}
        label={"Cabin photo"}
        name={"image"}
        type={"file"}
        isLoading={isWorking}
        isEdittng={isEditting}
      />

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onModalClose?.()}
        >
          Cancel
        </Button>
        <Button>{isEditting ? "edit cabin" : "add cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
