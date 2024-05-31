/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetTrendingGIFsQuery,
  useLazySearchGIFsQuery,
} from "@/services/giphy";
import Loader from "./Loader";
import { PopoverClose } from "@radix-ui/react-popover";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { displayErrorMessage } from "@/utils/functions";
import ErrorMsg from "./ErrorMsg";

const GIF_LIMIT = 48;

const GiphySearch = ({ onSelect }: { onSelect: (_: string) => void }) => {
  const { currentData, isFetching } = useGetTrendingGIFsQuery({
    limit: GIF_LIMIT,
  });
  const [
    getGIFsBySearch,
    { isFetching: fetchingSearchedGIFs, currentData: searchedGIFs },
  ] = useLazySearchGIFsQuery();

  const [isLoadingGIFs, setIsLoadingGIFs] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setIsLoadingGIFs(fetchingSearchedGIFs);
  }, [fetchingSearchedGIFs]);

  useEffect(() => {
    let timeout: any;
    if (query) {
      setIsLoadingGIFs(true);
      timeout = setTimeout(async () => {
        try {
          await getGIFsBySearch({
            limit: GIF_LIMIT,
            q: query,
          }).unwrap();
        } catch (error: any) {
          displayErrorMessage(error);
        }
      }, 1500);
    } else {
      setIsLoadingGIFs(false);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [query]);

  const showLoader = isFetching || isLoadingGIFs;

  const data = !query ? currentData?.data : searchedGIFs?.data;


  return (
    <div className="h-full overflow-y-auto flex flex-col gap-2 min-w-[min(30rem,_100%)]">
      <Input
        maxLength={50}
        type="search"
        placeholder="Search Gifs"
        onChange={(e) => setQuery(e.target.value)}
      />
      {showLoader ? (
        <Loader size={20} />
      ) : !data?.length ? (
        <ErrorMsg message="We couldn't find any Gifs" className="text-sm" />
      ) : (
        <div
          className="w-full grid grid-cols-[repeat(auto-fit,_minmax(6rem,_1fr))] gap-4 overflow-y-auto flex-1"
          onWheel={(e) => {
            e.stopPropagation();
          }}
        >
          {" "}
          {data.map((el: any, i) => (
            <PopoverClose>
              <div
                key={i}
                className="rounded shadow-lg"
                onClick={() => {
                  onSelect(el.images.original.url);
                }}
              >
                <img className="" src={el.images.original.url} alt={el.title} />
              </div>
            </PopoverClose>
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default GiphySearch;
