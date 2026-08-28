import { getServerSession } from "next-auth";
import { authOptions } from "@/helpers/authOptions";
import Orders from "@/components/auth/Orders";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const payload = session?.accessToken
    ? JSON.parse(
        Buffer.from(session.accessToken.split(".")[1], "base64").toString()
      )
    : null;

console.log("TOKEN PAYLOAD:", payload);

  return (
    <div className="flex items-center justify-center h-screen px-6">
      <Orders userId={payload?.id} />
    </div>
  );
}
