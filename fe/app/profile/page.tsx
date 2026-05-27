"use client";

import { useAuth } from "../_components/providers/AuthProvider";

const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <div>
      Profile Page,
      <div>Name: {user?.username}</div>
    </div>
  );
};

export default ProfilePage;
