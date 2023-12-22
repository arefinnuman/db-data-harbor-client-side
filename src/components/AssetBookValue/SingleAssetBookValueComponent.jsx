import { useGetSingleAssetBookValueQuery } from "@/redux/assetBookValue/assetBookValueApi";
import { useRouter } from "next/router";
import LoadingScreen from "../Ui/LoadingScreen";

const SingleAssetBookValueComponent = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useGetSingleAssetBookValueQuery(id, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });

  const assetBookValueData = data?.data || {};

  if (isLoading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-gray-100 rounded-lg shadow-xl max-w-4xl mx-auto my-10">
      <h1 className="text-3xl font-extrabold text-center text-gray-700 mb-8">
        Asset Information
      </h1>
      <div className="space-y-6">
        <section className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 underline decoration-blue-500">
            Terminal Details
          </h2>
          <p className="text-gray-600">
            <strong>Type:</strong> {assetBookValueData.terminal?.terminalType}
          </p>
          <p className="text-gray-600">
            <strong>ID:</strong> {assetBookValueData.terminal?.terminalId}
          </p>
          <p className="text-gray-600">
            <strong>Name and ID:</strong>{" "}
            {assetBookValueData.terminal?.terminalNameAndId}
          </p>
          <p className="text-gray-600">
            <strong>Status:</strong>{" "}
            {assetBookValueData.terminal?.terminalStatus}
          </p>
          <p className="text-gray-600">
            <strong>Brand:</strong> {assetBookValueData.terminal?.terminalBrand}
          </p>
          <p className="text-gray-600">
            <strong>Model:</strong> {assetBookValueData.terminal?.terminalModel}
          </p>
          <p className="text-gray-600">
            <strong>Serial:</strong>{" "}
            {assetBookValueData.terminal?.assetTagSerial}
          </p>
        </section>

        <section className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-green-700 mb-4 underline decoration-green-500">
            Purchase Details
          </h2>
          <p className="text-gray-600">
            <strong>Mood:</strong> {assetBookValueData.purchaseMood}
          </p>
          <p className="text-gray-600">
            <strong>Procurement Year:</strong>{" "}
            {assetBookValueData.procurementYear}
          </p>
          <p className="text-gray-600">
            <strong>Purchase Date:</strong> {assetBookValueData.dateOfPurchase}
          </p>
          <p className="text-gray-600">
            <strong>Price:</strong> ${assetBookValueData.purchasePrice}
          </p>
          <p className="text-gray-600">
            <strong>Deployment Date:</strong>{" "}
            {assetBookValueData.firstDeploymentDate}
          </p>
          <p className="text-gray-600">
            <strong>Machine Age:</strong> {assetBookValueData.machineAge} years
          </p>
          <p className="text-gray-600">
            <strong>AMC Amount:</strong> ${assetBookValueData.assetAmcAmount}
          </p>
        </section>

        <section className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 underline decoration-purple-500">
            Created By
          </h2>
          <p className="text-gray-600">
            <strong>Name:</strong>{" "}
            {assetBookValueData.createdBy?.fullName.firstName}{" "}
            {assetBookValueData.createdBy?.fullName.lastName}
          </p>
          <p className="text-gray-600">
            <strong>Employee ID:</strong>{" "}
            {assetBookValueData.createdBy?.employeeId}
          </p>
          <p className="text-gray-600">
            <strong>Email:</strong> {assetBookValueData.createdBy?.email}
          </p>
        </section>
      </div>
    </div>
  );
};

export default SingleAssetBookValueComponent;
