import { useTranslations } from "next-intl"

export default function Player() {
  const t = useTranslations("PlayerComponent");
  return(
    <section>
      <p>VOLTAR</p>
      <p>PLAY/PAUSE</p>
      <p>AVANÇAR</p>

      <span>{t('text1')}</span>
    </section>
  )
}