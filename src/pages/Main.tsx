import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Main = () => {
  const fetchTodos = async () => {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    return data;
  };

  const { data: todos } = useQuery({
    queryKey: ["todo", 1],
    queryFn: fetchTodos,
    staleTime: 1000 * 5,
  });

  return (
    <div className=" mt-10">
      <h1>메인페이지입니다. 상단에 페이지로 이동하는 버튼이 있습니다.</h1>
      <p className="mt-5">{todos?.title}</p>
    </div>
  );
};

export default Main;
