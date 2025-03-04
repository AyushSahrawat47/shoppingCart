// src/App.tsx
import React from 'react';
import Challenge from './components/Challange';

const App: React.FC = () => {
  return (
    <div className="p-4">
      <Challenge numDomainsRequired={5} />
    </div>
  );
};

export default App;