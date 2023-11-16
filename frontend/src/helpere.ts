import { NobelRes } from "./types/type";

export function sortData(data: Array<NobelRes>) {
  const dataPerPageNum: number = 20;
  const pages = data.length / dataPerPageNum;
  const sortedArr = [];
  for (let i = 0; i < pages; i++) {
    const dataPerPage = data.slice(i * dataPerPageNum, (i + 1) * dataPerPageNum);
    return sortedArr.push(dataPerPage);
  }
  return sortedArr;
}
