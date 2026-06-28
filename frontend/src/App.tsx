import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { Resource } from "@/types/resource";
import { ResourceCard } from "@/features/catalog/components/ResourceCard";

// Initialize Query Client
const queryClient = new QueryClient();

// Fetcher function
const fetchResources = async () => {
  const { data } = await api.get<Resource[]>("/resources/");
  return data;
};

function Catalog() {
  const { data: resources, isLoading, error } = useQuery({
    queryKey: ["resources"],
    queryFn: fetchResources,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error loading resources: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="sticky top-0 z-10 border-b bg-white/80 px-4 py-4 backdrop-blur-md dark:bg-zinc-900/80 dark:border-zinc-800">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            MetaShelf
          </h1>
          {/* Placeholder for Search Bar */}
          <div className="hidden w-1/3 md:block">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search catalog..." 
                    className="w-full rounded-md border border-zinc-200 bg-zinc-100 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-zinc-800 dark:bg-zinc-800"
                />
            </div>
          </div>
          <nav className="flex gap-4 text-sm font-medium">
            <a href="#" className="hover:text-primary">Discover</a>
            <a href="#" className="hover:text-primary">My Lists</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">New Arrivals</h2>
          <p className="text-sm text-zinc-500">Explore the latest additions to our collection.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {resources?.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Catalog />
    </QueryClientProvider>
  );
}

export default App;