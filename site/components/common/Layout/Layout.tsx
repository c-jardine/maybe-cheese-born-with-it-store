import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { CommerceProvider } from '@framework'
import LoginView from '@components/auth/LoginView'
import { useUI } from '@components/ui/context'
import { Navbar, Footer } from '@components/common'
import ShippingView from '@components/checkout/ShippingView'
import CartSidebarView from '@components/cart/CartSidebarView'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import { Sidebar, Button, LoadingDots } from '@components/ui'
import PaymentMethodView from '@components/checkout/PaymentMethodView'
import CheckoutSidebarView from '@components/checkout/CheckoutSidebarView'
import { CheckoutProvider } from '@components/checkout/context'
import { MenuSidebarView } from '@components/common/UserNav'
import type { Page } from '@commerce/types/page'
import type { Category } from '@commerce/types/site'
import type { Link as LinkProps } from '../UserNav/MenuSidebarView'
import { Searchbar } from '@components/common'
import Image from 'next/image'

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
)

const dynamicProps = {
  loading: Loading,
}

const SignUpView = dynamic(() => import('@components/auth/SignUpView'), {
  ...dynamicProps,
})

const ForgotPassword = dynamic(
  () => import('@components/auth/ForgotPassword'),
  {
    ...dynamicProps,
  }
)

const FeatureBar = dynamic(() => import('@components/common/FeatureBar'), {
  ...dynamicProps,
})

const Modal = dynamic(() => import('@components/ui/Modal'), {
  ...dynamicProps,
  ssr: false,
})

interface Props {
  pageProps: {
    pages?: Page[]
    categories: Category[]
  }
}

const ModalView: React.FC<{ modalView: string; closeModal(): any }> = ({
  modalView,
  closeModal,
}) => {
  return (
    <Modal onClose={closeModal}>
      {modalView === 'LOGIN_VIEW' && <LoginView />}
      {modalView === 'SIGNUP_VIEW' && <SignUpView />}
      {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
    </Modal>
  )
}

const ModalUI: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI()
  return displayModal ? (
    <ModalView modalView={modalView} closeModal={closeModal} />
  ) : null
}

const SidebarView: React.FC<{
  sidebarView: string
  closeSidebar(): any
  links: LinkProps[]
}> = ({ sidebarView, closeSidebar, links }) => {
  return (
    <Sidebar onClose={closeSidebar}>
      {sidebarView === 'CART_VIEW' && <CartSidebarView />}
      {sidebarView === 'SHIPPING_VIEW' && <ShippingView />}
      {sidebarView === 'PAYMENT_VIEW' && <PaymentMethodView />}
      {sidebarView === 'CHECKOUT_VIEW' && <CheckoutSidebarView />}
      {sidebarView === 'MOBILE_MENU_VIEW' && <MenuSidebarView links={links} />}
    </Sidebar>
  )
}

const SidebarUI: React.FC<{ links: LinkProps[] }> = ({ links }) => {
  const { displaySidebar, closeSidebar, sidebarView } = useUI()
  return displaySidebar ? (
    <SidebarView
      links={links}
      sidebarView={sidebarView}
      closeSidebar={closeSidebar}
    />
  ) : null
}

const Layout: React.FC<Props> = ({
  children,
  pageProps: { categories = [], ...pageProps },
}) => {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const { locale = 'en-US' } = useRouter()
  const navBarlinks = categories.slice(0, 2).map((c) => ({
    label: c.name,
    href: `/search/${c.slug}`,
  }))

  return (
    <CommerceProvider locale={locale}>
      <div className="relative">
        <div className="fixed w-screen h-screen">
          <Image
            src="/assets/get-up-on-outta-here-with-my-cheeseholes.svg"
            alt="Cheeseholes"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="bg-[#831843]">
          <div className="relative flex justify-between pt-4 max-w-7xl mx-auto">
            <div className="absolute -bottom-4 left-0 z-0">
              <Image
                src="/assets/toledo-skyline.png"
                alt="Toledo Skyline"
                height={284}
                width={1200}
              />
            </div>
            <div className="relative h-64 w-full">
              <Image
                src="/assets/logo.png"
                alt="Maybe Cheese Born With It logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
        <Navbar links={navBarlinks} />
        <main className="fit px-2 bg-brand-primary py-16 lg:py-24">
          <div className="relative py-8 bg-white rounded-lg border-2 border-secondary max-w-4xl mx-auto">
            <h1 className="font-display text-brand-secondary uppercase text-4xl text-center sm:text-6xl font-extrabold [text-shadow:_-2px_2px_0px_#CE5937]">
              Shop Merch
            </h1>
            <div className="mt-8 max-w-sm flex w-full mx-auto">
              {process.env.COMMERCE_SEARCH_ENABLED && (
                <div className="justify-center flex-1 hidden lg:flex">
                  <Searchbar />
                </div>
              )}

              {process.env.COMMERCE_SEARCH_ENABLED && (
                <div className="flex lg:px-6 lg:hidden flex-1">
                  <Searchbar id="mobile-search" />
                </div>
              )}
            </div>
          </div>
          <div className="relative mt-8 py-16 bg-white rounded-lg border-2 border-secondary max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        <Footer />
        <ModalUI />
        <CheckoutProvider>
          <SidebarUI links={navBarlinks} />
        </CheckoutProvider>
        <FeatureBar
          title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
          hide={acceptedCookies}
          action={
            <Button className="mx-5" onClick={() => onAcceptCookies()}>
              Accept cookies
            </Button>
          }
        />
      </div>
    </CommerceProvider>
  )
}

export default Layout
