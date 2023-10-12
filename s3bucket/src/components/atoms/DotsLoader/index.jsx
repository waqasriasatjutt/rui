import React from "react";
import styles from "./styles.module.css";
function DotsLoader() {
  return (
    <div className={styles.loader_bg}>
      <div className="snippet" data-title=".dot-pulse">
        <div className="stage">
          <div className={styles.loading_wrapper}>
            <h3 className={styles.loading_text}>Loading</h3>

            <div className={styles.dot_pulse}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DotsLoader;
