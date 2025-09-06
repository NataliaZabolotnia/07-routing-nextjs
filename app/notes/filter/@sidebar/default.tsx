import css from "@/app/notes/filter/@sidebar/SidebarNotes.module.css";
import { getTags } from "@/lib/api";
import Link from "next/link";

export default async function SidebarNotes() {
  const tags = await getTags();
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem} key="All">
        <Link href="/notes/filter/All" className={css.menuItem}>
          All
        </Link>
      </li>
      {tags.map((tag) => (
        <li className={css.menuItem} key={tag}>
          <Link href={`/notes/filter/${tag}`} className={css.menuItem}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
