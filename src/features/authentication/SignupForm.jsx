import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import InputRow, { Error, Label } from "../../ui/CabinRow";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useRegister from "./useRegister";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { registerHandeler, isRegistering } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({});

  const userRegisterHandler = async (data) => {
    const { password, fullName, email } = data;
    registerHandeler(
      { password, fullName, email },
      {
        onSettled: () => reset(),
      }
    );
  };
  return (
    <Form onSubmit={handleSubmit(userRegisterHandler)}>
      <InputRow
        label={"Full name"}
        name="fullName"
        errors={errors}
        register={register}
        type="text"
        isLoading={isRegistering}
      />

      <InputRow
        label="Email address"
        name="email"
        errors={errors}
        register={register}
        type="email"
        isLoading={isRegistering}
      />

      <FormRow>
        <Label htmlFor={"password"}>password (min 8 length)</Label>
        <Input
          {...register("password", {
            required: `The password is required !`,
          })}
          type="password"
          id={"password"}
          disabled={isRegistering}
        />
        {errors.password && <Error>{errors.password.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor={"repeatPassword"}>password (min 8 length)</Label>
        <Input
          {...register("repeatPassword", {
            required: `The password is required !`,
            validate: (value) =>
              value === getValues().password || "password must be match",
          })}
          type="password"
          id={"repeatPassword"}
          disabled={isRegistering}
        />
        {errors.repeatPassword && (
          <Error>{errors.repeatPassword.message}</Error>
        )}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isRegistering}>
          {isRegistering ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
