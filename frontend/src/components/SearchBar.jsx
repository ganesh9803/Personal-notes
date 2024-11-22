import PropTypes from 'prop-types'; // Import PropTypes

const SearchBar = ({ setSearchQuery, setSelectedCategory }) => {
  return (
    <div className="search-bar flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
      <input
        type="text"
        placeholder="Search by title"
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full sm:w-1/2 p-3 border rounded-lg focus:ring focus:ring-blue-300"
      />
      <select
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full sm:w-1/3 p-3 border rounded-lg focus:ring focus:ring-blue-300"
      >
        <option value="">All Categories</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Others">Others</option>
      </select>
    </div>
  );
};

// Add PropTypes for validation
SearchBar.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default SearchBar;
