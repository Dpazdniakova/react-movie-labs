import { useState, useEffect } from "react";

const no_filters = {
  title: undefined,
  genre: undefined,
  year: undefined,
  minRating: undefined,
  sortBy: undefined,
};

// copy of useFilters for each page
const useFilters = () => {
  const [filters, setFilters] = useState(no_filters);
  const [debouncedTitle, setDebouncedTitle] = useState(undefined);

  // Each keystroke cancels the previous timer, so the title only settles once
  // typing pauses — one search request per pause rather than one per character.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTitle(filters.title), 400);
    return () => clearTimeout(timer);
  }, [filters.title]);

  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value === "" ? undefined : value, // if the value is empty change it back to undefined to avoid double caching
    }));
  };

  const reset = () => {
    setFilters(no_filters);
    setDebouncedTitle(undefined); // clear now rather than after the debounce
  };

  return { filters, debouncedTitle, handleChange, reset };
};

export default useFilters;
