import AllAssetBookValueReport from "./AllAssetBookValueReport";
import SelectedAssetBookValueReport from "./SelectedAssetBookValueReport";
import SingleBookValueReport from "./SingleBookValueReport";

const GenerateBookValueReport = () => {
  return (
    <div className="my-6 ">
      <h2 className="text-2xl font-semibold text-gray-600">
        Generate Book Value Report
      </h2>

      <div className="flex flex-wrap gap-4 justify-center items-start">
        {/* Create Single Book Value */}
        <div className="flex-grow">
          <SingleBookValueReport />
        </div>

        {/* Create All Book Value */}
        <div className="flex-grow">
          <AllAssetBookValueReport />
        </div>

        {/* Selected Book Value */}
        <div className="flex-grow">
          <SelectedAssetBookValueReport />
        </div>
      </div>
    </div>
  );
};

export default GenerateBookValueReport;
