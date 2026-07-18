import SearchBar from "./SearchBar";
import Notification from "./Notification";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">
      <SearchBar />

      <div className="flex items-center gap-6">
        <Notification />
        <UserMenu />
      </div>
    </header>
  );
};

export default Navbar;