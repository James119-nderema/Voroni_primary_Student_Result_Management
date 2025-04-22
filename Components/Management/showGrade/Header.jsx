import React from 'react';
import HeaderControls from './HeaderControls';

const Header = (props) => {
  return (
    <div className="mb-6">
      <HeaderControls {...props} />
    </div>
  );
};

export default Header;
