import styles from "@/styles/Index.module.css";
import { Rubik } from "next/font/google";
import { usePlayer } from "@/contexts/playerContext";
import { useTheme } from "@/contexts/themeContext";

const rubik = Rubik({ subsets: ["latin"] });

export default function DataPolicy() {
  const { musicList } = usePlayer();
  const { isDark } = useTheme();
  return (
    <main
      className={`${styles.indexContainer} ${
        musicList.length > 0
          ? "h-[calc(100vh-6px)] rounded-tl-[30px] rounded-bl-[30px]"
          : "h-screen"
      } ${rubik.className} ${isDark ? "bg-[#151515]" : "bg-[#FCFCFF]"}`}
    >
      <h1>Política de Privacidade</h1>

      <p>
        Bem-vindo à nossa Política de Privacidade. Esta página informa você
        sobre nossas políticas referentes à coleta, uso e divulgação de
        informações pessoais quando você usa nosso Serviço.
      </p>

      <h2>Coleta de Informações</h2>

      <p>
        As informações que coletamos são usadas para melhorar a experiência do
        usuário e personalizar nosso serviço para você.
      </p>

      <h2>Segurança de Dados</h2>

      <p>
        Implementamos medidas de segurança para proteger suas informações
        pessoais contra acesso não autorizado ou divulgação.
      </p>

      <h2>Compartilhamento de Dados</h2>

      <p>
        Compartilhamos suas informações com a empresa responsável pelo gateway
        de pagamento (insira o nome ou CNPJ da empresa).
      </p>

      <h2>Cookies</h2>

      <p>Utilizamos um cookie para armazenar o token de autenticação JWT.</p>

      <h2>Alterações na Política de Privacidade</h2>

      <p>
        Os usuários serão informados por e-mail sobre alterações na política de
        privacidade e receberão notificações no aplicativo.
      </p>

      <footer>
        <p>
          Esta Política de Privacidade entra em vigor em [data de entrada em
          vigor].
        </p>
      </footer>
    </main>
  );
}
