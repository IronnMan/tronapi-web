import React from 'react';

interface IProps {
  onNext: () => boolean;
  onPrev: () => void;
}
const SearchResult: React.FC<IProps> = (props) => {
  return <div>searchResult</div>;
};

export default React.memo(SearchResult);
