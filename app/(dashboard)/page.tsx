import { GetFormStats } from "@/actions/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode, Suspense } from "react";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { LuView } from "react-icons/lu";
import { TbArrowBounce } from "react-icons/tb";

interface StateCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

export default function Home() {
  return (
    <main className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
    </main>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
}

function StatsCards(props: StateCardProps) {
  const { data, loading } = props;

  return (
    <div className="w-full pt-0 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        value={data?.visits.toLocaleString() || ""}
        title="Total Visits"
        icon={<LuView className="text-blue-600" />}
        helperText="All time form visits"
        loading={loading}
        className="shadow-sm shadow-blue-500"
      />

      <StatsCard
        value={data?.submissions.toLocaleString() || ""}
        title="Total Submissions"
        icon={<FaWpforms className="text-yello-600" />}
        helperText="All time form submissions"
        loading={loading}
        className="shadow-sm shadow-yellow-500"
      />

      <StatsCard
        value={data?.submissionRate.toLocaleString() || ""}
        title="Submission Rate"
        icon={<HiCursorClick className="text-green-600" />}
        helperText="Visits that result in form submissions"
        loading={loading}
        className="shadow-sm shadow-green-500"
      />

      <StatsCard
        value={data?.visits.toLocaleString() || ""}
        title="Bounce Rate"
        icon={<TbArrowBounce className="text-red-600" />}
        helperText="Visits that leaves without interacting"
        loading={loading}
        className="shadow-sm shadow-red-500"
      />
    </div>
  );
}

function StatsCard({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}: {
  title: string;
  value: string;
  icon: ReactNode;
  helperText: string;
  loading: boolean;
  className: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          ) : (
            value
          )}
        </div>
        <p className="text-sm text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
}
