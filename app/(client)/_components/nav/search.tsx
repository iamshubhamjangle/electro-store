"use client";

import { FormEvent, useState } from "react";
import { SearchIcon } from "lucide-react";

const Search = () => {
  const [search, setSearch] = useState<string>("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleCloseSearchItemList = () => {
    setSearch("");
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="h-4 w-4" color="grey" />
          </div>
          <input
            type="search"
            className="block w-full px-4 py-2 pl-10 text-sm text-gray-900 bg-gray-200 rounded-lg  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
