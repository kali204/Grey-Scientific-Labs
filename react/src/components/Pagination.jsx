import React from 'react';

export default function Pagination({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  onPageChange 
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Don't show anything if there's only one page
  if (totalPages <= 1) return null;

  // Logic to show a subset of page numbers (e.g., [1, 2, 3])
  const getPageNumbers = () => {
    const pages = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage < maxVisibleButtons - 1) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav className="pagination-container" aria-label="Pagination Navigation">
      <div className="pagination-info">
        Showing Page <strong>{currentPage}</strong> of {totalPages}
      </div>
      
      <div className="pagination-controls">
        {/* Previous Button */}
        <button
          className="page-btn prev-next"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous Page"
        >
          &larr; <span className="hide-mobile">Prev</span>
        </button>

        {/* Numbered Buttons */}
        <div className="page-numbers">
          {getPageNumbers().map((number) => (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={`page-btn ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          className="page-btn prev-next"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next Page"
        >
          <span className="hide-mobile">Next</span> &rarr;
        </button>
      </div>
    </nav>
  );
}