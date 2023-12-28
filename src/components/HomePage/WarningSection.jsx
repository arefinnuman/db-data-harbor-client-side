import { useGetUnAssignedTerminalsInAssetBookValueQuery } from "@/redux/assetBookValue/assetBookValueApi";
import { useGetUnassignedBoothForAcquisitionQuery } from "@/redux/boothAcquisition/boothAcquisitionApi";
import { useGetUnassignedBoothForBoothManagementQuery } from "@/redux/boothManagement/bothManagementApi";
import Link from "next/link";
import { FaStore, FaTerminal, FaToolbox } from "react-icons/fa";

const WarningSection = () => {
  const { data: unAssignedEbl365inBoothAcquisition } =
    useGetUnassignedBoothForAcquisitionQuery(undefined, {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    });

  const unAssignedEbl365inBoothAcquisitionData =
    unAssignedEbl365inBoothAcquisition?.data;

  const hasUnassignedBoothsInBoothAcquisition =
    unAssignedEbl365inBoothAcquisitionData &&
    unAssignedEbl365inBoothAcquisitionData.length > 0;

  const renderUnassignedBoothsInBoothAcquisition = () => {
    return unAssignedEbl365inBoothAcquisitionData?.map((booth, index) => (
      <li key={booth.id}>
        {booth.ebl365Name}
        {index < unAssignedEbl365inBoothAcquisitionData.length - 1 ? "" : ""}
      </li>
    ));
  };

  const { data: unAssignedEbl365InBoothManagement } =
    useGetUnassignedBoothForBoothManagementQuery(undefined, {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    });

  const unAssignedEbl365InBoothManagementData =
    unAssignedEbl365InBoothManagement?.data;

  const hasUnassignedBoothsInBoothManagement =
    unAssignedEbl365InBoothManagementData &&
    unAssignedEbl365InBoothManagementData.length > 0;

  const renderUnassignedBoothsInBoothManagement = () => {
    return unAssignedEbl365InBoothManagementData?.map((booth, index) => (
      <li key={booth.id}>
        {booth.ebl365Name}
        {index < unAssignedEbl365InBoothManagementData.length - 1 ? "" : ""}
      </li>
    ));
  };

  const { data: unAssignedTerminals } =
    useGetUnAssignedTerminalsInAssetBookValueQuery(undefined, {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    });

  const unAssignedTerminalsData = unAssignedTerminals?.data;

  const hasUnassignedTerminals =
    unAssignedTerminalsData && unAssignedTerminalsData.length > 0;

  const renderUnassignedTerminals = () => {
    return unAssignedTerminalsData?.map((terminal, index) => (
      <li key={terminal.id}>
        {terminal.terminalNameAndId}
        {index < unAssignedTerminalsData.length - 1 ? "" : ""}
      </li>
    ));
  };
  return (
    <div className="flex flex-col md:flex-row space-x-4 px-2 py-2">
      {[
        {
          category: "Booth Acquisition",
          color: "green",
          icon: FaStore,
          link: "/assign-booths",
          renderFunction: renderUnassignedBoothsInBoothAcquisition,
        },
        {
          category: "Booth Management",
          color: "purple",
          icon: FaToolbox,
          link: "/booth-management/create",
          renderFunction: renderUnassignedBoothsInBoothManagement,
        },
        {
          category: "Asset Book Value",
          color: "orange",
          icon: FaTerminal,
          link: "/asset-book-value/create",
          renderFunction: renderUnassignedTerminals,
        },
      ].map((item, index) => (
        <div
          key={index}
          className={`flex-1 p-3 rounded-lg shadow-md hover:shadow-lg bg-${item.color}-100 transform transition duration-500 ease-in-out hover:scale-105`}
        >
          <span
            className={`bg-${item.color}-600 text-white px-2 rounded-lg text-xs`}
          >
            {item.category}
          </span>
          <div className="flex items-center my-2">
            <h5 className={`text-${item.color}-600 text-lg font-semibold`}>
              Attention: Unassigned{" "}
              {item.category === "Asset Book Value" ? "Terminals" : "Booths"}{" "}
              Available
            </h5>
          </div>
          <p className={`text-${item.color}-600 mb-1`}>
            Please assign the following unassigned{" "}
            {item.category === "Asset Book Value" ? "terminals" : "booths"}{" "}
            soon:
          </p>
          <ul className={`list-disc pl-4 text-${item.color}-600 mb-2`}>
            {item.renderFunction()}
          </ul>
          <div className="flex justify-between items-center">
            <item.icon className={`text-${item.color}-600 text-2xl mr-1`} />
            <Link
              href={item.link}
              className={`bg-${item.color}-600 text-white py-1 px-2 rounded hover:bg-${item.color}-700 transition duration-300 text-xs`}
            >
              Assign Now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WarningSection;
