import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSetting from "./useSetting";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { setting, settingLoading } = useSetting();
  const { editSetting, isEditing } = useUpdateSetting();
  if (settingLoading) return <Spinner />;

  const updateSetting = async (e, field) => {
    
    const { value } = e.target;
    console.log(value);
    if (!value) return false;


    editSetting({ [field]: value });
  };
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isEditing}
          defaultValue={setting.minBookingLength}
          onBlur={(e) => updateSetting(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isEditing}
          defaultValue={setting.maxBookingLength}
          onBlur={(e) => updateSetting(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isEditing}
          defaultValue={setting.maxGuestPerBooking}
          onBlur={(e) => updateSetting(e, "maxGuestPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          disabled={isEditing}
          id="breakfast-price"
          defaultValue={setting.breakFastPrice}
          onBlur={(e) => updateSetting(e, "breakFastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
