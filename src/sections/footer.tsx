import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { APP_NAME, logo } from "@/lib/exports"
import { ROUTES } from "@/routes/routeConstants"
import { Link } from "react-router"

const Footer = () => {
  return (
    <>
      <footer className="bg-background px-4 py-12 sm:px-6 md:px-8 md:py-16 lg:px-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:gap-16 lg:grid-cols-6">
          <div className="space-y-6 lg:col-span-3">
            <Link to={ROUTES.HOME} className="flex items-center gap-4">
              <img src={logo} className="w-12" />{" "}
              <span className="text-xl">{APP_NAME}</span>
            </Link>
            <p className="text-sm md:text-base">
              Join our newsletter for regular updates.
            </p>
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
          </div>

          <div className="grid grid-cols-2 items-start gap-8 md:grid-cols-3 md:gap-12 lg:col-span-3 lg:gap-28">
            <div>
              <h3 className="mb-4 text-sm font-medium md:mb-6">Products</h3>
              <ul className="space-y-3 text-sm text-white/70 md:space-y-4">
                <li>
                  <a href="#" className="text-primary">
                    Components
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    Icons
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="mb-4 text-sm font-medium md:mb-6">Resources</h3>
              <ul className="space-y-3 text-sm text-white/70 md:space-y-4">
                <li>
                  <a href="#" className="">
                    PrebuiltUI
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    Components
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    Store
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="mb-4 text-sm font-medium md:mb-6">Company</h3>
              <ul className="space-y-3 text-sm text-white/70 md:space-y-4">
                <li>
                  <a href="#" className="">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    Vision
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <a href="#" className="">
                    Careers
                  </a>
                  <span className="rounded-full border border-green-300 bg-green-950 px-2 py-0.5 text-[11px] font-bold text-green-300">
                    HIRING
                  </span>
                </li>
                <li>
                  <a href="#" className="">
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-neutral-700 pt-6 md:mt-16 md:flex-row">
          <p className="order-2 text-xs sm:text-sm md:order-1">
            © {new Date().getFullYear()} Built by {APP_NAME}
          </p>
          <div className="order-1 flex gap-5 md:order-2 md:gap-6">
            <a href="#" className="hover:text-muted-foreground">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>
            {/* Github */}
            <a href="#" className="hover:text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a href="#" className="hover:text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* Youtube */}
            <a href="#" className="hover:text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="hover:text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
