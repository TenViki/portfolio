"use client";

import React from "react";
import { useUser } from "../../utils/useUser";

const UserProfile = () => {
  const { user } = useUser();

  return <div>{user?.name}</div>;
};

export default UserProfile;
