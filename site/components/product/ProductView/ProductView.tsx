import cn from 'clsx'
import Image from 'next/image'
import s from './ProductView.module.css'
import { FC } from 'react'
import type { Product } from '@commerce/types/product'
import usePrice from '@framework/product/use-price'
import { WishlistButton } from '@components/wishlist'
import { ProductSlider, ProductCard } from '@components/product'
import { Container, Text } from '@components/ui'
import { SEO } from '@components/common'
import ProductSidebar from '../ProductSidebar'
import ProductTag from '../ProductTag'
import Link from 'next/link'
interface ProductViewProps {
  product: Product
  relatedProducts: Product[]
}

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const hasAlbum = product.images.length > 1

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div
          className={`lg:col-span-2 text-center px-2 sm:px-4 md:px-6 lg:px-8 ${s.sliderContainer}`}
        >
          <ProductSlider key={product.id} hasAlbum={hasAlbum}>
            {product.images.map((image, i) => (
              <div key={image.url}>
                <Image
                  className="overflow-hidden transition"
                  src={image.url!}
                  alt={image.alt || 'Product Image'}
                  width={600}
                  height={600}
                  priority={i === 0}
                  objectFit="cover"
                  quality="85"
                />
              </div>
            ))}
          </ProductSlider>
          {process.env.COMMERCE_WISHLIST_ENABLED && (
            <WishlistButton
              className={s.wishlistButton}
              productId={product.id}
              variant={product.variants[0]}
            />
          )}
        </div>

        <div className="lg:col-span-1">
          <ProductSidebar
            key={product.id}
            product={product}
            className={s.sidebar}
          />
        </div>
      </div>

      <div className="w-screen bg-brand-secondary mt-16 border-y-2 border-secondary relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <section className="max-w-7xl mx-auto py-12 px-8 mb-10">
          <Text variant="sectionHeading">Other Products</Text>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <div key={p.path} className="animated fadeIn">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className='pt-16 px-4 max-w-5xl mx-auto'>
        <h3 className='font-bold tracking-wider'>Return Policy</h3>
        <p className='text-accent-5 text-sm'>
          Per the Known Ferengi Rules of Acquistion: Once you have their
          money... you never give it back. We hope you will come to love it
          eventually. But if you don't, consider giving it to someone's kid that
          you don't like. Bonus points for posting a video of them crying on
          Instagram with the tag #UnfortunateNoods.
        </p>
      </div>

      <SEO
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: '800',
              height: '600',
              alt: product.name,
            },
          ],
        }}
      />
    </div>
  )
}

export default ProductView
