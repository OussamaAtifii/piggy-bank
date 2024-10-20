import Menu from "./components/Menu"
import BellIcon from "./icons/Bell"
import MoonIcon from "./icons/Moon"
import SearchIcon from "./icons/Search"

function Home() {
  return (
    <div className="flex  w-screen h-screen">
      <Menu />
      <div className="w-full px-10">
        <header className="flex justify-between py-5">
          <h3 className="text-4xl font-semibold">Home</h3>

          <form className="w-2/5">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchIcon className="size-6" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder=""
                required
              />
            </div>
          </form>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MoonIcon className="size-6" />
              <BellIcon className="size-6" />
            </div>

            <div className="flex gap-1 items-center">
              <p>bydeadxd</p>
              <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg
                  className="absolute w-12 h-12 text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}

export default Home
