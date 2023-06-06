import React, { CSSProperties, FC } from "react";
import styles from "./TagSwitch.module.scss";

interface TagSwitchProps {
  label: string;
  state: boolean;
  setState: (state: boolean) => void;
  color: string;
}

const TagSwitch: FC<TagSwitchProps> = ({ label, setState, state, color }) => {
  return (
    <div
      className={styles.switch}
      style={
        {
          "--color": color,
        } as CSSProperties
      }
    >
      <div className={styles.label}>{label}</div>

      <div className={styles.switchContainer} onClick={() => setState(!state)}>
        <div className={`${styles.switchDisable} ${styles.switchState}`}>
          Disable
        </div>
        <div className={`${styles.switchEnable} ${styles.switchState}`}>
          Enable
        </div>
        <div
          className={`${styles.switchSlider} ${state ? styles.active : ""}`}
        />
      </div>
    </div>
  );
};

export default TagSwitch;
