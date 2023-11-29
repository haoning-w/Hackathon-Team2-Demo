import { useSelector } from "react-redux";

function Delivery() {
  const products = useSelector((store) => store.delivery.products);
  const accumulation = useSelector((store) => store.delivery.accumulation);

  return (
    <div className="absolute bottom-0 w-full h-36 bg-[var(--color-dark--1)] z-10 rounded-2xl text-slate-100">
      <h1 className="block text-[16px] font-bold ml-8 mt-4">
        Logistics Tracker
      </h1>
      <div className="ml-8">
        {Object.keys(products).map(
          (item, ind) =>
            products[item] > 0 && (
              <label className="mr-6 text-[24px]" key={ind}>
                {item}: {products[item]}
              </label>
            )
        )}
      </div>
    </div>
  );
}

export default Delivery;
