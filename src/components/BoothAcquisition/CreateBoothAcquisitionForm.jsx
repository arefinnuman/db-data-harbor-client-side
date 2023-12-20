import { useCreateBoothAcquisitionMutation } from "@/redux/boothAcquisition/boothAcquisitionApi";
import { useGetUnassignedBoothForBoothManagementQuery } from "@/redux/boothManagement/bothManagementApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateBoothAcquisitionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const [createBoothAcquisition] = useCreateBoothAcquisitionMutation({});

  const onSubmit = async (data) => {
    const boothAcquisitionData = {
      ebl365: data.ebl365,
      landOwnerName: data.landOwnerName,
      landOwnerAddress: data.landOwnerAddress,
      landOwnerPhone: data.landOwnerPhone,
      landOwnerEmail: data.landOwnerEmail,
      boothLocation: data.boothLocation,
      boothType: data.boothType,
      boothStartDate: data.boothStartDate,
      boothExpiryDate: data.boothExpiryDate,
      boothMonthlyRent: data.boothMonthlyRent,
      boothSize: data.boothSize,
      advancePaymentPercentage: data.advancePaymentPercentage,
      boardMemo: data.boardMemo[0],
      agreementBetweenEblAndBoothOwner:
        data.agreementBetweenEblAndBoothOwner[0],
    };

    try {
      const response = await createBoothAcquisition(boothAcquisitionData);
      if (response?.data?.statusCode === 200) {
        toast.success("BoothAcquisition updated successfully");
        window.location.reload();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { data: unAssignedEbl365 } =
    useGetUnassignedBoothForBoothManagementQuery(undefined, {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    });

  const unAssignedEbl365Data = unAssignedEbl365?.data;

  return (
    <div>
      <form
        className="w-full max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section>
          <h1 className="text-xl font-bold mb-2 text-primary">
            Create Acquisition for a Booth
          </h1>
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Ebl 365</span>
            </label>
            <select
              {...register("ebl365", { required: "EBL 365 is required" })}
              className="select select-bordered select-primary w-full"
            >
              <option value="">Select EBL 365 Booth</option>
              {unAssignedEbl365Data &&
                unAssignedEbl365Data.map((ebl) => (
                  <option key={ebl.id} value={ebl.id}>
                    {ebl.ebl365Name}
                  </option>
                ))}
            </select>
            {errors.ebl365 && (
              <p className="text-red-500">{errors.ebl365.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Land Owner Name</span>
            </label>
            <input
              {...register("landOwnerName", {
                required: "Land Owner Name is required",
              })}
              type="text"
              placeholder="Land Owner Name"
              className="input input-bordered input-primary w-full"
            />
            {errors.landOwnerName && (
              <p className="text-red-500">{errors.landOwnerName.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Land Owner Address</span>
            </label>
            <input
              {...register("landOwnerAddress", {
                required: "Land Owner Address is required",
              })}
              type="text"
              placeholder="Land Owner Address"
              className="input input-bordered input-primary w-full"
            />
            {errors.landOwnerAddress && (
              <p className="text-red-500">{errors.landOwnerAddress.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Land Owner Phone</span>
            </label>
            <input
              {...register("landOwnerPhone", {
                required: "Land Owner Phone is required",
              })}
              type="text"
              placeholder="Land Owner Phone"
              className="input input-bordered input-primary w-full"
            />
            {errors.landOwnerPhone && (
              <p className="text-red-500">{errors.landOwnerPhone.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Land Owner Email</span>
            </label>
            <input
              {...register("landOwnerEmail", {
                required: "Land Owner Email is required",
              })}
              type="text"
              placeholder="Land Owner Email"
              className="input input-bordered input-primary w-full"
            />
            {errors.landOwnerEmail && (
              <p className="text-red-500">{errors.landOwnerEmail.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Booth Location</span>
            </label>
            <input
              {...register("boothLocation", {
                required: "Booth Location is required",
              })}
              type="text"
              placeholder="Booth Location"
              className="input input-bordered input-primary w-full"
            />
            {errors.boothLocation && (
              <p className="text-red-500">{errors.boothLocation.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Booth Type</span>
            </label>
            <input
              {...register("boothType", {
                required: "Booth Type is required",
              })}
              type="text"
              placeholder="Booth Type"
              className="input input-bordered input-primary w-full"
            />
            {errors.boothType && (
              <p className="text-red-500">{errors.boothType.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Booth Start Date</span>
            </label>
            <input
              {...register("boothStartDate", {
                required: "Booth Start Date is required",
              })}
              type="date"
              placeholder="Booth Start Date"
              className="input input-bordered input-primary w-full"
            />
            {errors.boothStartDate && (
              <p className="text-red-500">{errors.boothStartDate.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Booth Expiry Date</span>
            </label>
            <input
              {...register("boothExpiryDate", {
                required: "Booth Expiry Date is required",
              })}
              type="date"
              placeholder="Booth Expiry Date"
              className="input input-bordered input-primary w-full"
            />
            {errors.boothExpiryDate && (
              <p className="text-red-500">{errors.boothExpiryDate.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Booth Monthly Rent</span>
            </label>
            <input
              {...register("boothMonthlyRent", {
                required: "Booth Monthly Rent is required",
              })}
              type="number"
              placeholder="Booth Monthly Rent"
              className="input input-bordered input-primary w-full"
            />
            {errors.boothMonthlyRent && (
              <p className="text-red-500">{errors.boothMonthlyRent.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Booth Size</span>
            </label>
            <input
              {...register("boothSize", {
                required: "Booth Size is required",
              })}
              type="number"
              placeholder="Booth Size"
              className="input input-bordered input-primary w-full"
            />
            {errors.boothSize && (
              <p className="text-red-500">{errors.boothSize.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Advance Payment Percentage</span>
            </label>
            <input
              {...register("advancePaymentPercentage", {
                required: "Advance Payment Percentage is required",
              })}
              type="number"
              placeholder="Advance Payment Percentage"
              className="input input-bordered input-primary w-full"
            />
            {errors.advancePaymentPercentage && (
              <p className="text-red-500">
                {errors.advancePaymentPercentage.message}
              </p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Board Memo</span>
            </label>
            <input
              {...register("boardMemo", {
                required: "Board Memo is required",
              })}
              type="file"
              placeholder="Board Memo"
              className="border border-primary rounded-lg p-2 w-full focus:ring-2 focus:ring-primary"
            />
            {errors.boardMemo && (
              <p className="text-red-500">{errors.boardMemo.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">
                Agreement Between EBL And Booth Owner
              </span>
            </label>
            <input
              {...register("agreementBetweenEblAndBoothOwner", {
                required: "Agreement Between EBL And Booth Owner is required",
              })}
              type="file"
              placeholder="Agreement Between EBL And Booth Owner"
              className="border border-primary rounded-lg p-2 w-full focus:ring-2 focus:ring-primary"
            />
            {errors.agreementBetweenEblAndBoothOwner && (
              <p className="text-red-500">
                {errors.agreementBetweenEblAndBoothOwner.message}
              </p>
            )}
          </div>
        </section>

        <button className="btn w-full mt-4 btn-primary" type="submit">
          {isSubmitting ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateBoothAcquisitionForm;
