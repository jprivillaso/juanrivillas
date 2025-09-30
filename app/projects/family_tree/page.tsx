"use client";
import { useState, useEffect } from "react";
import { MessageCircle, Eye } from "lucide-react";
import { Navigation } from "../../components/Nav";
import { FamilyGraph } from "../../components/FamilyGraph";
import { AISidebar } from "../../components/AISidebar";
import { ReportView } from "./view";

interface FamilyMember {
  name: string;
  children: string[];
  birth_date: string;
  biography?: string;
  location?: string;
  occupation?: string;
  spouse?: string | null;
}

interface FamilyTreeData {
  data: {
    family_members: FamilyMember[];
    total_members: number;
  };
  success: boolean;
}

async function fetchFamilyMembers(): Promise<FamilyTreeData> {
  try {
    // Use our secure server-side API route instead of calling external API directly
    const response = await fetch("/api/family-members", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Authentication failed. Please check your credentials.");
      } else if (response.status === 404) {
        throw new Error("Family members API endpoint not found.");
      } else {
        throw new Error(
          `Failed to fetch family members: ${response.status} ${response.statusText}`,
        );
      }
    }

    const data = await response.json();

    // Validate the response structure
    if (!data || !data.data || !Array.isArray(data.data.family_members)) {
      throw new Error("Invalid response format from family members API");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error: Unable to fetch family members");
  }
}

export default function FamilyTreePage() {
  const [familyData, setFamilyData] = useState<FamilyTreeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [views, setViews] = useState<number | null>(null);

  const loadFamilyData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchFamilyMembers();
      setFamilyData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load family data");
      console.error("Error fetching family data:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadViewCount = async () => {
    try {
      const response = await fetch("/api/views?slug=family_tree");
      if (response.ok) {
        const data = await response.json();
        setViews(data.views);
      }
    } catch (err) {
      console.error("Error fetching view count:", err);
    }
  };

  useEffect(() => {
    loadFamilyData();
    loadViewCount();
  }, []);

  return (
    <div className="relative pb-16">
      <Navigation />

      {/* AI Chat Button */}
      <button
        type="button"
        onClick={() => setIsSidebarOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-colors z-30 group"
        title="Ask AI about family tree"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-zinc-800 text-zinc-100 px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Ask AI about family tree
        </span>
      </button>

      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Family Tree
          </h1>
          <p className="mt-4 text-zinc-400">
            Interactive visualization of my family tree. Click on any member to learn more about
            them.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid gap-8">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="text-zinc-400 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-400 mx-auto mb-4" />
                Loading family tree...
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
              <h3 className="text-red-400 font-semibold mb-2">Error Loading Family Tree</h3>
              <p className="text-red-300 text-sm">{error}</p>
              <button
                type="button"
                onClick={loadFamilyData}
                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition-colors"
                disabled={loading}
              >
                {loading ? "Retrying..." : "Retry"}
              </button>
            </div>
          )}

          {familyData && !loading && !error && (
            <>
              {views !== null && (
                <div className="flex items-center text-zinc-400 text-sm mb-4">
                  <Eye className="w-4 h-4 mr-2" />
                  <span>{views.toLocaleString()} visits</span>
                </div>
              )}
              <FamilyGraph data={familyData} />
            </>
          )}
        </div>
      </div>

      {/* AI Sidebar */}
      <AISidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Report View for Analytics */}
      <ReportView />
    </div>
  );
}
