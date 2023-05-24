import { Link } from "react-router-dom";
// import { PlusIcon } from "@heroicons/react/24/solid";

export default function ListingPage() {
  return (
    <div>
      <div className="mt-5 flex py-2 justify-end">
        <Link
          className="bg-primary text-white font-bold py-2 px-6 rounded mt-5"
          to={"/account/listings/new"}
        >
          + New listing
        </Link>
      </div>
    </div>
  );
}
