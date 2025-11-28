import React from "react";
import { Link, NavLink } from "react-router-dom";

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400">
    <path
      d="M9 6l6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type RowProps = {
  to: string;
  label: string;
  danger?: boolean;
  divider?: boolean;
};

const Row: React.FC<RowProps> = ({ to, label, danger, divider }) => (
  <>
    <Link
      to={to}
      className={`flex items-center justify-between px-6 py-5 transition-colors
        ${danger ? "text-red-500 hover:bg-red-50" : "text-[#0A0F1C] hover:bg-gray-50"}`}
    >
      <span className="text-sm sm:text-base font-medium">{label}</span>
      <ChevronRight />
    </Link>
    {divider && <div className="h-px bg-gray-200 mx-6" />}
  </>
);

const AccountPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b1226]">
      <div
        className="h-40 sm:h-56 w-full bg-center bg-cover"
        style={{
          backgroundImage:
            "url('/images/backgrounds/piltover.jpg')",
        }}
      />

      <div className="relative max-w-3xl mx-auto -mt-14 sm:-mt-16 px-4 pb-12">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#071126] ring-4 ring-white shadow-lg mx-auto flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-14 h-14 text-white/90">
            <path
              d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"
              fill="currentColor"
            />
          </svg>
        </div>


        <div className="mt-6 bg-white rounded-2xl shadow-xl overflow-hidden">
        
          <div className="px-6 py-5 bg-black text-white text-lg sm:text-xl font-semibold">
            Account
          </div>

        
          <nav className="divide-y divide-gray-200">
            <Row to="/profile" label="Profile" divider />
            <Row to="/ReviewWindow" label="Reviews" divider />
            <Row to="/chats" label="Chats" divider />
            <Row to="/productform" label="Add Product" divider />
            <Row to="/productedit" label="Edit Product" divider />
            <Row to="/logout" label="Log out" danger />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;