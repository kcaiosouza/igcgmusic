import styles from '@/styles/Index.module.css'
import { Rubik } from 'next/font/google'
import { IoSearch } from 'react-icons/io5';
import { FaRegMoon, FaMoon } from 'react-icons/fa';
import { RiUser3Line, RiUser3Fill, RiAtLine } from 'react-icons/ri';
import Link from 'next/link';
import { usePlayer } from '@/contexts/playerContext'
import { useTheme } from '@/contexts/themeContext';
import { MdCake, MdMail } from 'react-icons/md';
import { FaKey } from 'react-icons/fa6';
import { useForm } from 'react-hook-form'
import { useState } from 'react';

const rubik = Rubik({ subsets: ['latin'] })

export default function Account() {
  const { musicList } = usePlayer();
  const { isDark } = useTheme();
  const { register, handleSubmit } = useForm();
  const [ isLogin, setIsLogin ] = useState(true);
  return (
    <main className={`${styles.indexContainer} ${musicList.length > 0 ? "h-[calc(100vh-6px)] rounded-tl-[30px] rounded-bl-[30px]" : "h-screen"} ${rubik.className} ${isDark ? "bg-[#151515]" : "bg-[#FCFCFF]"}`}>
      <div className='flex w-full h-full items-center justify-center'>
        {isLogin ? 
          <form className='flex flex-col w-[320px]' onSubmit={handleSubmit((data) => {console.log(data)})}>
          <div className={styles.inputUser}>
            <input {...register("login")} className={styles.input} placeholder='Username ou E-mail'/>
            <RiUser3Fill color='#2D2E375d'/>
          </div>
          <div className={styles.inputUser}>
            <input {...register("password")} className={styles.input} type='password' placeholder='Senha'/>
            <FaKey color='#2D2E375d'/>
          </div>
         
          <div className='mb-3'>
            <input {...register("remember")} id='rememberme' type='checkbox' className='mr-2'/>
            <label for="rememberme">Lembrar de mim</label>
          </div>

          <button className='bg-greenNotPlaying px-5 py-3 rounded-lg font-semibold text-[16px] text-[#FCFCFF] hover:bg-greenPlaying transition-all' type='submit'>Entrar</button>
          <div className='flex items-center justify-center'>
            <button onClick={() => setIsLogin(!isLogin)}>Criar uma conta</button>
          </div>
        </form>
         : 
        <form className='flex flex-col w-[320px]' onSubmit={handleSubmit((data) => {console.log(data)})}>
          <div className={styles.inputUser}>
            <input {...register("name")} className={styles.input} placeholder='Nome'/>
            <RiUser3Fill color='#2D2E375d'/>
          </div>
          <div className={styles.inputUser}>
            <input {...register("email")} className={styles.input} type='email' placeholder='E-mail'/>
            <MdMail color='#2D2E375d'/>
          </div>
          <div className={styles.inputUser}>
            <input {...register("username")} className={styles.input} placeholder='Username'/>
            <RiAtLine color='#2D2E375d'/>
          </div>
          <div className='flex flex-row gap-2'>
            <div className={styles.inputUser}>
              <input {...register("password")} className={styles.input} type='password' placeholder='Senha'/>
              <FaKey color='#2D2E375d'/>
            </div>
            <div className={styles.inputUser}>
              <input {...register("passwordConfirmer")} className={styles.input} type='password' placeholder='Confirmar senha'/>
              <FaKey color='#2D2E375d'/>
            </div>
          </div>
          <div className={styles.inputUser}>
            <input {...register("birth")} className={styles.input} type="date"/>
            <MdCake color='#2D2E375d'/>
          </div>

          <div>
            <input {...register("confirmDataPolicy")} id="dataPolicy" type='checkbox' className='mr-2'/>
            <label for="dataPolicy">Li e concordo com os termos da <Link href="/dataPolicy" className='underline text-greenNotPlaying hover:text-greenPlaying transition-all'>Política de Dados</Link></label>
          </div>

          <button className='bg-greenNotPlaying px-5 py-3 rounded-lg font-semibold text-[16px] text-[#FCFCFF] hover:bg-greenPlaying transition-all' type='submit'>Criar conta</button>
          <div className='flex items-center justify-center'>
            <button onClick={() => setIsLogin(!isLogin)}>Já tenho uma conta</button>
          </div>
        </form>
        }
      </div>
    </main>
  )
}
