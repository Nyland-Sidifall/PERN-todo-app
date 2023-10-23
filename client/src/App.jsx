import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [tasks, setTasks] = useState(null);

  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  const getData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/todos/${userEmail}`
      );
      const jsonRes = await response.json();
      setTasks(jsonRes);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="bg-white shadow-xl rounded-xl p-4 w-full mt-4">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={" 🏝️ Holiday Tick List!"} getData={getData} />
          <p className=" float-right text-sm m-3 text-slate-500">
            {" "}
            Welcome Back {userEmail}
          </p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
      <p className=" m-3 text-slate-500">AdVentures LLC</p>
    </div>
  );
};

export default App;
