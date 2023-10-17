import { useCreateTerminalMutation } from "@/redux/terminals/terminalApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateTerminalForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const [createTerminal] = useCreateTerminalMutation({});

  const onSubmit = async (data) => {
    const terminalData = {
      ebl365: data.ebl365,
      terminalType: data.terminalType,
      terminalId: data.terminalId,
      terminalNameAndId: data.terminalNameAndId,
      terminalStatus: data.terminalStatus,
      terminalBrand: data.terminalBrand,
      terminalModel: data.terminalModel,
      glNumber: data.glNumber,
      glCode: data.glCode,
      insuranceLimit: data.insuranceLimit,
      assetTagSerial: data.assetTagSerial,
      deploymentDate: data.deploymentDate,
      liveDate: data.liveDate,
      monthlyNoOfTransaction: data.monthlyNoOfTransaction,
      monthlyVolOfTransaction: data.monthlyVolOfTransaction,
      monthlyAvgNoOfTxn: data.monthlyAvgNoOfTxn,
      monthlyAvgVolOfTxn: data.monthlyAvgVolOfTxn,
      custodiansKey: {
        name: data.custodiansKeyName,
        contactNumber: data.custodiansKeyContactNumber,
      },
      custodiansCom: {
        name: data.custodiansComName,
        contactNumber: data.custodiansComContactNumber,
      },
      numberOfBpm: data.numberOfBpm,
    };

    try {
      const response = await createTerminal(terminalData);
      if (response?.data?.statusCode === 200) {
        toast.success("Terminal updated successfully");
        window.location.reload();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form
        className="w-full max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Ebl 365</span>
          </label>
          <input
            type="text"
            {...register("ebl365", { required: "EBL 365 is required" })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter EBL 365"
          />
          {errors.name && (
            <p className="text-red-500">{errors.ebl365.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Terminal Type</span>
          </label>
          <input
            type="text"
            {...register("terminalType", {
              required: "Terminal Type is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Terminal Type"
          />
          {errors.name && (
            <p className="text-red-500">{errors.terminalType.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Terminal Id</span>
          </label>
          <input
            type="text"
            {...register("terminalId", { required: "Terminal Id is required" })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Terminal Id"
          />
          {errors.name && (
            <p className="text-red-500">{errors.terminalId.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Terminal Name and Id</span>
          </label>
          <input
            type="text"
            {...register("terminalNameAndId", {
              required: "Terminal Name and Id is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Terminal Name and Id"
          />
          {errors.name && (
            <p className="text-red-500">{errors.terminalNameAndId.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Terminal Status</span>
          </label>
          <input
            type="text"
            {...register("terminalStatus", {
              required: "Terminal Status is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Terminal Status"
          />
          {errors.name && (
            <p className="text-red-500">{errors.terminalStatus.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Terminal Brand</span>
          </label>
          <input
            type="text"
            {...register("terminalBrand", {
              required: "Terminal Brand is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Terminal Brand"
          />
          {errors.name && (
            <p className="text-red-500">{errors.terminalBrand.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Terminal Model</span>
          </label>
          <input
            type="text"
            {...register("terminalModel", {
              required: "Terminal Model is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Terminal Model"
          />
          {errors.name && (
            <p className="text-red-500">{errors.terminalModel.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">GL Number</span>
          </label>
          <input
            type="text"
            {...register("glNumber", { required: "GL Number is required" })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter GL Number"
          />
          {errors.name && (
            <p className="text-red-500">{errors.glNumber.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">GL Code</span>
          </label>
          <input
            type="text"
            {...register("glCode", { required: "GL Code is required" })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter GL Code"
          />
          {errors.name && (
            <p className="text-red-500">{errors.glCode.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Insurance Limit</span>
          </label>
          <input
            type="text"
            {...register("insuranceLimit", {
              required: "Insurance Limit is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Insurance Limit"
          />
          {errors.name && (
            <p className="text-red-500">{errors.insuranceLimit.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Asset Tag Serial</span>
          </label>
          <input
            type="text"
            {...register("assetTagSerial", {
              required: "Asset Tag Serial is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Asset Tag Serial"
          />
          {errors.name && (
            <p className="text-red-500">{errors.assetTagSerial.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Deployment Date</span>
          </label>
          <input
            type="text"
            {...register("deploymentDate", {
              required: "Deployment Date is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Deployment Date"
          />
          {errors.name && (
            <p className="text-red-500">{errors.deploymentDate.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Live Date</span>
          </label>
          <input
            type="text"
            {...register("liveDate", {
              required: "Live Date is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Live Date"
          />
          {errors.name && (
            <p className="text-red-500">{errors.liveDate.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Monthly No Of Transaction</span>
          </label>
          <input
            type="text"
            {...register("monthlyNoOfTransaction", {
              required: "Monthly No Of Transaction is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Monthly No Of Transaction"
          />
          {errors.name && (
            <p className="text-red-500">
              {errors.monthlyNoOfTransaction.message}
            </p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Monthly Vol Of Transaction</span>
          </label>
          <input
            type="text"
            {...register("monthlyVolOfTransaction", {
              required: "Monthly Vol Of Transaction is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Monthly Vol Of Transaction"
          />
          {errors.name && (
            <p className="text-red-500">
              {errors.monthlyVolOfTransaction.message}
            </p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Monthly Avg No Of Txn</span>
          </label>
          <input
            type="text"
            {...register("monthlyAvgNoOfTxn", {
              required: "Monthly Avg No Of Txn is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Monthly Avg No Of Txn"
          />
          {errors.name && (
            <p className="text-red-500">{errors.monthlyAvgNoOfTxn.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Monthly Avg Vol Of Txn</span>
          </label>
          <input
            type="text"
            {...register("monthlyAvgVolOfTxn", {
              required: "Monthly Avg Vol Of Txn is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Monthly Avg Vol Of Txn"
          />
          {errors.name && (
            <p className="text-red-500">{errors.monthlyAvgVolOfTxn.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Custodians Key Name</span>
          </label>
          <input
            type="text"
            {...register("custodiansKeyName", {
              required: "Custodians Key Name is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Custodians Key Name"
          />
          {errors.name && (
            <p className="text-red-500">{errors.custodiansKeyName.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Custodians Key Contact Number</span>
          </label>
          <input
            type="text"
            {...register("custodiansKeyContactNumber", {
              required: "Custodians Key Contact Number is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Custodians Key Contact Number"
          />
          {errors.name && (
            <p className="text-red-500">
              {errors.custodiansKeyContactNumber.message}
            </p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Custodians Com Name</span>
          </label>
          <input
            type="text"
            {...register("custodiansComName", {
              required: "Custodians Com Name is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Custodians Com Name"
          />
          {errors.name && (
            <p className="text-red-500">{errors.custodiansComName.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Custodians Com Contact Number</span>
          </label>
          <input
            type="text"
            {...register("custodiansComContactNumber", {
              required: "Custodians Com Contact Number is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Custodians Com Contact Number"
          />
          {errors.name && (
            <p className="text-red-500">
              {errors.custodiansComContactNumber.message}
            </p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-number">Number Of Bpm</span>
          </label>
          <input
            type="number"
            {...register("numberOfBpm", {
              required: "Number Of Bpm is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Number Of Bpm"
          />
          {errors.name && (
            <p className="text-red-500">{errors.numberOfBpm.message}</p>
          )}
        </div>

        <button className="btn w-full mt-4 btn-primary" type="submit">
          {isSubmitting ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateTerminalForm;
