import { LineItem } from '@commerce/types/cart'
import { Bag, Cross, Menu } from '@components/icons'
import { Button, useUI } from '@components/ui'
import { Disclosure } from '@headlessui/react'
import useCart from '@framework/cart/use-cart'
import { useRouter } from 'next/router'
import ChevronLeft from '../../icons/ChevronLeft'

const navItems = [
  { label: 'Home', href: 'https://www.maybecheesebornwithit.com' },
  { label: 'Shop', href: '/' },
  { label: 'Menu', href: 'https://www.maybecheesebornwithit.com/menu' },
  { label: 'About', href: 'https://www.maybecheesebornwithit.com/about' },
  { label: 'Contact', href: 'https://www.maybecheesebornwithit.com/contact' },
]

const countItem = (count: number, item: LineItem) => count + item.quantity

const MobileItem = ({
  href,
  isActive,
  children,
}: {
  href: string
  isActive: boolean
  children: string
}) => {
  return (
    <Disclosure.Button
      as="a"
      href={href}
      className={`${
        isActive
          ? 'border-brand-primary text-brand-primary hover:bg-yellow-300'
          : 'bg-brand-secondary border-l-brand-secondary text-black/70 hover:bg-brand-secondary-light hover:border-l-white hover:text-brand-600'
      } bg-yellow-400 block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition`}
    >
      {children}
    </Disclosure.Button>
  )
}

export const Nav = () => {
  const { data } = useCart()

  const { setSidebarView, openSidebar } = useUI()

  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0

  const active =
    'border-brand-primary hover:border-brand-primary-dark transition'
  const inactive = 'border-transparent hover:border-brand-primary transition'

  const router = useRouter()

  return (
    <Disclosure as="nav" className="shadow sticky top-0 left-0 z-50">
      {({ open }) => (
        <>
          {/* Desktop nav */}
          <div className="border-y-2 border-black hidden sm:block bg-white w-screen">
            <div className="max-w-6xl relative mx-auto">
              {router.pathname !== '/' && (
                <button
                  className="absolute top-1/2 -translate-y-1/2 left-4 cursor-pointer transition ease-in-out duration-100 flex items-center rounded-lg bg-brand-secondary py-2 pl-1 pr-3"
                  onClick={() => router.back()}
                >
                  <ChevronLeft />{' '}
                  <span className="font-bold text-sm">Go Back</span>
                </button>
              )}
              <div className="hidden mx-auto py-1 sm:flex sm:space-x-8 sm:justify-center">
                {navItems.map((item, index) => {
                  return (
                    <a key={index} href={item.href}>
                      <div
                        className={` ${
                          item.label === 'Shop' ? active : inactive
                        }
                       cursor-pointer text-gray-900 inline-flex items-center px-2 pt-4 pb-3 border-b-2 text-sm font-medium`}
                      >
                        {item.label}
                      </div>
                    </a>
                  )
                })}
              </div>
              {process.env.COMMERCE_CART_ENABLED && (
                <li className="group absolute top-1/2 -translate-y-1/2 right-4 hover:bg-yellow-400 p-2 rounded-md transition cursor-pointer flex items-center">
                  <Button
                    className="relative transition ease-in-out duration-100 flex items-center"
                    variant="naked"
                    onClick={() => {
                      setSidebarView('CART_VIEW')
                      openSidebar()
                    }}
                    aria-label={`Cart items: ${itemsCount}`}
                  >
                    <Bag className="stroke-secondary" />
                    {itemsCount > 0 && (
                      <span className="w-[1.25rem] h-[1.25rem] border-[2px] border-primary transition group-hover:border-yellow-400 bg-brand-secondary group-hover:bg-white text-primary absolute rounded-full right-3 top-3 flex items-center justify-center font-bold text-[10px]">
                        {itemsCount}
                      </span>
                    )}
                  </Button>
                </li>
              )}
            </div>
          </div>

          {/* Mobile nav */}
          <div className="flex items-center justify-between sm:hidden bg-white  border-y-2 border-black p-2">
            {/* Mobile menu button */}
            {process.env.COMMERCE_CART_ENABLED && (
              <li className="group cursor-pointer transition flex p-2 rounded-md hover:bg-yellow-400">
                <Button
                  className="relative transition ease-in-out duration-100 flex items-center"
                  variant="naked"
                  onClick={() => {
                    setSidebarView('CART_VIEW')
                    openSidebar()
                  }}
                  aria-label={`Cart items: ${itemsCount}`}
                >
                  <Bag className="stroke-secondary" />
                  {itemsCount > 0 && (
                    <span className="w-[1.25rem] h-[1.25rem] border-[2px] border-primary group-hover:border-yellow-400 bg-brand-secondary group-hover:bg-white text-primary absolute rounded-full left-3 top-3 flex items-center justify-center font-bold text-[10px]">
                      {itemsCount}
                    </span>
                  )}
                </Button>
              </li>
            )}
            <a
              href="https://www.maybecheesebornwithit.com"
              className="cursor-pointer font-display text-lg text-yellow-500 font-extrabold [text-shadow:_-1px_1px_0px_#CE5937]"
            >
              CHEESE
            </a>
            <Disclosure.Button
              className={`${
                open ? 'bg-brand-secondary-dark' : ''
              } inline-flex items-center justify-center p-2 rounded-md text-black hover:text-yellow-800 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500 transition`}
            >
              <span className="sr-only">Open main menu</span>
              {open ? (
                <Cross
                  className="block h-6 w-6 text-brand-600"
                  aria-hidden="true"
                />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Disclosure.Button>
          </div>

          <Disclosure.Panel className="sm:hidden bg-brand-secondary shadow-lg border-b-2 border-black">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                return (
                  <MobileItem
                    key={item.label}
                    href={item.href}
                    isActive={item.label === 'Shop'}
                  >
                    {item.label}
                  </MobileItem>
                )
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Nav
