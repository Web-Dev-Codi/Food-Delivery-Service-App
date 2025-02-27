import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaUtensils,
  FaConciergeBell,
  FaTags,
  FaFileInvoiceDollar,
  FaTimes,
  FaBarcode,
  FaAddressCard,
  FaArrowCircleRight,
} from "react-icons/fa";

const Dashboard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Use navigate hook to navigate programmatically. In this case, to navigate outlet panel back to the dashboard
  const [isOutletOpen, setIsOutletOpen] = useState(false);
  // wrapped navItems in an array of objects and map over in ul!
  const navItems = [
    { to: "restaurants/add", icon: FaUtensils, label: "Add Restaurant" },
    { to: "add-menu", icon: FaConciergeBell, label: "Add Menu" },
    { to: "coupons", icon: FaTags, label: "Add Coupons" },
    { to: "orders", icon: FaFileInvoiceDollar, label: "Orders" },
    { to: "single-order/:id", icon: FaBarcode, label: "Order/item" },
    { to: "coupons", icon: FaAddressCard, label: "Add Cards" },
  ];

  // Grid Items Array
  const gridItems = [
    {
      color: "text-orange-600",
      label: "Orange",
      info: "I am an infos box you can add more functionalities or information here!",
      extraHeight: "h-64",
    },
    { color: "text-green-600", label: "Green", info: "Extra Info" },
    { color: "text-violet-600", label: "Violet", info: "More Extra Info" },
    { color: "text-pink-600", label: "Pink", info: "Even More Extra Info" },
    { color: "text-blue-600", label: "Blue", info: "Extra Extra Info" },
    { color: "text-amber-400", label: "Amber", info: "Edit me" },
    {
      color: "text-cyan-400",
      label: "Cyan",
      info: "I want to have some links",
    },
    { color: "text-red-700", label: "Red", info: "Edit me, too" },
    {
      color: "text-emerald-600",
      label: "Emerald",
      info: "Leave me alone",
      extraHeight: "h-40",
    }, // Extra height can be added to very grid item!
  ];

  return (
    <>
      <div className="min-h-screen flex mt-12 flex-col md:flex-row g-neutral-800/10 backdrop-blur overflow-hidden ">
        {/* Mobile Menu Btn */}
        <button
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            setIsOutletOpen(false); // Optional: Close right panel when opening mobile menu
          }}
          className="md:hidden p-3 bg-green-700 text-white fixed top-24 left-4 rounded-lg z-20"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaArrowCircleRight className="text-2xl" />
          )}
        </button>

        {/* Slide-NavBar*/}
        <nav
          className={`fixed left-0 w-full p-2 border-l border-neutral-500 transition-all duration-1000 ease-in-out bg-neutral-800/10 backdrop-blur z-10
        ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0
        md:w-20 md:p-6 md:border-l ${isHovered ? "md:w-64" : "md:w-24"}
      `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ul className="md:flex-col md:mt-4 p-1 md:space-y-4 space-x-3 md:space-x-0 min-h-screen">
            {navItems.map(({ to, icon: Icon, label }) => (
              <li
                key={to}
                className="flex items-center gap-2 transition-all duration-1000 ease-in-out bg-gradient-to-r from-white/10 via-white/5 to-white/5 backdrop-blur hover:bg-[#D84418] rounded-lg py-2 mb-2 md:mb-0"
              >
                <Link
                  to={to}
                  className="flex justify-between rounded"
                  onClick={() => {
                    setIsOutletOpen(true); // click on the link to slide in the right panel
                    setIsMobileMenuOpen(false); // Close mobile menu at the same time
                  }}
                >
                  <Icon className="text-white text-4xl" />
                  <span
                    className={`text-neutral-300 ml-4 text-lg font-medium transition-all duration-1000 transform whitespace-nowrap
          ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }
        `}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CenterContainer-Admin-Area */}
        <div className="flex-1 flex-col lg:flex-row justify-center items-start md:justify-start p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-0 bg-neutral-800/30 backdrop-blur shadow-lg">
          {/* Left Side: Admin Section */}
          <div className="min-h-screen flex-1 flex flex-col items-center justify-start space-y-6 md:mt-0 border-neutral-500 rounded-lg p-4 md:py-1 sm:p-4 w-full lg:max-w-[60%] xl:max-w-[65%]">
            {/* Admin Greeting Box*/}
            <div className="flex-col items-center justify-center w-full max-w-xl mx-auto bg-gradient-to-r from-white/5 via-white/20 to-white/5 ">
              <h1 className="text-xl p-2 sm:text-2xl font-bold text-center text-white mt-1 md:mt-3">
                Hello Admin
              </h1>
              <p className="text-neutral-300 text-center text-sm sm:text-base p-2 sm:px-4">
                Welcome to the Admin Dashboard of the Restaurant Management
                System. You can add Restaurants, Menus, Coupons, and more from
                the sidebar. Click on the menu icon to view the options. Enjoy
                your day!
              </p>
            </div>

            {/* Dynamic Grid is mapped from gridItems array */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full max-w-xl mx-auto">
              {/* props are passed to here. So set it up in the gridItems array */}
              {gridItems.map(({ color, label, info, extraHeight }, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white/5 via-white/20 to-white/5 text-white hover:bg-neutral-950 backdrop-blur font-bold rounded-md shadow-md w-full ${extraHeight}`}
                  onClick={() => {
                    {
                      /*navigate("to wherever you want to go!");*/
                    }
                    alert(`You clicked on ${label}!`);
                  }}
                >
                  <span className={`${color} p-2 text-lg`}>{label}</span>
                  <h4 className="text-neutral-300 text-center text-sm sm:text-base p-2 sm:px-4">
                    {info}
                  </h4>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex-col items-center justify-center w-full max-w-xl mx-auto bg-gradient-to-r from-white/5 via-white/20 to-white/5 ">
              <p className="text-neutral-300 text-center text-sm sm:text-base p-2 sm:px-4">
                I am some kind of a footer. You can add notes or update the
                database here, too. Use this space to add more functionalities
                or information!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Outlet (Nested Routes) */}
      <div
        className="fixed min-h-screen w-full lg:max-w-[425px] xl:max-w-[550px] right-0 top-0 md:top-8 md:right-[-1rem] transition-transform duration-1000 ease-in-out z-50"
        style={{
          transform: isOutletOpen ? "translateX(0)" : "translateX(110%)",
        }}
      >
        <button
          onClick={() => {
            setIsOutletOpen(false);
            setIsMobileMenuOpen(false); // Close mobile menu when closing the outlet panel
            navigate("/dashboard"); // navigate back to /dashboard when closing the outlet panel
          }}
          className="p-3 g-neutral-800/10 backdrop-blur shadow-lg text-white hover:text-orange-600 fixed top-6 right-4 md:top-28 md:right-14 rounded-lg z-30"
          aria-label="Close Outlet Panel"
        >
          <FaTimes className="text-2xl" />
        </button>

        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
