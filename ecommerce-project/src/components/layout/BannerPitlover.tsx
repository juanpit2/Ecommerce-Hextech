import BannerPitlover from "../../../public/images/icons/BannerPitloverProduct.jpg"
export default function BannerProducts() {
  return (
    <div className="w-full">
      <img
        src= {BannerPitlover}
        className="w-full h-[380px] object-cover rounded-xl"
        alt="Products Banner"
      />
    </div>
  );
}
