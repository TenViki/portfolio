"use client";

import React, { useEffect } from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import ClickAwayListener from "react-click-away-listener";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  label: string;
  current: any;
  options: {
    id: any;
    value: string;
  }[];
  onChange: (id: any) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  current,
  onChange,
  options,
}) => {
  const [opened, setOpened] = React.useState(false);
  const [maxHeight, setMaxHeight] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  const currentOption = options.find((o) => o.id === current);

  const getMaxHeight = () => {
    if (!ref.current) return 0;
    // Calculate max height of dropdown relative to its position and bottom of screen
    const maxHeight =
      window.innerHeight - ref.current.getBoundingClientRect().bottom - 16;
    return maxHeight;
  };

  const handleResize = () => {
    setMaxHeight(getMaxHeight());
  };

  useEffect(() => {
    setMaxHeight(getMaxHeight());

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [opened]);

  return (
    <ClickAwayListener onClickAway={() => setOpened(false)}>
      <div className={styles.dropdown} ref={ref}>
        {label && <div className={styles.dropdown_label}>{label}</div>}
        <div
          className={
            styles.dropdown_input + " " + (opened ? styles.active : "")
          }
        >
          <div
            className={styles.dropdown_head}
            onClick={() => setOpened(!opened)}
          >
            <div className={styles.dropdown_head_text}>
              {currentOption ? currentOption.value : "Klikněte pro výběr"}
            </div>
            <FiChevronDown />
          </div>

          <div
            className={styles.dropdown_options}
            style={{ maxHeight: Math.min(maxHeight, 300) }}
          >
            {options.map((option) => (
              <div
                key={option.id}
                className={`${styles.dropdown_option} ${
                  option.id === current ? styles.active : ""
                }`}
                onClick={() => {
                  onChange(option.id);
                  setOpened(false);
                }}
              >
                {option.id === current && <FiCheck />}
                {option.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default Dropdown;
