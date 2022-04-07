import React from 'react';

interface IProps {
  onNext: () => boolean;
  onPrev: () => void;
}
const SearchTransaction: React.FC<IProps> = (props) => {
  return <div>searchTransaction</div>;
};

export default React.memo(SearchTransaction);
