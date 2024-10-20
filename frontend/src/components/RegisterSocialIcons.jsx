export default function RegisterSocialIcons({ icon: Icon, href }) {
  return (
    <a
      href={href}
      className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 transition-colors duration-300 shadow-lg group hover:shadow-xl"
    >
      <Icon className="text-gray-500 group-hover:text-white w-6 h-6 transition-transform duration-500 group-hover:scale-110" />
    </a>
  );
}
