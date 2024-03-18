import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

const getData = async (token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}cookie-to-user`,
    {
      cache: "no-store",
      headers: { auth_token: token },
    }
  );
  const outData = await data.json();
  if (outData.data.role != 1) {
    notFound();
  }
  if (outData.data.loged == -1) {
    redirect("/login");
  }
  return outData;
};

const AdminPannel = async () => {
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth_token")
    ? cookieStore.get("auth_token").value
    : "";

  const data = await getData(authToken);

  return <div>admin pannel</div>;
};

export default AdminPannel;
