import React from "react";

interface FilterProductProps {
  locations: string[];
  types: string[];
  beds: number[];
  prices: {
    min: number;
    max: number;
    options: number[];
  };
  filterParams: {
    location: string;
    type: string;
    minPrice: string;
    maxPrice: string;
    bed: string;
  };
  setFilterParams: React.Dispatch<
    React.SetStateAction<{
      location: string;
      type: string;
      minPrice: string;
      maxPrice: string;
      bed: string;
    }>
  >;
  onFilter: () => void;
  onRemoveFilters: () => void;
  filtersApplied: boolean;
}

const FilterProduct: React.FC<FilterProductProps> = ({
  locations,
  types,
  beds,
  filterParams,
  setFilterParams,
  onFilter,
  onRemoveFilters,
  filtersApplied,
}) => {
  const filterInputFields = [
    {
      label: "Location",
      id: "location",
      name: "location",
      type: "select",
      options: locations,
      placeholder: "All Locations",
    },
    {
      label: "Type",
      id: "type",
      name: "type",
      type: "select",
      options: types,
      placeholder: "All Types",
    },
    {
      label: "Bedrooms",
      id: "bed",
      name: "bed",
      type: "select",
      options: beds,
      placeholder: "Any",
    },
    {
      label: "Min Price",
      id: "minPrice",
      name: "minPrice",
      type: "input",
      placeholder: "Min Price",
    },
    {
      label: "Max Price",
      id: "maxPrice",
      name: "maxPrice",
      type: "input",
      placeholder: "Max Price",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilterParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="grid md:grid-cols-5 grid-cols-2 gap-3">
        {filterInputFields.map((field, index) => (
          <div className="w-full space-y-1" key={index}>
            <label htmlFor={field.id}>{field.label}: </label>
            {field.type === "select" && field.options ? (
              <select
                id={field.id}
                name={field.name}
                value={(filterParams as any)[field.name]}
                onChange={handleChange}
                className="w-full border-2 rounded-sm h-8 px-2 cursor-pointer"
              >
                <option value="">{field.placeholder}</option>
                {field.options.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.id}
                name={field.name}
                type="number"
                value={(filterParams as any)[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full  border-2 rounded-sm h-8 px-2"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FilterProduct;
