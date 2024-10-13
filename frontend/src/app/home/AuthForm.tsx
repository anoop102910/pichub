import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/util/api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useAuthContext } from "@/context/AuthContext";
interface FormData {
  email: string;
  password: string;
  name?: string;
}
export default function AuthForm({ type }: { type: "signin" | "signup" }) {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "", name: "" });
  const [pending, setPending] = useState<boolean>(false);
  const {login} = useAuthContext();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setPending(true);
      console.log(formData);
      const response = await api.post(`/api/auth/${type}`, formData);
      console.log(response);
      const token = response.data.token;
      if (token){
        localStorage.setItem("token", token);
        login();
      }
      else {
        toast.error("Token not provided");
      }
    } catch (error) {
      console.log(error)
      console.log(error?.response?.data?.message)
      if (error instanceof AxiosError) toast.error(error.response?.data.message);
      else toast.error("Something went wrong");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <div>
          <div className="text-xl font-bold text-center">Sign In</div>
        </div>
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === "signup" && (
              <div>
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                placeholder="Your email address"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                placeholder="Your password address"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button disabled={pending} type="submit" className="w-full bg-black hover:bg-gray-800 text-white mt-4">
              Continue
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="font-medium text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
