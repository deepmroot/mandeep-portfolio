import React from 'react';
import { renderToString } from 'react-dom/server';
import Portfolio from './appart-theme/Portfolio.jsx';

// The same tree is hydrated by src/main.jsx. Keep first-render state identical
// between Node and the browser; browser-only state belongs in effects.
export function render() {
  return renderToString(<Portfolio />);
}
