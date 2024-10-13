import { useGetImagesQuery } from "@/services/imageApi";
import Image from "./Image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function Home() {
  const { query } = useSelector((state: RootState) => state.gState);
  const { data, isLoading, error } = useGetImagesQuery(query);
  const images = data?.data;
 
  if (isLoading) return <div className="text-center mt-10 text-3xl text-slate-300">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-3xl bg-slate-300">{"Something went wrong"}</div>;
  if (!images) return null;

  return (
    <>
      <div className="px-16 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-6">
          {images.map((image: any, index: number) => {
            return <Image image={image} key={image._id} />;
          })}{" "}
        </div>
      </div>
    </>
  );
}

export default Home;
