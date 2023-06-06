"use client";

import React, { useState } from "react";
import { IconType } from "react-icons";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./TextField.module.scss";

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  Icon?: IconType;
  error?: string;
  type?: "text" | "password";
  inputRef?: React.Ref<HTMLInputElement>;
}

const TextField: React.FC<TextFieldProps> = ({
  Icon,
  setValue,
  value,
  error,
  label,
  placeholder,
  type,
  inputRef,
}) => {
  const [shown, setShown] = useState(type !== "password");
  let rType = shown ? "text" : "password";

  return (
    <div className={styles.textfield}>
      {label && <div className={styles.textfield_label}>{label}</div>}
      <div className={styles.textfield_input + (error ? " " + styles.error : "")}>
        {Icon && (
          <div className={styles.textfield_icon}>
            <Icon />
          </div>
        )}
        <input
          type={type ? rType : "text"}
          className="unstyled"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          {...(inputRef ? { ref: inputRef } : {})}
        />
        {type === "password" && (
          <div className={`shown-icon ${shown ? "active" : ""}`} onClick={() => setShown(!shown)}>
            <div className={styles.shown_icon_item + " " + styles.show}>
              <FiEye />
            </div>
            <div className="shown-icon-item shown">
              <FiEyeOff />
            </div>
          </div>
        )}
      </div>
      {error && <div className={styles.textfield_error}>{error}</div>}
    </div>
  );
};

export default TextField;
