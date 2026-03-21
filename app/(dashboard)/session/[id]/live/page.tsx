import { notFound } from "next/navigation";
import { getLiveSessionData } from "@/actions/gamification";
import { LiveSessionRoom } from "@/components/live-session-room";

interface Props {
  params: { id: string };
}

export default async function LiveSessionPage({ params }: Props) {
  const session = await getLiveSessionData(params.id);
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
