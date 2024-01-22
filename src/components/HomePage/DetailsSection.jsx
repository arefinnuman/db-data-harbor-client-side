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
    <Link href={linkHref} className="block">
      <div className="card max-w-full bg-base-100 shadow-xl overflow-hidden group cursor-pointer">
        <figure className="relative">
          <Image
            src={image}
            alt={title}
            layout="responsive"
            width={500}
            height={200}
          />
          <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black via-transparent to-transparent">
            <h2 className="card-title text-white">{title}</h2>
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-lg text-gray-300 mb-4">
              {renderSummary(data, dataType)}
            </div>
          </div>
        </figure>
      </div>
    </Link>
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6 md:mx-4">
        A Visual Guide to Business Operations and Metrics
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-2 md:mx-4">
        {renderCard(ebl365Image, "EBL 365", ebl365Data, "Ebl365", "/ebl-365")}
        {renderCard(
          terminalImage,
          "Terminals",
          terminalData,
          "Terminals",
          "/terminals"
        )}
        {renderCard(
          boothAcquisitionImage,
          "Booth Acquisition",
          boothAcquisitionData,
          "BoothAcquisition",
          "/booth-acquisition"
        )}
        {renderCard(
          boothManagementImage,
          "Booth Management",
          boothManagementData,
          "BoothManagement",
          "/booth-management"
        )}
        {renderCard(
          issueFormImage,
          "Issue Form",
          issueFormData,
          "IssueForm",
          "/issue-form"
        )}
        {renderCard(
          assetBookValueImage,
          "Asset Book Value",
          assetBookValueData,
          "AssetBookValue",
          "/asset-book-value"
        )}
      </div>
    </div>
  );
};
export default DetailsSection;
