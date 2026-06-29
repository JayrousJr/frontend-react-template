import { ROUTES } from "@/routes/routeConstants"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"

const Home = () => {
  const { t } = useTranslation()
  return (
    <section className="flex items-center justify-center">
      <div className="flex gap-4">{t("greeting_message")}</div>
    </section>
  )
}

export default Home
