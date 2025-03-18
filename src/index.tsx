import React from 'react';
import ReactDOM from 'react-dom/client';
import { Counter } from './counter';
import { MorgageCalculator } from './morgage';
import { ShoppingList } from './shopping';

const App: React.FC = () => {
  return (
    <>
      <ShoppingList/>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);