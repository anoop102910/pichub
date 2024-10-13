import { useGetImagesQuery } from "@/services/imageApi";
import Image from "./Image";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
function Home() {
    const { query } = useSelector((state) => state.gState);
    const { data, isLoading, error } = useGetImagesQuery(query);
    const images = data?.data;
    if (isLoading)
        return (<div className="px-16 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (<ImageSkeleton key={index}/>))}
        </div>
      </div>);
    if (error)
        return <div className="text-center mt-10 text-3xl bg-slate-300">{"Something went wrong"}</div>;
    if (!images)
        return null;
    return (<>
      <div className="px-16 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-6">
          {images.map((image, index) => {
            return <Image image={image} key={image._id}/>;
        })}{" "}
        </div>
      </div>
    </>);
}
const ImageSkeleton = () => {
    return <Skeleton className="w-full h-[200px]"/>;
};
export default Home;
