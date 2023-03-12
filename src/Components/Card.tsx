import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title: string;
  basisClass: string;
}

function Card({ children, title, basisClass } : CardProps ) {
  return (
    <div className={`card bg-base-200 shadow-xl ${basisClass} h-full w-full flex-grow`}>
      <div className="card-body overflow-auto">
        <h2 className="card-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Card;