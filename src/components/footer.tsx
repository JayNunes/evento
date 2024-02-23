import Link from "next/link";

const routes = [
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms of Service", path: "/terms-conditions" },
];

export default function Footer() {
  return (
    <footer className="flex items-center justify-between mt-auto h-16 border-white/50 px-3 sm:px-9 text-xs text-white/25 ">
      <small className="text-xs">
        &copy; 2024 Jay Nunes. All rights reserved.
      </small>

      <ul className="flex gap-x-3 sm:gap-x-8 ">
        {routes.map((route) => (
          <li className="hover:text-white/75" key={route.path}>
            <Link href={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
