import { createSignal, createEffect } from 'solid-js';
import SearchBar from './SearchBar';
import ResultSet from './ResultSet';
import FilteredList from './FilteredList';
import computeFilteredList from './computeFilteredList';

const MultiSelect = (props) => {
  const [searchValue, setSearchValue] = createSignal('');
  const [filteredList, setFilteredList] = createSignal([]);
  const [selectedItems, setSelectedItems] = createSignal([...props.selectedItems]);

  createEffect(() => {
    const currentQuery = searchValue() || props.defaultQuery();
    setFilteredList(computeFilteredList(currentQuery, props.availableItems, props.compare, props.itemCount, selectedItems(), props.defaultQuery()));
  });

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const updatedItems = [filteredList()[0], ...selectedItems()];
      setSelectedItems(updatedItems);
    }
  };

  const handleFilterListItemClick = (item) => {
    const updatedItems = [item, ...selectedItems()];
    setSelectedItems(updatedItems);
  };

  const handleResultSetItemClick = (item) => {
    const updatedItems = selectedItems().filter(selectedItem => selectedItem !== item);
    setSelectedItems(updatedItems);
  };

  return (
    <div class="w-full bg-emphasize text-emphasize p-2 rounded border border-border">
      <ResultSet items={selectedItems()} onItemClick={handleResultSetItemClick} emptyMessage="Attention is empty." />
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} onKeyPress={handleKeyPress} />
      <FilteredList items={filteredList()} onItemClick={handleFilterListItemClick} />
    </div>
  );
};

export default MultiSelect;
