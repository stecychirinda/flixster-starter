import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

const Pages = {
  Home: "HOME",
  Favorites: "FAVORITES",
  Watched: "WATCHED",
};

const SideBarData = [
  {
    title: "Home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
    page: Pages.Home,
  },
  {
    title: "Favorites",
    icon: <FaIcons.FaStar />,
    cName: "nav-text",
    page: Pages.Favorites,
  },
  {
    title: "Watched",
    icon: <FaIcons.FaFilm />,
    cName: "nav-text",
    page: Pages.Watched,
  },
];

export default SideBarData;
