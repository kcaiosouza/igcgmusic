import { BsHouse, BsFillHouseFill, BsGear, BsGearFill } from "react-icons/bs";
import { BiMusic, BiSolidMusic } from "react-icons/bi";
import { FaRegFolder, FaFolder, FaRegHeart, FaHeart } from "react-icons/fa6";
import { RiUser3Line, RiUser3Fill } from "react-icons/ri";

import Link from "next/link";

import styles from '@/styles/nav.module.css'

export function Nav({page}) {
  return (
    <nav className={styles.navigationContainer}>
      <div className={styles.divLogo}>
        <img src="/shortLogoIGCGMusic.png" alt="Logo" />
      </div>

      <div className={styles.navIcons}>
        {page.name == "Home" ? 
          <Link href="/">
            <BsFillHouseFill size={26} color="#FFFFFF"/>
          </Link>
            :
          <Link href="/">
            <BsHouse size={26} color="#FFFFFF"/>
          </Link>
        }
        
        {page.name == "PlayingNow" ?
          <Link href="/playingNow">
            <BiSolidMusic size={26} color="#FFFFFF"/>
          </Link>
            :
          <Link href="/playingNow">
            <BiMusic size={26} color="#FFFFFF"/>
          </Link>
        }
        
        {page.name == "Liked" ?
          <Link href="/liked">
            <FaHeart size={26} color="#FFFFFF"/>
          </Link>
            :
          <Link href="/liked">
            <FaRegHeart size={26} color="#FFFFFF"/>
          </Link>
        }
        
        {page.name == "Playlists" ?
          <Link href="/playlists">
            <FaFolder size={26} color="#FFFFFF"/>
          </Link>
            :
          <Link href="/playlists">
            <FaRegFolder size={26} color="#FFFFFF"/>
          </Link>
        }
        
        {page.name == "Account" ?
          <Link href="/account">
            <RiUser3Fill size={26} color="#FFFFFF"/>
          </Link>
            :
          <Link href="/account">
            <RiUser3Line size={26} color="#FFFFFF"/>
          </Link>
        }
      </div>

      <div>
      {page.name == "Settings" ?
          <Link href="/settings">
            <BsGearFill size={26} color="#FFFFFF"/>
          </Link>
            :
          <Link href="/settings">
            <BsGear size={26} color="#FFFFFF"/>
          </Link>
        }
      </div>
    </nav>
  );
}