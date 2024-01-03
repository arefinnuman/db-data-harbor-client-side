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

  const items = [
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
  ];

  const colorStyles = {
    green: {
      background: "bg-green-100",
      text: "text-green-600",
      hoverBackground: "hover:bg-green-700",
      border: "bg-green-600",
    },
    purple: {
      background: "bg-purple-100",
      text: "text-purple-600",
      hoverBackground: "hover:bg-purple-700",
      border: "bg-purple-600",
    },
    orange: {
      background: "bg-orange-100",
      text: "text-orange-600",
      hoverBackground: "hover:bg-orange-700",
      border: "bg-orange-600",
    },
  };

  return (
    <div className="flex flex-col md:flex-row space-x-4 px-2 py-2">
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex-1 p-3 rounded-lg shadow-md hover:shadow-lg ${
            colorStyles[item.color].background
          } transform transition duration-500 ease-in-out hover:scale-105`}
        >
          <span
            className={`${
              colorStyles[item.color].border
            } text-white px-2 rounded-lg text-xs`}
          >
            {item.category}
          </span>
          <div className="flex items-center my-2">
            <h5
              className={`${
                colorStyles[item.color].text
              } text-lg font-semibold`}
            >
              Attention: Unassigned{" "}
              {item.category === "Asset Book Value" ? "Terminals" : "Booths"}{" "}
              Available
            </h5>
          </div>
          <p className={`${colorStyles[item.color].text} mb-1`}>
            Please assign the following unassigned{" "}
            {item.category === "Asset Book Value" ? "terminals" : "booths"}{" "}
            soon:
          </p>
          <ul className={`list-disc pl-4 ${colorStyles[item.color].text} mb-2`}>
            {item.renderFunction()}
          </ul>
          <div className="flex justify-between items-center">
            <item.icon
              className={`${colorStyles[item.color].text} text-2xl mr-1`}
            />
            <Link
              href={item.link}
              className={`${
                colorStyles[item.color].border
              } text-white py-1 px-2 rounded ${
                colorStyles[item.color].hoverBackground
              } transition duration-300 text-xs`}
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
