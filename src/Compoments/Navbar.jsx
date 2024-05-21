import React,{Fragment,useState} from 'react'
import logo from '../element/logo3.jpg'
import { FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
import { Link, useLocation } from 'react-router-dom';
import user from '../element/boy.jpg'


export default function Navbar({onSearch}) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  // Check if the current route is /dashboard
  const isDashboard = location.pathname === '/dashboard';

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    // Trigger search whenever input changes
    onSearch(searchTerm); // Pass the search term to the parent component
  };

  const handleSearchButtonClick = () => {
    onSearch(searchTerm); // Pass the search term to the parent component
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/", { replace: true });
    toast.success("Log Out Succesfully👍");
  };
  
  return (
    <div className='w-screen  min-w-screen-sm text-black font-serif'>
      <div className=' m-2 flex flex-row justify-between gap-5 items-center p-3 rounded-md'>
        <div className='flex flex-row items-center gap-5'>
          <div>
          <Link to="/dashboard">
        <img className="h-16 rounded-lg" src={logo} alt="Logo" />
        </Link>
          </div>
          <div className=''>
          <h1 class="lg:text-2xl md:text-xl bg-gradient-to-r font-extrabold from-cyan-950 to-cyan-600 text-transparent bg-clip-text ">ARPAN MULTISPECIALIST HOSPITAL</h1>
          </div>
        </div>
        <div className=" flex flex-row gap-5 items-center">
          <div className='relative'>
        {isDashboard && (
 <>        <input
              type="text"
              placeholder="Search Patient"
              className="block w-full  px-4 py-2 rounded-md border border-gray-300 text-black shadow-sm focus:outline-none focus:border-blue-400"
              value={searchTerm}
              name="search"
              onChange={handleChange}
            />
            <button className="absolute inset-y-0 right-0 p-2 bg-cyan-950 text-white rounded-md hover:bg-cyan-800 focus:outline-none" onClick={handleSearchButtonClick}>
            <FaSearch />
            </button>
            </>)}
          </div>
          <div className='text-cyan-900 flex flex-row pt-2 ustify-center items-center text-center'>
          <Menu as="div">
                     <Menu.Button>
                       <TiThMenu className='text-2xl'/>
                     </Menu.Button>
                     <Transition
                       as={Fragment}
                       enter="transition ease-out duration-100"
                       enterFrom="transform opacity-0 scale-95"
                       enterTo="transform opacity-100 scale-100"
                       leave="transition ease-in duration-75"
                       leaveFrom="transform opacity-100 scale-100"
                       leaveTo="transform opacity-0 scale-95"
                     >
                       <Menu.Items className="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-auto">    
                         <Menu.Item>
                           {({ active }) => (
                             <button
                               className={`${
                                 active
                                   ? "bg-blue-900 text-white"
                                   : "text-gray-900"
                               } group  w-[170px] flex flex-row justify-center rounded-md px-2 py-1 font-serif`}
                               onClick={() => {
                                 navigate("/report");
                               }}
                             >
                               Report
                             </button>
                           )}
                         </Menu.Item>
                        
                         <Menu.Item>
                           {({ active }) => (
                             <button
                               className={`${
                                 active
                                   ? "bg-red-900 text-white"
                                   : "text-gray-900"
                               } group w-[170px] flex flex-row justify-center  rounded-md px-2 py-1 font-serif`}
                               onClick={() => {
                                 handleLogout()
                               }}
                             >
                               Log out
                             </button>
                           )}
                         </Menu.Item>
                         
                        
                       </Menu.Items>
                     </Transition>
                   </Menu>
          </div>
          <div>
            <img className='w-8 h-8 rounded-full' src={user} alt="" srcset="" />
          </div>
    </div>
      </div>
    </div>
  )
}
