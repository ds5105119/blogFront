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
        transition
        anchor="bottom start"
        className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            Edit
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
              ⌘E
            </kbd>
          </button>
        </MenuItem>
        <MenuItem>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            Duplicate
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
              ⌘D
            </kbd>
          </button>
        </MenuItem>
        <div className="my-1 h-px bg-white/5" />
        <MenuItem>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            Archive
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
              ⌘A
            </kbd>
          </button>
        </MenuItem>
        <MenuItem>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            Delete
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
              ⌘D
            </kbd>
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default NavBarMenu;
