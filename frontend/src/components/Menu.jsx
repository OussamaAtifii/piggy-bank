import SearchIcon from '../icons/Search';
import HomeIcon from '../icons/Home';
import SettingsIcon from '../icons/Settings';
import GroupIcon from '../icons/Group';

const Menu = () => {
  return (
    <aside className="py-10 px-4 h-full border-r-2 border-black flex flex-col justify-between gap-4 transition-all duration-300">
      <div className="flex flex-col gap-4">
        <button className="p-2 hover:bg-primary-400 rounded-2xl transition duration-300">
          <SearchIcon className="size-7" />
        </button>
        <button className="p-2 hover:bg-primary-400 rounded-2xl transition duration-300">
          <HomeIcon className="size-7" />
        </button>

        <button className="p-2 hover:bg-primary-400 rounded-2xl transition duration-300">
          <GroupIcon className="size-7" />
        </button>
      </div>

      <div className="flex flex-col gap-4 ">
        <button className="p-2 bg-primary-300 hover:bg-primary-400 rounded-2xl transition duration-300">
          <SettingsIcon className="size-7" />
        </button>
      </div>
    </aside>
  );
};

export default Menu;
