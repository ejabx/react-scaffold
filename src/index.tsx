import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';

const Root: React.FC = () => {
  return (
    <>
      <App/>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Root />);