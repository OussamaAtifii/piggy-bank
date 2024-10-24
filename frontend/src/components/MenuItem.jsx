const MenuItem = ({ icon: Icon, title }) => {
  return (
    <a
      className={`p-2 hover:bg-[#425c77] rounded-xl transition duration-300 flex items-center gap-2 hover:cursor-pointer ${
        title === 'PiggyBanks' ? 'bg-[#425c77]' : ''
      }`}
    >
      <Icon className="size-6" />
      <span>{title}</span>
    </a>
  );
};

export default MenuItem;
