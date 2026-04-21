import React from 'react'
import { Button, ButtonProps } from './button'
import LoadingSpinner from './loading-spinner'

interface ButtonWithLoadingProps extends ButtonProps {
  isLoading: boolean
  loadingText?: string
}

const ButtonWithLoading = React.forwardRef<
  HTMLButtonElement,
  ButtonWithLoadingProps
>(({ children, isLoading, loadingText, disabled, ...props }, ref) => {
  return (
    <Button ref={ref} disabled={isLoading || disabled} {...props}>
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" color="currentColor" />
          {loadingText && <span>{loadingText}</span>}
        </>
      ) : (
        children
      )}
    </Button>
  )
})

ButtonWithLoading.displayName = 'ButtonWithLoading'

export default ButtonWithLoading
