import React from 'react';
import styles from './SideBar.module.scss';

const Nav = props => {
  const { navs, onSelect } = props;
  return (
    <div className={styles.sideBar}>
      <div className={styles.sideBarTitle}>React Playground</div>
      <div className={styles.navList}>
        {
          navs.map(({ cate, files }) => (
            <div className={styles.nav}>
              <div className={styles.navTitle}>{cate}</div>
              {files.map(file => (<div onClick={() => onSelect(file)} className={styles.navItem}>{file}</div>))}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Nav;