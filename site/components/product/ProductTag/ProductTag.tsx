import cn from 'clsx'
import { inherits } from 'util'
import s from './ProductTag.module.css'

interface ProductTagProps {
  className?: string
  name: string
  price: string
  fontSize?: number
}

const ProductTag: React.FC<ProductTagProps> = ({
  name,
  price,
  className = '',
  fontSize = 32,
}) => {
  return (
    <div className={cn(s.root, className)}>
      <h3>
        <span className="font-display text-brand-secondary text-2xl sm:text-4xl font-extrabold [text-shadow:_-2px_2px_0px_#CE5937]">
          {name}
        </span>
      </h3>
      <div className={`${s.price} rounded-br-lg`}>{price}</div>
    </div>
  )
}

export default ProductTag
