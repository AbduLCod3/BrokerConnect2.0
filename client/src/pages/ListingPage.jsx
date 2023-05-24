import { Link } from "react-router-dom";

export default function ListingPage() {
  return (
    <div>
      <div>
        <Link
          className="bg-primary tex-white font-bold py-2 px-6 rounded"
          to={"/account/listings/new"}
        >
          Add new listing
        </Link>
        MY PLACES SON
      </div>
    </div>
  );
}
