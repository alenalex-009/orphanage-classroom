import { notFound } from "next/navigation";
import { getLiveSessionData } from "@/actions/gamification";
import { LiveSessionRoom } from "@/components/live-session-room";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LiveSessionPage({ params }: Props) {
  const { id } = await params;

  const session = await getLiveSessionData(id);
  if (!session) notFound();

  return (
    <LiveSessionRoom
      session={session}
      students={session.class.students}
      teams={session.teams}
      initialEvents={session.activityEvents}
    />
  );
}
