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
    hasUnassignedBoothsInBoothAcquisition && {
      category: "Booth Acquisition",
      color: "green",
      icon: FaStore,
      link: "/assign-booths",
      renderFunction: renderUnassignedBoothsInBoothAcquisition,
    },
    hasUnassignedBoothsInBoothManagement && {
      category: "Booth Management",
      color: "purple",
      icon: FaToolbox,
      link: "/booth-management/create",
      renderFunction: renderUnassignedBoothsInBoothManagement,
    },
    hasUnassignedTerminals && {
      category: "Asset Book Value",
      color: "orange",
      icon: FaTerminal,
      link: "/asset-book-value/create",
      renderFunction: renderUnassignedTerminals,
    },
  ].filter(Boolean);

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
    <div className="flex flex-col md:flex-row md:gap-4 py-2 my-4 md:mx-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex-1 px-4 py-3 rounded-lg border ${
            colorStyles[item.color].background
          } transition-transform duration-300 ease-in-out hover:scale-105`}
        >
          <span
            className={`${
              colorStyles[item.color].border
            } text-gray-200 px-4 py-1 rounded-lg text-xs shadow-md hover:shadow-lg transition duration-300 ease-in-out hover:bg-gradient-to-r from-[#colorStart] to-[#colorEnd]`}
          >
            {item.category}
          </span>

          <div className="flex items-center my-2">
            <item.icon
              className={`${colorStyles[item.color].text} text-xl mr-2`}
            />
            <h5
              className={`${
                colorStyles[item.color].text
              } text-lg font-semibold`}
            >
              Unassigned{" "}
              {item.category === "Asset Book Value" ? "Terminals" : "Booths"}
            </h5>
          </div>
          <p className={`${colorStyles[item.color].text} mb-3 text-sm`}>
            Please assign the following soon:
          </p>
          <ul
            className={`list-disc pl-5 ${
              colorStyles[item.color].text
            } mb-4 text-sm`}
          >
            {item.renderFunction()}
          </ul>
          <Link
            href={item.link}
            className={`inline-block text-sm py-1 px-3 rounded ${
              colorStyles[item.color].hoverBackground
            } ${colorStyles[item.color].text} transition duration-300`}
          >
            Assign Now
          </Link>
        </div>
      ))}
    </div>
  );
};

export default WarningSection;
