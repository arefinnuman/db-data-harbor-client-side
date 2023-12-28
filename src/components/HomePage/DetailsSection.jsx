import { useGetAllAssetBookValueQuery } from "@/redux/assetBookValue/assetBookValueApi";
import { useGetAllBoothAcquisitionQuery } from "@/redux/boothAcquisition/boothAcquisitionApi";
import { useGetAllBoothManagementQuery } from "@/redux/boothManagement/bothManagementApi";
import { useGetAllEbl365Query } from "@/redux/ebl365/ebl365Api";
import { useGetAllIssueFormQuery } from "@/redux/issueForm/issueFormApi";
import { useGetAllTerminalsQuery } from "@/redux/terminals/terminalApi";
import {
  FaBook,
  FaBroadcastTower,
  FaExclamationCircle,
  FaStoreAlt,
  FaTerminal,
  FaTools,
} from "react-icons/fa";

const DetailsSection = () => {
  const { data: assetBookValue } = useGetAllAssetBookValueQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const { data: boothAcquisition } = useGetAllBoothAcquisitionQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const { data: boothManagement } = useGetAllBoothManagementQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const { data: ebl365 } = useGetAllEbl365Query(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const { data: terminal } = useGetAllTerminalsQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const { data: issueForm } = useGetAllIssueFormQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const assetBookValueData = assetBookValue?.data;
  const boothAcquisitionData = boothAcquisition?.data;
  const boothManagementData = boothManagement?.data;
  const ebl365Data = ebl365?.data;
  const terminalData = terminal?.data;
  const issueFormData = issueForm?.data;

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderSummary = (data, dataType) => {
    if (!data || data.length === 0) return <div>No data available</div>;

    const sortedData = [...data].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const mostRecentItem = sortedData[0];
    let recentItemName;
    const formattedDate = formatDate(mostRecentItem.createdAt);

    switch (dataType) {
      case "AssetBookValue":
        recentItemName = mostRecentItem.terminal?.terminalNameAndId;
        break;
      case "BoothAcquisition":
        recentItemName = mostRecentItem?.ebl365.ebl365Name;
        break;
      case "BoothManagement":
        recentItemName = mostRecentItem?.ebl365.ebl365Name;
        break;
      case "Ebl365":
        recentItemName = mostRecentItem?.ebl365Name;
        break;
      case "Terminals":
        recentItemName = mostRecentItem?.terminalNameAndId;
        break;
      case "IssueForm":
        recentItemName = mostRecentItem?.boothManagement?.ebl365?.ebl365Name;
        break;
      default:
        recentItemName = `N/A`;
    }

    return (
      <div className="space-y-1">
        <div>
          <p className="text-center">Most Recent: {recentItemName}</p>
        </div>
        <div className="text-gray-500 text-sm text-center italic">
          {formattedDate}
        </div>
      </div>
    );
  };

  const renderCard = (icon, title, data, dataType) => (
    <div className="group relative overflow-hidden flex flex-col items-center justify-center p-6 border rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
      {icon}
      <h3 className="text-xl font-bold mt-4 mb-2 text-gray-800">{title}</h3>
      <div className="text-lg text-gray-700">
        {renderSummary(data, dataType)}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        A Visual Guide to Business Operations and Metrics
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {renderCard(
          <FaBook className="text-5xl text-indigo-600" />,
          "Asset Book Value",
          assetBookValueData,
          "AssetBookValue"
        )}
        {renderCard(
          <FaStoreAlt className="text-5xl text-green-600" />,
          "Booth Acquisition",
          boothAcquisitionData,
          "BoothAcquisition"
        )}
        {renderCard(
          <FaTools className="text-5xl text-blue-600" />,
          "Booth Management",
          boothManagementData,
          "BoothManagement"
        )}
        {renderCard(
          <FaBroadcastTower className="text-5xl text-red-600" />,
          "EBL 365",
          ebl365Data,
          "Ebl365"
        )}
        {renderCard(
          <FaTerminal className="text-5xl text-orange-600" />,
          "Terminals",
          terminalData,
          "Terminals"
        )}
        {renderCard(
          <FaExclamationCircle className="text-5xl text-yellow-600" />,
          "Issue Form",
          issueFormData,
          "IssueForm"
        )}
      </div>
    </div>
  );
};
export default DetailsSection;
