import { useEffect, useMemo, useState } from "react";
import { Card } from "./components/Card";
import { NobelRes } from "./types/type";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [nobels, setNobels] = useState<Array<NobelRes>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState("literature");
  const [pages, setPages] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const pagesQuery = useMemo(() => {
    return `page=${pages}`;
  }, [pages]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}api/v1/novel_award/category/${query}?${pagesQuery}`);
        const data = await res.json();
        const nobelData = data.data.items as Array<NobelRes>;
        setNobels(nobelData);
      } catch (err) {
        console.error(err);
        throw new Error("Soomething went wrong with fetching");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [query, pagesQuery]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}api/v1/novel_award/category/${query}`);
        const data = await res.json();
        const nobelData = data.data.items as Array<NobelRes>;
        setTotalPage(Math.ceil(nobelData?.length / 20));
      } catch (err) {
        console.error(err);
        throw new Error("Something went wrong with fetching");
      }
    })();
  }, [query]);

  if (isLoading || totalPage === 0) return <p>Loading</p>;
  console.log(nobels);
  return (
    <main className="bg-green-500 font-bold py-20 w-screen">
      <div className="min-h-screen max-w-[900px] mx-auto flex items-center flex-col">
        <h1 className="text-[26px] sm:text-[40px] md:text-[60px]">History of Nobel Awards</h1>
        <label className=" mt-16 ">Category</label>
        <select
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="p-2 bg-white text-zinc-600 outline-none text-lg mt-2 focus:outline focus:outline-green-900 focus:outline-4 focus:outline-offset-2 focus:rounded-sm"
        >
          <option value="literature">literature</option>
          <option value="peace">peace</option>
          <option value="physics">physics</option>
          <option value="chemistry">chemistry</option>
          <option value="Physiology or Medicine">Physiology or Medicine</option>
        </select>
        <div className="flex flex-col items-center pt-20">
          {!isLoading &&
            nobels.map((nobel, i) => (
              <Card
                nobel={nobel}
                key={`${nobel.laureates?.[0].id}:${nobel.laureates?.[0].knownName.en}:${i}`}
              />
            ))}
        </div>
        <div>
          {totalPage !== 0 &&
            Array.from({ length: totalPage }, (_, i) => (
              <button
                key={i}
                className="bg-stone-400 p-3 mx-1 outline-none focus:outline focus:outline-green-900 focus:outline-offset-2 focus:rounded-sm"
                onClick={() => setPages(i + 1)}
              >
                {i + 1}
              </button>
            ))}
        </div>
      </div>
    </main>
  );
}

export default App;
