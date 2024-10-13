import React from "react";

interface ProfileProps {
  w: string;
  className?: string;
  name: string;
}

function Profile({ w, className, name }: ProfileProps) {
  const profileImage = undefined;
  const username = "Anoop Singh";
  return (
    <div>
      {profileImage ? (
        <img className={`w-[${w}] h-[${w}] object-cover object-center rounded-full`} src={profileImage} alt="" />
      ) : (
        <img className={`w-[${w}] h-[${w}] object-cover object-center rounded-full`} src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${username}&size=48&backgroundColor=b6e3f4,c0aede,d1d4f9`} alt="" />
      )}
    </div>
  );
}

export default Profile;
