import React from 'react';

const StudentPagination = ({ totalStudents, studentsPerPage, setCurrentPage }) => {
  const pageNumbers = [];

  // Calculate total page numbers
  for (let i = 1; i <= Math.ceil(totalStudents / studentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <button onClick={() => setCurrentPage(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default StudentPagination;
