import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, removePost, setPage } from '../redux/postsSlice';
import img from "../assets/img1.jpg";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";



const PostList = () => {
    
        const dispatch = useDispatch();
        const posts = useSelector((state) => state.posts.items);
        const status = useSelector((state) => state.posts.status);
        const error = useSelector((state) => state.posts.error);
        const currentPage = useSelector((state) => state.posts.currentPage);
        const postsPerPage = useSelector((state) => state.posts.postsPerPage);
      
        useEffect(() => 
            { if (status === 'idle') {
             for(let i=0;i<5;i++){
                setTimeout(()=>{
                    dispatch(fetchPosts());
                   },5000)
               }
            }
        }, [status, dispatch]);
      
        const handleRemovePost = (id) => {
          dispatch(removePost(id));
        };
      
        const handlePageChange = (page) => {
          dispatch(setPage(page));
        };
      
        const startIndex = (currentPage - 1) * postsPerPage;
        const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);
        const totalPages = Math.ceil(posts.length / postsPerPage);
      
        const renderPageNumbers = () => {
          let startPage = Math.max(1, currentPage - 1);
          let endPage = Math.min(totalPages, currentPage + 2);
      
          const pages = [];
          for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
          }
      
          return pages;
        };
      
        if (status === 'loading') {
          return <div className="text-center text-xl">Loading...</div>;
        }
      
        if (status === 'failed') {
          return <div className="text-center text-xl text-red-600">Error: {error}</div>;
        }
      
        return (
          <div className="container  mx-auto p-4 bg-slate-200 ">
            
            {/* card  */}
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white-100 text-black-400 ">
              {currentPosts.map((post) => (
                <div key={post.id} className="border p-4 rounded shadow bg-white mb-4 ">
                  <button
                    onClick={() => handleRemovePost(post.id)}
                    className="text-red-600 float-right"
                  >
                    &#10060;
                  </button>
                  <h2 className="lg:text-xl font-bold normal-case ... sm:font-semibold sm:text-xl" >{post.title.slice(0,60)}...</h2>
                  <p>{post.body.slice(0,40)}...</p>
                  <p className='text-gray-400 font-semibold mt-2 mb-2'>Mon, 25 Dec 2024 20:10 GMT</p>
                  <div className='max-w-full h-auto'>
                    <img src={img} alt="not found" className='object-cover object-center rounded shadow-md '/>
                  </div>
                </div>
              ))}
            </div>

              {/* Pagination code  */}

            <div className="flex justify-center mt-4">
              {currentPage > 1 && (
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="mx-1 px-3 py-3 border rounded-3xl bg-gray-300"
                >
                  <GrFormPrevious />
                </button>
              )}
              {renderPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`mx-1 px-3 py-2 border rounded-3xl ${
                    currentPage === page ? 'bg-gray-100 text-gray-400 font-semibold' : 'bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
              {currentPage < totalPages && (
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="mx-1 px-3 py-3 border rounded-3xl bg-gray-300"
                >
                  <MdNavigateNext />

                </button>
              )}
            </div>
          </div>
        );
      };
export default PostList;
