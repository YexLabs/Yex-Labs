'use client'

import React from 'react';
import Link from 'next/link';
import navBarStyles from './NavBar.module.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../../utils/theme.js';
import ListIcon from '../../public/list.svg';

const menuItems = [
  // Target can be '_blank' to open new window or '_self'
  {text: 'Swap', link: '/swap', target: '_self', displayMobile: true, displayDesktop: true },
  {text: 'Pool', link: '/pool', target: '_self', displayMobile: true, displayDesktop: true },
  {text: 'Launching', link: '/launching', target: '_self', displayMobile: true, displayDesktop: true },
  {text: 'Portfolio', link: '/portfolio', target: '_self', displayMobile: true, displayDesktop: true },
];

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={navBarStyles.outerContainer} >
        <div className="sectionContainer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '50px' }}>
          <Link href='/' style={{ maxHeight: '44px'}}>
            {/* <Image
              src='/logo.svg'
              alt="Logo"
              width={190}
              height={44}
              priority
            /> */}
          </Link>
          <div className={navBarStyles.menuButtons}>
            {menuItems.map((item, i) => (
              item.displayDesktop ? (
                <Link key={i} href={item.link} className={`button3 ${navBarStyles.menuItem}`}>{item.text}</Link>
              ) : null
            ))}
          </div>
          <div className={navBarStyles.mobileMenu}>
            <ListIcon className={navBarStyles.listIcon} onClick={(handleClick)}/>
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: -24,
                horizontal: 'right',
            }}
          >
            {menuItems.map((item, i) => (
              item.displayMobile ? (
                <Link key={i} href={item.link} target={item.target} style={{ color: 'var(--text-primary)'}}>
                  <MenuItem style={{ fontSize: '20px', minWidth: '175px', minHeight: '50px'}}>
                    {item.text}
                  </MenuItem>
                </Link>
              ) : null
            ))}
          </Menu>
        </div>
      </div>
    </ThemeProvider>
  )
}
