import { useUpdateBoothAcquisitionMutation } from "@/redux/boothAcquisition/boothAcquisitionApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdateBoothAcquisitionForm = ({ selectedUpdateBoothAcquisition }) => {
  const id = selectedUpdateBoothAcquisition._id;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const [updateBoothAcquisition] = useUpdateBoothAcquisitionMutation({});

  const onSubmit = async (data) => {
    const boothAcquisitionData = {
      id,
      boardMemo: data.boardMemo,
      agreementBetweenEblAndBoothOwner: data.agreementBetweenEblAndBoothOwner,
      landOwnerName: data.landOwnerName,
      landOwnerAddress: data.landOwnerAddress,
      landOwnerPhone: data.landOwnerPhone,
      boothLocation: data.boothLocation,
      boothType: data.boothType,
      boothStartDate: data.boothStartDate,
      boothExpiryDate: data.boothExpiryDate,
    };

    const response = await updateBoothAcquisition(boothAcquisitionData);
    if (response?.data?.statusCode === 200) {
      toast.success("Updated successfully");
      window.location.reload();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <form
        className="w-full max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-xl font-bold mb-4 text-center">
          Update {selectedUpdateBoothAcquisition?.ebl365?.ebl365Name} Booth
          Acquisition Details
        </h1>
        {[
          {
            label: "Land Owner Name",
            name: "landOwnerName",
            defaultValue: selectedUpdateBoothAcquisition.landOwnerName,
          },
          {
            label: "Land Owner Address",
            name: "landOwnerAddress",
            defaultValue: selectedUpdateBoothAcquisition.landOwnerAddress,
          },
          {
            label: "Land Owner Phone",
            name: "landOwnerPhone",
            defaultValue: selectedUpdateBoothAcquisition.landOwnerPhone,
          },
          {
            label: "Booth Location",
            name: "boothLocation",
            defaultValue: selectedUpdateBoothAcquisition.boothLocation,
          },
        ].map((field, index) => (
          <div key={index} className="mb-2">
            <label className="block text-sm font-semibold text-gray-600">
              {field.label}
            </label>
            <input
              type="text"
              {...register(field.name, {
                required: `${field.label} is required`,
              })}
              defaultValue={field.defaultValue}
              className="input input-bordered input-primary w-full mt-1 text-sm"
            />
            {errors[field.name] && (
              <p className="text-red-500 mt-1 text-sm">
                {errors[field.name].message}
              </p>
            )}
          </div>
        ))}

        <button
          className="btn w-full mt-4 btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBoothAcquisitionForm;
