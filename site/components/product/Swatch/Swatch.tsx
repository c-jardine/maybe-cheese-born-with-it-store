import cn from 'clsx'
import React from 'react'
import s from './Swatch.module.css'
import { Check } from '@components/icons'
import Button, { ButtonProps } from '@components/ui/Button'
import { isDark } from '@lib/colors'

interface SwatchProps {
  active?: boolean
  children?: any
  className?: string
  variant?: 'size' | 'color' | string
  color?: 'yellow' | 'pink' | string
  label?: string | null
}

const Swatch: React.FC<Omit<ButtonProps, 'variant'> & SwatchProps> = ({
  active,
  className,
  color = '',
  label = null,
  variant = 'size',
  ...props
}) => {
  variant = variant?.toLowerCase()

  if (label) {
    label = label?.toLowerCase()
  }

  const swatchClassName = cn(
    s.swatch,
    {
      [s.color]: color,
      [s.active]: active,
      [s.size]: variant === 'size',
      [s.dark]: color ? isDark(color) : false,
      [s.textLabel]: !color && label && label.length > 3,
    },
    className
  )

  const colorName = (color: string) => {
    if (color === 'yellow') {
      return '#eab308'
    } else if (color === 'pink') {
      return '#ec4899'
    }
  }

  return (
    <Button
      role="option"
      aria-selected={active}
      aria-label={variant && label ? `${variant} ${label}` : 'Variant Swatch'}
      className={swatchClassName}
      {...(label && color && { title: label })}
      style={color ? { backgroundColor: colorName(color) } : {}}
      {...props}
    >
      {color && active && (
        <span>
          <Check />
        </span>
      )}
      <span className="text-[12px]">{!color ? label : null}</span>
    </Button>
  )
}

export default React.memo(Swatch)
