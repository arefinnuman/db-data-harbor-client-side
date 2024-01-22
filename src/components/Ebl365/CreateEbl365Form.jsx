import { useCreateEbl365Mutation } from "@/redux/ebl365/ebl365Api";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateEbl365Form = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const [createEbl365] = useCreateEbl365Mutation({});

  const onSubmit = async (data) => {
    const ebl365Data = {
      ebl365Name: data.name,
      ebl365Address: data.address,
      ebl365Zone: data.zone,
      ebl365NameInBengali: data.nameInBengali,
      ebl365StatusType: data.statusType,
      locationType: data.locationType,
      areaType: data.areaType,
      areaName: data.areaName,
      geoLatitude: data.geoLatitude,
      geoLongitude: data.geoLongitude,
      branchControllingGl: data.branchControllingGl,
      division: data.division,
      postalCOde: data.postalCOde,
      nearestFamousPlace: data.nearestFamousPlace,
      divisionId: data.divisionId,
      districtId: data.districtId,
      upazilaOrThana: data.upazilaOrThana,
      controlledBy: data.controlledBy,
    };

    try {
      const response = await createEbl365(ebl365Data);

      if (response?.data?.statusCode === 200) {
        toast.success("Ebl365 created successfully");
        window.location.reload();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="">
      <form
        className="w-full max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-4"></div>
        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Name"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Address"
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Zone</span>
          </label>
          <input
            type="text"
            {...register("zone", { required: "Zone is required" })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Zone"
          />
          {errors.zone && <p className="text-red-500">{errors.zone.message}</p>}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Name In Bengali</span>
          </label>
          <input
            type="text"
            {...register("nameInBengali", {
              required: "Name In Bengali is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Name In Bengali"
          />
          {errors.nameInBengali && (
            <p className="text-red-500">{errors.nameInBengali.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Status Type</span>
          </label>
          <input
            type="text"
            {...register("statusType", { required: "Status Type is required" })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Status Type"
          />
          {errors.statusType && (
            <p className="text-red-500">{errors.statusType.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Location Type</span>
          </label>
          <input
            type="text"
            {...register("locationType", {
              required: "Location Type is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Location Type"
          />
          {errors.locationType && (
            <p className="text-red-500">{errors.locationType.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Area Type</span>
          </label>
          <input
            type="text"
            {...register("areaType", { required: "Area Type is required" })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Area Type"
          />
          {errors.areaType && (
            <p className="text-red-500">{errors.areaType.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Area Name</span>
          </label>
          <input
            type="text"
            {...register("areaName", { required: "Area Name is required" })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Area Name"
          />
          {errors.areaName && (
            <p className="text-red-500">{errors.areaName.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-number">Geo Latitude</span>
          </label>
          <input
            type="text"
            {...register("geoLatitude", {
              required: "Geo Latitude is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Geo Latitude"
          />
          {errors.geoLatitude && (
            <p className="text-red-500">{errors.geoLatitude.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-number">Geo Longitude</span>
          </label>
          <input
            type="text"
            {...register("geoLongitude", {
              required: "Geo Longitude is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Geo Longitude"
          />
          {errors.geoLongitude && (
            <p className="text-red-500">{errors.geoLongitude.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Branch Controlling Gl</span>
          </label>
          <input
            type="text"
            {...register("branchControllingGl", {
              required: "Branch Controlling Gl is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Branch ControllingGl"
          />
          {errors.branchControllingGl && (
            <p className="text-red-500">{errors.branchControllingGl.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Division</span>
          </label>
          <input
            type="text"
            {...register("division", { required: "Division is required" })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Division"
          />
          {errors.division && (
            <p className="text-red-500">{errors.division.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-number">Postal Code</span>
          </label>
          <input
            type="number"
            {...register("postalCOde", { required: "Postal Code is required" })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Postal Code"
          />
          {errors.postalCOde && (
            <p className="text-red-500">{errors.postalCOde.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Nearest Famous Place</span>
          </label>
          <input
            type="text"
            {...register("nearestFamousPlace", {
              required: "Nearest Famous Place is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Nearest Famous Place"
          />
          {errors.nearestFamousPlace && (
            <p className="text-red-500">{errors.nearestFamousPlace.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Division Id</span>
          </label>
          <input
            type="text"
            {...register("divisionId", { required: "Division Id is required" })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Division Id"
          />
          {errors.divisionId && (
            <p className="text-red-500">{errors.divisionId.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">District Id</span>
          </label>
          <input
            type="text"
            {...register("districtId", { required: "District Id is required" })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter District Id"
          />
          {errors.districtId && (
            <p className="text-red-500">{errors.districtId.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Upazila Or Thana</span>
          </label>
          <input
            type="text"
            {...register("upazilaOrThana", {
              required: "Upazila Or Thana is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Upazila Or Thana"
          />
          {errors.upazilaOrThana && (
            <p className="text-red-500">{errors.upazilaOrThana.message}</p>
          )}
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Controlled By</span>
          </label>
          <input
            type="text"
            {...register("controlledBy", {
              required: "Controlled By is required",
            })}
            className="input input-bordered input-primary w-full"
            placeholder="Enter Controlled By"
          />
          {errors.controlledBy && (
            <p className="text-red-500">{errors.controlledBy.message}</p>
          )}
        </div>

        <button className="btn w-full mt-4 btn-primary" type="submit">
          {isSubmitting ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateEbl365Form;
