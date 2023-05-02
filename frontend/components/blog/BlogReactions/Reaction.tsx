import React, { FC } from "react";

interface ReactionProps {
  type: string;
  count: number;
  active: boolean;
  onClick?: () => void;
}

const Reaction: FC<ReactionProps> = ({ active, count, type, onClick }) => {
  return (
    <div onClick={onClick}>
      <span>{type}</span> -<span>{count}</span> -
      <span>{active ? "active" : "not active"}</span>
    </div>
  );
};

export default Reaction;
