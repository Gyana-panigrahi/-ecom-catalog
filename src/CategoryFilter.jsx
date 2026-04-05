const CategoryFilter = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <select 
      className="form-control"
      value={selectedCategory || ""}
      onChange={(e) => onCategorySelect(e.target.value)}
    >
      <option value="">All Categories</option>

      {categories.map(cat => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;