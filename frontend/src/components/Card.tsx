import { NobelRes } from "../types/type";

export const Card = ({ nobel }: { nobel: NobelRes }) => {
  const {
    awardYear,
    category: { en: category },
    laureates,
  } = nobel;
  return (
    <div className="w-[300px] sm:w-[400px] mb-10 border border-gray-300 p-6">
      <h2 className="text-[30px]">{category}</h2>
      <p>{awardYear}</p>
      {laureates?.map((lau) => (
        <div key={lau.id}>
          <p>{lau.knownName?.en}</p>
          <p className="font-[400]">{lau.motivation?.en}</p>
        </div>
      ))}
    </div>
  );
};
