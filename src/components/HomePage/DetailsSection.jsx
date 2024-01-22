/* eslint-disable @next/next/no-img-element */
import { useGetAllAssetBookValueQuery } from "@/redux/assetBookValue/assetBookValueApi";
import { useGetAllBoothAcquisitionQuery } from "@/redux/boothAcquisition/boothAcquisitionApi";
import { useGetAllBoothManagementQuery } from "@/redux/boothManagement/bothManagementApi";
import { useGetAllEbl365Query } from "@/redux/ebl365/ebl365Api";
import { useGetAllIssueFormQuery } from "@/redux/issueForm/issueFormApi";
import { useGetAllTerminalsQuery } from "@/redux/terminals/terminalApi";
import Image from "next/image";
import Link from "next/link";
import assetBookValueImage from "../../assets/AssetBookValue.png";
import boothAcquisitionImage from "../../assets/BoothAcquisition.png";
import boothManagementImage from "../../assets/BoothManagement.png";
import ebl365Image from "../../assets/Ebl365.png";
import issueFormImage from "../../assets/IssueForm.png";
import terminalImage from "../../assets/Terminals.png";

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
      <div className="transition-shadow duration-300 ease-in-out">
        <div>
          <div className="flex items-center space-x-2">
            <p className="text-sm font-semibold text-white">
              Recent Added: <span className="">{recentItemName}</span>
            </p>
          </div>
          <p className="text-xs font-light text-white">{formattedDate}</p>
        </div>
      </div>
    );
  };

  const renderCard = (image, title, data, dataType, linkHref) => (
    <div className="card w-96 bg-base-100 shadow-xl image-full">
      <figure>
        <Image src={image} alt={title} width={400} height={50} className="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="text-lg text-gray-600">
          {renderSummary(data, dataType)}
        </div>
        <div className="card-actions justify-end">
          <Link className=" btn btn-primary" href={linkHref}>
            View
          </Link>
        </div>
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
          assetBookValueImage,
          "Asset Book Value",
          assetBookValueData,
          "AssetBookValue",
          "/asset-book-value"
        )}
        {renderCard(
          boothAcquisitionImage,
          "Booth Acquisition",
          boothAcquisitionData,
          "BoothAcquisition",
          "/asset-book-value"
        )}
        {renderCard(
          boothManagementImage,
          "Booth Management",
          boothManagementData,
          "BoothManagement",
          "/asset-book-value"
        )}
        {renderCard(
          ebl365Image,
          "EBL 365",
          ebl365Data,
          "Ebl365",
          "/asset-book-value"
        )}
        {renderCard(
          terminalImage,
          "Terminals",
          terminalData,
          "Terminals",
          "/asset-book-value"
        )}
        {renderCard(
          issueFormImage,
          "Issue Form",
          issueFormData,
          "IssueForm",
          "/asset-book-value"
        )}
      </div>
    </div>
  );
};
export default DetailsSection;
