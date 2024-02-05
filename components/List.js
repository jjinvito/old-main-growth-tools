import { useState, useEffect } from "react";
import ListItem from "./ListItem";
import data from "@/data/data.json";

export default function List({ search }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //  fetch from /api/data endpoint
    // fetch("/api/data")
    //   .then((res) => res.json())
    //   .then((data) => {
        if (data) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      },[List]);
  // }, [search]);

  return (
    <div role="list" className="flex flex-wrap p-5">
      {products.map((item, index) => (
        <ListItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
