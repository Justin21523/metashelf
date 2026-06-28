import type { Resource } from "@/types/resource";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md dark:bg-zinc-900 dark:border-zinc-800">
      <div className="aspect-[2/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {resource.cover_image ? (
          <img
            src={resource.cover_image}
            alt={resource.title}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-400">
            No Cover
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
          <a href="#">
            <span aria-hidden="true" className="absolute inset-0" />
            {resource.title}
          </a>
        </h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{resource.author}</p>
        
        <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
            <span>{resource.publication_year}</span>
            <span className="rounded-full bg-zinc-100 px-2 py-1 font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {resource.call_number || "No Call #"}
            </span>
        </div>
      </div>
    </div>
  );
}
