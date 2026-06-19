import Link from "next/link";

const tabs = [
  { label: "All", value: undefined },
  { label: "Active", value: "active" },
  { label: "Resolved", value: "resolved" },
] as const;

export function StatusFilterTabs({ current }: { current?: string }) {
  return (
    <div className="flex gap-1 rounded-lg bg-neutral-100 p-1 text-sm">
      {tabs.map((tab) => {
        const isActive = current === tab.value;
        const href = tab.value ? `/tickets?status=${tab.value}` : "/tickets";
        return (
          <Link
            key={tab.label}
            href={href}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
              isActive ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
