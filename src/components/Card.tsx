import styles from "./Card.module.scss";
import classNames from "classnames";

const Card = () => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>
            lorem ipsum dolor amet lorem ipsum dolor amet
          </h3>
          <h3
            className={styles.cardSubtitle}
            onMouseEnter={() => {
              console.log("yo");
            }}
            onMouseLeave={() => {
              console.log("yo");
            }}
          >
            text here
          </h3>
        </div>
        <i className={classNames("fa-solid", styles.cardIcon)} />
      </div>
      <a
        id="source-link"
        className={styles.metaLink}
        href="https://brand.twitch.tv"
        target="_blank"
      >
        <i className="fa-solid fa-link"></i>
        <span className="roboto-mono">Source</span>
      </a>
    </>
  );
};
export default Card;
