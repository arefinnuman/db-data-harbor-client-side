import SingleAssetBookValueComponent from "@/components/AssetBookValue/SingleAssetBookValueComponent";
import RootLayout from "@/layout/RootLayout";

const SingleAssetBookValuePage = () => {
  return (
    <div>
      <SingleAssetBookValueComponent />
    </div>
  );
};

export default SingleAssetBookValuePage;

SingleAssetBookValuePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
