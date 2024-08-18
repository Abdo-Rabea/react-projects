import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  //* getValues -> returns object contains or current values
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  console.log(errors);
  const queryClient = useQueryClient();

  const { isPending: isCreatingCabin, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("cabin added successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      //todo: close the modal
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
    // console.log({ ...data, image: data.image[0].name });
  }
  function onError(errors) {
    //* called when you want to do something onSubmit when error occured (validation error for ex.)
    // console.log(errors);o
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreatingCabin}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isCreatingCabin}
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
          disabled={isCreatingCabin}
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
          disabled={isCreatingCabin}
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
          disabled={isCreatingCabin}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreatingCabin}>
          {isCreatingCabin ? "adding cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
