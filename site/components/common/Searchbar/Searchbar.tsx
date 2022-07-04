import { FC, memo, useEffect } from 'react'
import cn from 'clsx'
import s from './Searchbar.module.css'
import { useRouter } from 'next/router'

interface Props {
  className?: string
  id?: string
}

const Searchbar: FC<Props> = ({ className, id = 'search' }) => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/search')
  }, [router])

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.key === 'Enter') {
      const q = e.currentTarget.value

      router.push(
        {
          pathname: `/search`,
          query: q ? { q } : {},
        },
        undefined,
        { shallow: true }
      )
    }
  }

  return (
    <div className="relative h-8 w-full mx-2">
      <label className="sr-only" htmlFor={id}>
        Search
      </label>
      <input
        id={id}
        className="absolute text-sm h-full py-5 top-1/2 lg:hover:border-brand-secondary focus:outline-none lg:focus:border-brand-secondary border-2 border-secondary rounded-lg placeholder:text-accent-5 -translate-y-1/2 w-full px-2 bg-white transition"
        placeholder="Search for products..."
        defaultValue={router.query.q}
        onKeyUp={handleKeyUp}
      />
      <div className={s.iconContainer}>
        <svg className={s.icon} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          />
        </svg>
      </div>
    </div>
  )
}

export default memo(Searchbar)
