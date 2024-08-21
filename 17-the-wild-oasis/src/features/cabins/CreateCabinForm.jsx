import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...cabinEditValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  //* getValues -> returns object contains or current values
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: cabinEditValues,
  });
  const { errors } = formState;

  //*A) create a new Cabin
  const { isCreatingCabin, createCabin } = useCreateCabin(reset);
  //*B) edit cabin
  const { isEditingCabin, editCabin } = useEditCabin(reset);

  function onSubmit(data) {
    const imgData = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      //! you must send one object having all values
      editCabin(
        { newCabinData: { ...data, image: imgData }, editId },
        {
          onSuccess: (data) => {
            reset();
            //! as the form can be not used in the modal so it will be undefined
            onCloseModal?.();
          },
        }
      );
    } else
      createCabin(
        { ...data, image: imgData },
        //* you can access options in the mutate
        //* you also have access to the mutationFn returned value (wow)
        {
          onSuccess: (data) => {
            reset();
            //! as the form can be not used in the modal so it will be undefined
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    //* called when you want to do something onSubmit when error occured (validation error for ex.)
    // console.log(errors);
  }
  const isWorking = isCreatingCabin || isEditingCabin;
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "value shouldn't be less than 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "value shouldn't be less than 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "discount should be less thant or equal price",
            required: "This field is required",
            //* to define you custome validation
            //* callback return true -> good
            //* callback return string -> error message
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            //* again: returning string will make it required with this error message
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => {
            onCloseModal?.();
          }}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession
            ? "edit cabin"
            : isWorking
            ? "adding cabin"
            : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
