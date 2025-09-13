"use client";
import ThemeToggle from "@/components/ui/ThemeToggle";
import UsageChart from "@/components/charts/UsageChart";
import UsageCard from "@/components/usage/UsageCard";
import ResourceList from "@/components/dashboard/ResourceList";
import UserList from "@/components/users/UserList";
import Tabs from "@/components/ui/Tabs";
import { UsageProvider } from "@/contexts/UsageContext";
import { ResourceProvider } from "@/contexts/ResourceContext";
import { UserProvider } from "@/contexts/UserContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <UsageProvider>
      <UserProvider>
        <ResourceProvider>
          <main className="flex flex-col items-center justify-center min-h-screen gap-6 bg-white dark:bg-gray-900 py-2 px-2 lg:p-6">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-3 lg:gap-0 w-full max-w-5xl">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Cloud Dashboard
              </h1>
              <div className="flex gap-3">
                <ThemeToggle />
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Tabs for sections */}
            <div className=" w-full min-h-[700px] max-w-[1024px]">
              <Tabs
                tabs={[
                  {
                    id: "overview",
                    label: "Overview",
                    content: (
                      <div className="flex flex-col gap-6">
                        <UsageChart />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full ">
                          <UsageCard type="database" />
                          <UsageCard type="network" />
                          <UsageCard type="storage" />
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: "resources",
                    label: "Resources",
                    content: <ResourceList />,
                  },
                  {
                    id: "users",
                    label: "Users",
                    content: <UserList />,
                  },
                ]}
              />
            </div>
          </main>
        </ResourceProvider>
      </UserProvider>
    </UsageProvider>
  );
}
