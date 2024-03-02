import { useState, useEffect } from "react";
import Modal from "./Modal";
import Link from "next/link";
import data from "@/data/data.json";

export default function Search(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    // setSearchLoading(true);
    // fetch(`/api/data`)
    //   .then((res) => res.json())
    //   .then((data) => {
    if (data && data.length > 0) {
      setSearchResults(data);
      setSearchLoading(false);
    }
  }, []);
  // }, []);

  const handleSearch = async (e) => {
    setSearchLoading(true);
    setSearchError(false);

    try {
      const res = await fetch(`/api/search/?q=${e.target.value}`);
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        setSearchResults(data.results);
        setSearchLoading(false);
      } else {
        setSearchResults([]);
        setSearchLoading(false);
      }
    } catch (error) {
      setSearchLoading(false);
      setSearchError(true);
    }
  };

  return (
    <Modal
      showModal={props.showSearch}
      setShowModal={props.setShowSearch}
      className="max-w-[500px] transition-transform min-h-[50vh]"
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          className="py-4 pl-8 w-full text-sm rounded-t-lg border-b border-b-1 border-light-200 focus:outline-none"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e);
          }}
        />
        <div className="absolute top-[50%] translate-y-[-50%] left-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-light-200 dark:text-dark-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.873-4.873"
            />
            <circle cx="10" cy="10" r="7" />
          </svg>
        </div>

        {searchLoading && (
          <div className="absolute top-[50%] translate-y-[-50%] right-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-dark-400"></div>
          </div>
        )}
      </div>
      <div className="">
        {searchError && (
          <div className="flex items-center justify-center mt-5">
            <p className="text-sm text-red-500">Error fetching results</p>
          </div>
        )}
        {!searchError && searchResults.length === 0 && (
          <div className="flex items-center justify-center mt-5">
            <p className="text-sm">No results found</p>
          </div>
        )}
        {searchResults.length > 0 && (
          <ul className="divide-y divide-light-200 dark:divide-dark-200 p-2 max-h-[80vh] custom-scrollbar overflow-auto transition-all">
            {searchResults.map((result, id) => (
              <a href={"/view/" + result.title} key={id}>
                <li className="flex items-center gap-4 hover:bg-slate-50 p-2 rounded-xl">
                  {result.video ? (
                    <video
                      src={result.video}
                      className="w-20 h-20 rounded-xl object-cover"
                      autoPlay
                      muted
                    />
                  ) : (
                    <img src={result.image} className="w-20 h-20 rounded-xl" alt="search bar icon"/>
                  )}
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">{result.title}</p>
                    <p className="text-xs text-dark-400">
                      {result.description}
                    </p>
                  </div>
                </li>
              </a>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
}
