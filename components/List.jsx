import { useState, useEffect } from "react";
import ListItem from "./ListItem";
import data from "@/data/data.json";
import { useSelector } from "react-redux";

export default function List({ search }) {
  const [products, setProducts] = useState([]);

  const toolsData = useSelector((state) => state?.tools?.items);
  const toolsDataStatus = useSelector((state) => state?.tools?.status);
  const toolsDataError = useSelector((state) => state?.tools?.error);

  useEffect(() => {
    if (toolsData) {
      setProducts(data);
    } else {
      setProducts([]);
    }
  }, [List]);
  // }, [search]);

  return (
    <div role="list" className="flex flex-wrap p-5">
      {products.map((item, index) => (
        <ListItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
