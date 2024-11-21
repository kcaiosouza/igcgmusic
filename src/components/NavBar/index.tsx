"use client"
 
import { usePathname } from 'next/navigation';
import {
  IoHeartOutline,
  IoHeart,
  IoHomeOutline,
  IoHome,
  IoMusicalNotesOutline,
  IoMusicalNotes,
  IoFolderOpenOutline,
  IoFolderOpen,
  IoPersonOutline,
  IoPerson,
  IoSettingsOutline,
  IoSettings,
} from 'react-icons/io5';
import Link from "next/link";

import styles from './styles.module.css';
import Image from 'next/image';

interface NavProps {
  page: PageProps
}

interface PageProps {
  name: string
}

export default function NavBar() {
  const pathname = usePathname()

  return (
    <nav className={styles.navigationContainer}>
      <div className={styles.divLogo}>
        <Image src="/shortLogoIGCGMusic.png" priority alt="Logo" width={256} height={256}/>
      </div>

      <div className={styles.navIcons}>
        {pathname == "/" ? 
          <Link href="/">
            <IoHome size={26} color="#FFFFFF"/>
          </Link>
            :
          <Link href="/">
            <IoHomeOutline size={26} color="#FFFFFF"/>
          </Link>
        }
        
        {pathname == "/playingNow" ?
          <Link href="/playingNow">
            <IoMusicalNotes size={26} color="#FFFFFF"/>
          </Link>
            :
            // musicList.length > 0 ? 
            //   <Link href="/playingNow">
            //     <BiMusic size={26} color="#FFFFFF"/>
            //   </Link>
            //     :
              <div className="cursor-not-allowed">
                <IoMusicalNotesOutline size={26} color="#FFFFFF"/>
              </div>
        }
        
        {pathname == "/liked" ?
          <Link href="/liked">
            <IoHeart size={26} color="#FFFFFF"/>
          </Link>
            :
            // user.length > 0 ?
            //   <Link href="/liked">
            //     <FaRegHeart size={26} color="#FFFFFF"/>
            //   </Link>
            //     :
              <div className="cursor-not-allowed">
                <IoHeartOutline size={26} color="#FFFFFF"/>
              </div>
        }
        
        {pathname == "/playlists" ?
          <Link href="/playlists">
            <IoFolderOpen size={26} color="#FFFFFF"/>
          </Link>
            :
          <Link href="/playlists">
            <IoFolderOpenOutline size={26} color="#FFFFFF"/>
          </Link>
        }
        
        {pathname == "/account" ?
          <Link href="/account">
            <IoPerson size={26} color="#FFFFFF"/>
          </Link>
            :
          <Link href="/account">
            <IoPersonOutline size={26} color="#FFFFFF"/>
          </Link>
        }
      </div>

      <div>
      {pathname == "/settings" ?
          <Link href="/settings">
            <IoSettings size={26} color="#FFFFFF"/>
          </Link>
            :
          <Link href="/settings">
            <IoSettingsOutline size={26} color="#FFFFFF"/>
          </Link>
        }
      </div>
    </nav>
  );
}