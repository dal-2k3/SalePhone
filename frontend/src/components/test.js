// import clsx from 'clsx';
// import { useIntl } from 'react-intl';
// import React from 'react';

// const ListPagination = ({ page, setPage, pagination }) => {
    
//     console.log('pagination', pagination);
//     const intl = useIntl();

//     const prev = () => {
//         const newPage = Math.max(page - 1, 1);
//         console.log('newPage', newPage);
//         setPage(newPage);
//     };

//     const next = () => {
//         const newPage = Math.min(page + 1, pagination?.totalPages);
//         console.log('newPage', newPage);
//         setPage(newPage);
//     };

//     const jump = (pageNumber) => {
//         const newPage = Math.max(1, pageNumber);
//         console.log('newPage', newPage);
//         setPage(newPage);
//     };

//     const isActive = (index) => {
//         if (index === page) return 'active';
//         return '';
//     };

//     return (
//         <div className='row'>
//             <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
//             <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
//                 <div id='kt_table_users_paginate'>
//                     <ul className='pagination'>
//                         {pagination?.totalPages !== 0 ? (
//                             <>
//                                 <li className={clsx('page-item')}>
//                                     <a
//                                         dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: 'TABLE.PREVIOUS' }) }}
//                                         style={{ cursor: 'pointer' }}
//                                         className='page-link'
//                                         onClick={prev}
//                                     ></a>
//                                 </li>
//                                 {[...Array(pagination?.totalPages)].map((_, i) => i + 1).map((num) => (
//                                     <li key={num} className={`page-item ${isActive(num)}`}>
//                                         <a style={{ cursor: 'pointer' }} className='page-link' onClick={() => jump(num)}>
//                                             {num}
//                                         </a>
//                                     </li>
//                                 ))}
//                                 <li className={clsx('page-item')}>
//                                     <a
//                                         dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: 'TABLE.NEXT' }) }}
//                                         style={{ cursor: 'pointer' }}
//                                         className='page-link'
//                                         onClick={next}
//                                     ></a>
//                                 </li>
//                             </>
//                         ) : (
//                             <></>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export { ListPagination };
