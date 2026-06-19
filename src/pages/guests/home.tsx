import { ROUTES } from "@/routes/routeConstants"
import { Link } from "react-router"

const Home = () => {
  return (
    <section className="flex items-center justify-center">
      <div className="flex gap-4">
        <Link to={ROUTES.DASHBOARD} className="underline underline-offset-4">
          DASHBOARD
        </Link>
        <Link to={ROUTES.LOGIN} className="underline underline-offset-4">
          Log in
        </Link>
        <Link to={ROUTES.REGISTER} className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </section>
  )
}

export default Home
