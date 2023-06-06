import { FiArrowRight } from "react-icons/fi";
import styles from "./Hero.module.scss";

const HeroButton = () => {
  return (
    <button className={styles.hero_button}>
      See my work
      <FiArrowRight />
    </button>
  );
};

export default HeroButton;
