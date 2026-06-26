import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { APP_NAME, footerDetails, logo } from "@/lib/exports"
import { cn } from "@/lib/utils"
import { ROUTES } from "@/routes/routeConstants"
import { Link } from "react-router"

const Footer = () => {
  return (
    <footer className="bg-background px-4 py-12 sm:px-6 md:px-8 md:py-16 lg:px-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:gap-16 lg:grid-cols-6">
        <div className="space-y-6 lg:col-span-3">
          <Link to={ROUTES.HOME} className="flex items-center gap-4">
            <img src={logo} className="w-12" />{" "}
            <span className="text-2xl font-black">{APP_NAME}</span>
          </Link>
          <p className="text-sm md:text-base">
            Join our newsletter for regular updates.
          </p>
          <form action="">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Input
                type="email"
                placeholder="example@email.com"
                className="w-full rounded-md border border-border bg-background px-3 py-6 sm:max-w-xs"
              />
              <Button size="lg" className="rounded-md py-6">
                Subscribe
              </Button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-2 items-start gap-8 md:grid-cols-3 md:gap-12 lg:col-span-3 lg:gap-28">
          {footerDetails.foterLinks.map((item) => (
            <div key={item.linkTitle}>
              <h3 className="mb-4 font-semibold md:mb-6">{item.linkTitle}</h3>

              <ul className="space-y-3 text-sm text-white/70 md:space-y-4">
                {item.linkDetails.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.url}
                      className="text-primary hover:text-muted-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-6 border-t pt-6 md:mt-16 md:flex-row">
        <p className="order-2 text-xs sm:text-sm md:order-1">
          © {new Date().getFullYear()} Built by {APP_NAME}
        </p>
        <div className="order-1 flex gap-5 md:order-2 md:gap-6">
          {footerDetails.footerSocialMedia
            .filter((item) => item.active)
            .map((media) => (
              <Link
                key={media.name}
                to={media.url}
                className="hover:text-muted-foreground"
              >
                <media.icon className={cn("h-6 w-6", media.color)} />
              </Link>
            ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
