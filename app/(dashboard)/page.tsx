import { GetFormStats } from "@/actions/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";
import { LuView } from "react-icons/lu";

interface StateCardProps {
  data: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

export default function Home() {
  return (
    <main className="container pt-4">
      <CardStatsWrapper />
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
        value=""
        title="Total Visits"
        icon={<LuView className="text-blue-600" />}
        helperText={data?.visits?.toLocaleString()}
        loading={loading}
        className="shadow-md shadow-blue-500"
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
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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
      </CardContent>
    </Card>
  );
}
