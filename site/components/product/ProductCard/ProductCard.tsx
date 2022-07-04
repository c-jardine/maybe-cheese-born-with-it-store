import { FC } from 'react'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import Image, { ImageProps } from 'next/image'
import { Text } from '@components/ui'

interface Props {
  className?: string
  product: Product
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple'
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = 'default',
}) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="group cursor-pointer h-full">
        <div className="relative border-2 border-secondary rounded-t-lg overflow-hidden bg-secondary">
          <Image
            src={product.images[0]?.url}
            alt={product.name}
            width={500}
            height={500}
            layout="responsive"
            objectFit="cover"
          />
        </div>

        <div className="relative bg-white group-hover:bg-accent-2 border-x-2 border-b-2 border-secondary rounded-b-lg p-2 transition">
          <h3 className="text-base font-semibold text-gray-900">
            {product.name}
          </h3>
          <div className="flex-1 flex flex-row justify-between">
            <p className="text-base font-medium text-gray-900">
              ${product.price.value}
            </p>
            <div className="flex gap-2">
              {product.options.map((option: any) => {
                if (option.displayName === 'Color') {
                  return option.values.map((color: any) => {
                    if (color.label === 'Yellow') {
                      return (
                        <div className="h-4 w-4 bg-[#fcd34d] rounded-full" />
                      )
                    } else if (color.label === 'Pink') {
                      return (
                        <div className="h-4 w-4 bg-[#ec4899] rounded-full" />
                      )
                    }
                  })
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
