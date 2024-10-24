import HomeIcon from '../icons/Home';
import SettingsIcon from '../icons/Settings';
import GroupIcon from '../icons/Group';
import MenuItem from './MenuItem';
import PiggyBank from '../icons/PiggyBank';
import Tag from '../icons/Tag';
import Chart from '../icons/Chart';
import Target from '../icons/Target';

const Menu = () => {
  const menuItems = [
    {
      icon: HomeIcon,
      title: 'Home',
    },
    {
      icon: PiggyBank,
      title: 'PiggyBanks',
    },
    {
      icon: GroupIcon,
      title: 'Groups',
    },
    {
      icon: Tag,
      title: 'Tags',
    },
    {
      icon: Target,
      title: 'Goals',
    },
    {
      icon: Chart,
      title: 'Dashboard',
    },
  ];

  return (
    <aside className="w-72 py-6 px-4 h-full border-r-2 border-black flex flex-col justify-between gap-4 transition-all duration-300 bg-[#2d3e50] text-gray-100">
      <div className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <MenuItem key={index} icon={item.icon} title={item.title} />
        ))}
      </div>

      <div className="flex flex-col gap-4 ">
        <MenuItem icon={SettingsIcon} title="Settings" />
      </div>
    </aside>
  );
};

export default Menu;
