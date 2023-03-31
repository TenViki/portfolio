import React from "react";

interface TagProps {
  id: string;
  name: string;
  color: string;
}

const Tag: React.FC<TagProps> = () => {
  return <div>Tag</div>;
};

export default Tag;
