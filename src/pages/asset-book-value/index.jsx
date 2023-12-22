import AssetBookValueComponent from "@/components/AssetBookValue/AssetBookValueComponent";
import RootLayout from "@/layout/RootLayout";

const AssetBookValueReportPage = () => {
  return (
    <div>
      <AssetBookValueComponent />
    </div>
  );
};

export default AssetBookValueReportPage;

AssetBookValueReportPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
