import React, { useEffect } from 'react';

export default function Header({ title, subtitle }) {
  useEffect(() => document.title = title);

  return (
    <header>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </header>
  );
}
