import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../components/ui/button";
import AuthForm from "./AuthForm";
import ImageForm from "./ImageForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { setQuery } from "@/slices/gstate";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuthContext();
  const { query } = useSelector((state: RootState) => state.gState);
  const dispatch = useDispatch();
  return (
    <>
      <header className="sticky z-[10] top-0 left-0 w-full gap-4 h-16 rounded-md shadow-md bg-white flex items-center px-6 justify-between">
        <div className="sm:w-[35vw] w-[55vw] rounded-md flex gap-4 px-4 items-center bg-slate-100 py-2">
          <i>
            <img src="/navbar/search.svg" alt="search" />
          </i>
          <input
            className="bg-inherit outline-none w-full text-slate-700"
            placeholder="Search..."
            type="search"
            value={query}
            onChange={e => dispatch(setQuery(e.target.value))}
          />
        </div>

        <div className="flex items-center gap-4">
          {/* user profile */}
          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <div className="max-w-[230px] flex gap-10 justify-between items-center rounded-lg bg-white border border-slate-200 px-2 py-1">
                <div className="flex items-center gap-4">
                  <img src="avatar.png" alt="avatar" />
                  <div className="flex flex-col max-sm:hidden">
                    <span className="text-xs">Welcome back</span>
                    <span className="text-sm">{user.username}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* upload image */}
          {isAuthenticated ? (
            <div className="flex gap-4 justify-center items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"secondary"}>Upload</Button>
                </DialogTrigger>
                <DialogContent className="h-[90dvh] overflow-auto">
                  <DialogHeader>
                    <DialogTitle>Upload Image</DialogTitle>
                    <DialogDescription>Upload an image to the server</DialogDescription>
                    <ImageForm />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <div>
                <Button onClick={logout}> Logout</Button>
              </div>
            </div>
          ) : (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"secondary"}>Signup</Button>
                </DialogTrigger>
                <DialogContent className="w-[400px]">
                  <DialogHeader>
                    <AuthForm type="signup" />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Signin</Button>
                </DialogTrigger>
                <DialogContent className="w-[400px]">
                  <DialogHeader>
                    <AuthForm type="signin" />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default Navbar;
