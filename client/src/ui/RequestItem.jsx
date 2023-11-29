import { Link } from "react-router-dom";
import styles from "./RequestItem.module.css";
import { limitStrLen } from "../utils/helper";

function RequestItem({ request }) {
  const { id, name, address, latlng } = request;
  const { lat, lng } = latlng;
  const totalAmount = request.products.reduce(
    (acc, cur) => cur.quantity + acc,
    0
  );
  return (
    <li className="mt-6 w-[400px]">
      <Link
        to={`${id}?lat=${lat}&lng=${lng}&form=request`}
        className={`${styles.requestItem}`}
      >
        <div className="w-full">
          <h1 className="text-[20px] font-bold">{name}</h1>
        </div>
        <h3 className={styles.name}>{limitStrLen(address, 23)}</h3>
        <p className="text-2xl font-bold">Amount: {totalAmount}</p>
      </Link>
    </li>
  );
}

export default RequestItem;
