import React from 'react';
import styles from './SideBar.module.scss';
import classNames from '../../utils/classNames';

const Nav = props => {
  const { navs, onSelect, activedKey } = props;
  return (
    <div className={styles.sideBar}>
      <div className={styles.sideBarTitle}>React Playground</div>
      <div className={styles.navList}>
        {
          navs.map(({ cate: { name }, files }) => (
            <div className={styles.nav}>
              <div className={styles.navTitle}>{name}</div>
                {files.map(file => (<div onClick={() => onSelect(file)} className={classNames(styles.navItem, {[styles.actived]: activedKey === file})}>{file}</div>))}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Nav;