import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("UserLoggedIn") === "true") {
      const userId = localStorage.getItem("UserID");
      const userRole = localStorage.getItem("Userrole");
      const getConversations = async () => {
        setLoading(true);
        try {
          const res = await fetch(
            `http://localhost:8000/api/sidebarUsers/${userId}/${userRole}`
          );
          const data = await res.json();
          console.log("data", data);
          if (data.error) {
            throw new Error(data.error);
          }
          setConversations(data);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      };
      getConversations();
    } else if (localStorage.getItem("NutritionistLoggedIn") === "true") {
      const userId = localStorage.getItem("NutritionistID");
      const userrole = localStorage.getItem("Nutritionistrole");
      const getConversations = async () => {
        setLoading(true);
        try {
          const res = await fetch(
            `http://localhost:8000/sidebar-users/:${userId}/:${userrole}`
          );
          const data = await res.json();
          if (data.error) {
            throw new Error(data.error);
          }
          setConversations(data.user);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      };
      getConversations(); // This call was misplaced, moving it here
    }
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
