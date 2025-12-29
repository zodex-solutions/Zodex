const PageControls = ({ onSearch, onFilter, onAdd, text }) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search by title..."
          onChange={(e) => onSearch(e.target.value)}
          className="!bg-[#0f1218] !border !border-gray-800 hover:!outline-none  !rounded !px-3 !py-2"
        />
        <select
          onChange={(e) => onFilter(e.target.value)}
          className="!bg-[#0f1218] !border !border-gray-800 hover:!outline-none  !rounded !px-3 !py-2"
        >
          <option value="">Filter</option>
          <option value="newer">Newer</option>
          <option value="older">Older</option>
        </select>
      </div>
      <button
        onClick={onAdd}
        className=" !bg-[#0f1218] !border !border-gray-800 hover:!outline-amber-100  !rounded !px-3 !py-2 text-white font-semibold "
      >
        Add {text}
      </button>
    </div>
  );
};

export default PageControls;
