import React, { useContext, useState, useEffect } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { LuSettings2 } from "react-icons/lu";
import { categories } from "../assets/data";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/Item";

const Shop = () => {
  const { books } = useContext(ShopContext);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const toggleFilter = (value, setState) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFilters = () => {
    let filtered = [...books];

    if (search) {
      filtered = filtered.filter((book) =>
        book.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length) {
      filtered = filtered.filter((book) => category.includes(book.category));
    }
    return filtered;
  };

  const applySorting = (bookList) => {
    switch (sortType) {
      case "low-to-high":
        return bookList.sort((a, b) => a.price - b.price);
      case "high-to-low":
        return bookList.sort((a, b) => b.price - a.price);
      default:
        return bookList;
    }
  };

  useEffect(() => {
    let filtered = applyFilters();
    let sorted = applySorting(filtered);
    setFilteredBooks(sorted);
    setCurrentPage(1);
  }, [category, sortType, books, search]);

  const paginatedBooks = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredBooks.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  return (
    <section className="max-padd-container bg-white pb-8">
      <div className="pt-20">
        {/* search bar */}
        <div className="w-full max-w-2xl flexCenter">
          <div className="inline-flex items-center justify-center bg-primary overflow-hidden w-full rounded-full p-4 px-5">
            <div className="text-lg cursor-pointer">
              <RiSearch2Line />
            </div>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="search here..."
              className="border-none outline-none w-full text-sm pl-4 bg-primary"
            />
            <div className="flexCenter cursor-pointer text-lg border-1 pl-2">
              <LuSettings2 />
            </div>
          </div>
        </div>

        {/* categories */}
        <div className="mt-12 mb-16">
          <h4 className="h4 mb-4 hidden sm:flex">Catagories:</h4>
          <div className="flexCenter sm:flexStart flex-wrap gap-x-12 gap-y-4">
            {categories.map((cat) => (
              <label key={cat.name}>
                <input
                  value={cat.name}
                  onChange={(e) => toggleFilter(e.target.value, setCategory)}
                  type="checkbox"
                  className="hidden peer"
                />
                <div className="flexCenter flex-col gap-2 peer-checked:text-secondaryOne cursor-pointer">
                  <div className="bg-primary h-20 w-20 flexCenter rounded-full">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="object-cover h-10 w-10"
                    />
                  </div>
                  <span className="medium-14">{cat.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Books container */}
        <div className="mt-8">
          <div className="flexBetween !items-start gap-7 flex-wrap pb-16 max-sm:flexCenter text-center">
            <Title
              title1={"Our"}
              title2={" Book List"}
              titleStyles={"pb-0 text-start"}
              paraStyles={"!block"}
            />
            <div className="flexCenter gap-x-2">
              <span className="hidden sm:flex medium-16">Sort by:</span>
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="text-sm p-2.5 outline-none bg-primary text-gray-30 rounded border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
              >
                <option value="relevant">Relevant</option>
                <option value="low-to-high">Low to high</option>
                <option value="high-to-low">High to low</option>
              </select>
            </div>
          </div>

          {/* books */}
          <div className="grid grid-cols-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {paginatedBooks().length > 0 ? (
              paginatedBooks().map((book) => (
                <Item book={book} key={book._id} />
              ))
            ) : (
              <p>No books found for selected filters</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
