import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../utils/locationSlice";
import { RxCross2 } from "react-icons/rx";
import { MdLocationOn } from "react-icons/md";


const SearchLocation = ({ setOpenSearch }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchLocation();
  }, [searchInput]);

  // function to fetch searchLocation details
  const fetchLocation = async () => {
    const result = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchInput)}&format=json`);

    const json = await result.json();
    console.log(json);
    setSearchSuggestions(json);
  }

  // function handle enter key
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (event.target.value !== '') {
        setSearchInput(event.target.value + ' india');
      }
    }
  }

  // function to handle Location select (to get latitude and longitude)
  const handleLocationSelect = (item) => {
    setOpenSearch(false)
    dispatch(updateLocation(item));
  }

  return (
    <div className="absolute top-0 left-0 w-[90vw] sm:w-[50vw] h-[100vh] scroll p-4 bg-slate-200 overflow-y-scroll">
      <RxCross2
        className="text-2xl absolute top-2 left-4 cursor-pointer"
        onClick={() => setOpenSearch(false)}
      />

      <form className="border-b-2 border-slate-300 mt-6">
        <input
          type="text"
          placeholder="Search for area, street name..."
          className="w-[100%] p-5 outline-none font-normal"
          onKeyDown={handleKeyDown}
        />
      </form>

      <ul className="mt-4">
        {
          searchSuggestions.map((item) => {
            return (
              <div
                key={item.place_id}
                className="my-2 border-b-2 border-slate-300 cursor-pointer flex box-border"
                onClick={() => handleLocationSelect(item)}
              >
                <MdLocationOn className="w-[5%] mt-1" />
                <div className="w-[95%] pl-2">
                  <li>{item.name}</li>
                  <li className="text-xs font-normal text-slate-600">{item.display_name}</li>
                </div>
              </div>
            )
          })
        }
      </ul>

    </div>
  )
}

export default SearchLocation;