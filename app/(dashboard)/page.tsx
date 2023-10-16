import { GetFormStats, GetForms } from "@/actions/form";
import CreateFormButton from "@/components/CreateFormButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Form } from "@prisma/client";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { ReactNode, Suspense } from "react";
import { FaWpforms, FaEdit } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { LuView } from "react-icons/lu";
import { TbArrowBounce } from "react-icons/tb";
import { BiRightArrowAlt } from "react-icons/bi";

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
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
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
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        title="Submission Rate"
        icon={<HiCursorClick className="text-green-600" />}
        helperText="Visits that result in form submissions"
        loading={loading}
        className="shadow-sm shadow-green-500"
      />

      <StatsCard
        value={data?.visits.toLocaleString() + "%" || ""}
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
    <Card
      className={`hover:transform hover:scale-105 hover:cursor-pointer scale-100 transition-transform duration-300 ${className}`}
    >
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

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary/20 h-[190px] w-full" />;
}

async function FormCards() {
  const forms = await GetForms();
  return (
    <>
      {forms?.map((f) => (
        <FormCard key={f.id} form={f} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.published ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant="destructive">Draft</Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}

          {form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span className="">{form.visits.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground" />
              <span className="">{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No Description"}
      </CardContent>

      <CardFooter>
        {form.published ? (
          <Button
            className="w-full mt-2 text-md gap-2 hover:gap-3 transition-all"
            asChild
          >
            <Link href={`/forms/${form.id}`}>
              View Form <BiRightArrowAlt />
            </Link>
          </Button>
        ) : (
          <Button
            variant="secondary"
            className="w-full mt-2 text-md gap-2"
            asChild
          >
            <Link href={`/builder/${form.id}`}>
              Edit Form <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
