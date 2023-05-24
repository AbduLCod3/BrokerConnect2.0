import { Link, useParams } from "react-router-dom";
// import { PlusIcon } from "@heroicons/react/24/solid";

export default function ListingPage() {
  const { action } = useParams();

  return (
    <div>
      {action !== "new" && (
        <div className="mt-5 flex py-2 justify-end">
          <Link
            className="bg-primary text-white font-bold py-2 px-6 rounded mt-5"
            to={"/account/listings/new"}
          >
            + New listing
          </Link>
        </div>
      )}

      {action === "new" && (
        <div>
          <form>
            <input type="text" placeholder="Title Ex: Apartment, House" />
            <input type="text" placeholder="Address " />
            <input type="text" placeholder="2BR 1BATH 1250sqf " />
            <input type="text" placeholder="Cost" />
            <div className="flex ">
              <input type="text" placeholder="Upload Pics" className="mr-10"/>

              <button className="border bg-primary text-white font-semibold rounded px-4">
                +&nbsp;Photos
              </button>
            </div>
            <button className="bg-primary flex text-center border gap-6 rounded border-gray-300 py-2 px-2 shadow-md shadow-gray-300 text-white font-bold mt-10 ml-80">
              + Add Listing
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
