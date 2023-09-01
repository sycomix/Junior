const getComparison = () => {
  return (item, filter) => {
    // GOAL OF THE CHANGE: Split the filter into words
    const filterWords = filter.split(/\s+/).map(word => word.toLowerCase());

    // GOAL OF THE CHANGE: Convert the item to lowercase for case-insensitive comparison
    const lowercasedItem = item.toLowerCase();

    // GOAL OF THE CHANGE: Check if any word from the filter is included in the item
    return filterWords.some(word => lowercasedItem.includes(word));
  };
};

export default getComparison;
