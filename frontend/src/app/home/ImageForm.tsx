import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateImageMutation } from "@/services/imageApi";

const ImageForm: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const [createImage, { isLoading: isPending }] = useCreateImageMutation();

  const clearForm = (): void => {
    if (imageRef.current) {
      imageRef.current.value = "";
    }
    setSelectedImage(null);
    setName("");
    setDesc("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (selectedImage) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("image", selectedImage);
        formData.append("title", name);
        formData.append("desc", desc);
        await createImage(formData);
        toast.success("Image uploaded successfully");
        clearForm();
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <form className="max-w-[40rem]  mx-auto " onSubmit={handleSubmit}>
        <div>
          {selectedImage ? (
            <div className="relative">
              <img
                onClick={() => {
                  setSelectedImage(null);
                  if (imageRef.current) {
                    imageRef.current.value = "";
                  }
                }}
                className="cursor-pointer absolute top-1 right-1"
                width="36"
                height="36"
                src="https://img.icons8.com/parakeet/48/multiply.png"
                alt="multiply"
              />
              <img className="rounded-lg mt-4 -z-20" src={URL.createObjectURL(selectedImage)} />
            </div>
          ) : (
            <label className="cursor-pointer" htmlFor="image">
              <div className="w-full h-[170px] border-2 border-dotted border-gray-400 rounded-md mt-5 flex justify-center items-center text-gray-400">
                Upload Your Image
              </div>
            </label>
          )}
          <div className="flex justify-between items-center mt-4">
            <div>
              <input
                ref={imageRef}
                onChange={e => setSelectedImage(e.target.files ? e.target.files[0] : null)}
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Enter Image title"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <Label htmlFor="desc">Description</Label>
          <Textarea
            id="desc"
            name="desc"
            placeholder="Enter Image description"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
        </div>
        <Button
          className="w-full mt-4"
          type="submit"
          value={loading ? "Uploading..." : "Upload Image"}
          disabled={loading}
        >
          Upload
        </Button>
      </form>
    </div>
  );
};

export default ImageForm;
