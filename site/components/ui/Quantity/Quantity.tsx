import React, { FC } from 'react'
import s from './Quantity.module.css'
import { Cross, Plus, Minus, Trash } from '@components/icons'
import cn from 'clsx'


export interface QuantityProps {
  value: number
  increase: () => any
  decrease: () => any
  handleRemove: React.MouseEventHandler<HTMLButtonElement>
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  max?: number
}

const Quantity: FC<QuantityProps> = ({
  value,
  increase,
  decrease,
  handleChange,
  handleRemove,
  max = 6,
}) => {
  return (
    <div className="flex flex-row items-center h-9">
      <button
        className="p-2 rounded-full bg-[#dc2626] hover:bg-[#ef4444] transition"
        onClick={handleRemove}
      >
        <Trash width={20} height={20} />
      </button>
      <label className="w-full border-secondary rounded-lg border-2 mx-2 h-full">
        <input
          className={s.input}
          onChange={(e) =>
            Number(e.target.value) < max + 1 ? handleChange(e) : () => {}
          }
          value={value}
          type="number"
          max={max}
          min="0"
          readOnly
        />
      </label>
      <button
        type="button"
        onClick={decrease}
        className={s.actions}
        style={{ marginLeft: '-1px' }}
        disabled={value <= 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 stroke-[3]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
        </svg>
      </button>
      <button
        type="button"
        onClick={increase}
        className={`${cn(s.actions)} !ml-1`}
        style={{ marginLeft: '-1px' }}
        disabled={value < 1 || value >= max}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 stroke-[3]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  )
}

export default Quantity
