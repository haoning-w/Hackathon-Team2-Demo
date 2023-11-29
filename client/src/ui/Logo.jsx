import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="w-[200px]">
      <Link to="/">
        <img src="/Logo.png" alt="logo image" />
      </Link>
    </div>
  );
}

export default Logo;
