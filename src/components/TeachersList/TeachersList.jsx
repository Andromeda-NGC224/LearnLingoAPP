import { useEffect, useState } from "react";
import { getTeachers } from "../../FireBase/database.js";

export const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getTeachers();
        console.log(data);
        if (data) {
          setTeachers(data);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  return <h1>TeachersList</h1>;
};
