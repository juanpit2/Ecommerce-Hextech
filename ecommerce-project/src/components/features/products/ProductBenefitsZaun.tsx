export default function BenefitsZaun() {
  return (
    <section className="w-full py-24 flex flex-col items-center">
      
      {/* Contenedor general */}
      <div className="flex items-center justify-center gap-20 max-sm:flex-col max-sm:gap-10">

        {/* Item */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#2C3642] border border-[#2C3642]">
            <img src="/images/icons/Plain 2.png "  className="w-6 bg" />
          </div>
          <p className="text-sm text-[#FEFEFE] bg mt-4 leading-tight">
            Free shipping<br/>in selected products
          </p>
        </div>

        {/* Divider */}
        <div className="h-20 w-px bg-black max-sm:hidden"></div>

        {/* Item */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#2C3642] border border-[#2C3642]">
            <img src="/images/icons/SafeWhite.svg" className="w-6" />
          </div>
          <p className="text-sm text-[#FEFEFE] mt-4 leading-tight">
            Safe purchase
          </p>
        </div>

        <div className="h-20 w-px bg-[#2B1C7D] max-sm:hidden"></div>


        {/* Item */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#2C3642] border border-[#2C3642]">
            <img src="/images/icons/MapWhite.svg" className="w-6" />
          </div>
          <p className="text-sm text-[#FEFEFE] mt-4 leading-tight">
            National shipping
          </p>
        </div>

        <div className="h-20 w-px bg-black max-sm:hidden"></div>

        {/* Item */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#2C3642] border border-[#2C3642]">
            <img src="/images/icons/HandWhite.svg" className="w-6" />
          </div>
          <p className="text-sm text-[#FEFEFE] mt-4 leading-tight">
            Money-back<br/>guarantee
          </p>
        </div>

      </div>
    </section>
  );
}
