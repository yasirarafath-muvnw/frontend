import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Home,
  Users,
  User,
  Book,
  Settings,
  LogOut,
  UserCircle,
} from "lucide-react";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: Home,
        label: "Dasboard",
        href: "/dashboard",
        visible: ["admin", "teacher"],
      },
      {
        icon: User,
        label: "Task",
        href: "/dashboard/task",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: Book,
        label: "Project",
        href: "/dashboard/project",
        visible: ["admin", "teacher"],
      },

      //   {
      //     icon: User,
      //     label: "Parents",
      //     href: "/list/parents",
      //     visible: ["admin", "teacher"],
      //   },
      //   {
      //     icon: Book,
      //     label: "Subjects",
      //     href: "/list/subjects",
      //     visible: ["admin"],
      //   },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: UserCircle,
        label: "Profile",
        href: "/dashboard/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      //   {
      //     icon: Settings,
      //     label: "Settings",
      //     href: "/settings",
      //     visible: ["admin", "teacher", "student", "parent"],
      //   },
      {
        icon: LogOut,
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

export default function Menue({ triggerLogoutModal }) {
  return (
    <div>
      {menuItems.map((section, sectionIdx) => (
        <div key={sectionIdx} className="mb-4 justify-between p-3">
          <span className="block text-sm font-semibold mb-2 text-black">
            {section.title}
          </span>
          {section.items.map((item, itemIdx) => {
            const Icon = item.icon;
            const isLogout = item.label.toLowerCase() === "logout";

            return isLogout ? (
              <button
                key={itemIdx}
                onClick={triggerLogoutModal}
                className="flex items-center gap-2 py-2 hover:text-amber-500 justify-center lg:justify-start w-full text-left"
              >
                <Icon size={20} color="black" />
                <span className="text-black hidden lg:block">{item.label}</span>
              </button>
            ) : (
              <Link
                href={item.href}
                key={itemIdx}
                className="flex items-center gap-2 py-2 hover:text-amber-500 justify-center lg:justify-start"
              >
                <Icon size={20} color="black" />
                <span className="text-black hidden lg:block">{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
