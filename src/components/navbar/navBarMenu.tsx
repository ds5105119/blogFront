import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { clearTokens } from "@/lib/authToken";

type NavBarButtonProps = {
  anchor?: any;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const NavBarMenu: React.FC<NavBarButtonProps> = ({ anchor, children }) => {
  return (
    <Menu>
      <MenuButton>{children}</MenuButton>
      <MenuItems
        anchor={anchor}
        className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/settings">
            설정
          </a>
        </MenuItem>
        <MenuItem>
          <button onClick={clearTokens}>로그아웃임</button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default NavBarMenu;
