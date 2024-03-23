import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AccountVerifyForms from "@/components/accountVerifyForm";

const getData = async (token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}cookie-to-user`,
    {
      cache: "no-store",
      headers: { auth_token: token },
    }
  );
  const outData = await data.json();
  if (outData.data.loged == -1) {
    redirect("/login");
  }
  return outData;
};

const getUserData = async (token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}get-one-user`,
    {
      cache: "no-store",
      headers: { auth_token: token },
    }
  );
  return data.json();
};

const Account = async () => {
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth_token")
    ? cookieStore.get("auth_token").value
    : "";

  const data = await getData(authToken);
  const userFullData = await getUserData(authToken);

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <div className="text-xl font-bold">My account page</div>
      <div className="flex flex-wrap gap-2">
        <div className="bg-zinc-100 rounded p-2">
          User ID: {userFullData.data._id}
        </div>
        <div className="bg-zinc-100 rounded p-2">
          User username: {userFullData.data.username}
        </div>
        <div className="bg-zinc-100 rounded p-2">
          User displayname: {userFullData.data.displayname}
        </div>
        <div className="bg-zinc-100 rounded p-2">
          User email: {userFullData.data.email}
        </div>
        <div className="bg-zinc-100 rounded p-2">
          User phone: {userFullData.data.phone}
        </div>
        <div className="bg-zinc-100 rounded p-2">
          User joinedat: {userFullData.data.joinedAt}
        </div>
      </div>
      <AccountVerifyForms />
    </div>
  );
};

export default Account;
