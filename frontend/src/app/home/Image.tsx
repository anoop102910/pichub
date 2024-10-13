import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { getImageUrl } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ERROR_IMAGE_URL } from "@/app/constant/constant";
import { useIncViewsMutation } from "@/services/imageApi";
interface ImageProps {
  image: {
    _id: string;
    imageUrl: string;
    name: string;
    desc: string;
    views: number;
  };
}

function Image({ image }: ImageProps) {
  const [incViews] = useIncViewsMutation();
  const incrementViews = async (id: string) => {
    try {
      await incViews({ id });
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger onClick={() => incrementViews(image._id)} asChild>
        <div className="relative">
          <img
            className="w-full rounded-md object-cover"
            src={getImageUrl("image", image.imageUrl)}
            alt=""
            onError={e => {
              e.currentTarget.src = ERROR_IMAGE_URL;
            }}
          />
          <div className="flex items-center gap-2">
            <span className="text-sm ">{image.name}</span>
            <span className=" bg-white px-2 py-1 rounded-md flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {image.views}
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogHeader className="hidden">
        <DialogTitle>{image.name}</DialogTitle>
        <DialogDescription>{image.desc}</DialogDescription>
      </DialogHeader>
      <DialogContent>
        <ScrollArea className="h-[80dvh]">
          <div>
            <img
              className="w-full h-[80%] object-contain"
              src={getImageUrl("image", image.imageUrl)}
              onError={e => {
                e.currentTarget.src = ERROR_IMAGE_URL;
              }}
              alt=""
            />
            <div>
              <span>{image.name}</span>
              <span>{image.desc}</span>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default Image;
