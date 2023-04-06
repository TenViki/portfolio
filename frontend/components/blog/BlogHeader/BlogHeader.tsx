"use client";

import GoogleLogin from "components/GoogleLogin/GoogleLogin";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { FiArrowLeft, FiLogOut } from "react-icons/fi";
import { useUser } from "utils/useUser";
import styles from "./BlogHeader.module.scss";

interface BlogHeaderProps {
  linkBackText?: string;
  linkBackHref?: string;
}

const BlogHeader: FC<BlogHeaderProps> = ({ linkBackHref, linkBackText }) => {
  const router = useRouter();
  const { user } = useUser();

  return (
    <nav className={styles.nav}>
      <button
        onClick={() => router.push(linkBackHref ? linkBackHref : "/blog")}
        className={styles.back}
      >
        <FiArrowLeft />

        <span>{linkBackText ? linkBackText : "Go back"}</span>
      </button>

      {user ? (
        <div className={styles.user}>
          <img src={user.picture} alt="Userpfp" />
          <span>{user.name}</span>

          <button>
            <FiLogOut />
          </button>
        </div>
      ) : (
        <GoogleLogin />
      )}
    </nav>
  );
};

export default BlogHeader;
