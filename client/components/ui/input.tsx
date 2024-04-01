import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "./button"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  togglePassword?: boolean
  disableToggle?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ disableToggle, togglePassword, className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background dark:bg-oupia-sub px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {(togglePassword) && (
          <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center">
            {!showPassword ? (
              <Button disabled={disableToggle} type="button" variant={"ghost"} className=" h-[80%] hover:bg-background p-0 focus-visible:ring-0 " onClick={() => setShowPassword(true)}>
                <Eye
                  className="cursor-pointer"
                  size={20}
                />
              </Button>
            ) : (
              <Button disabled={disableToggle} type="button" variant={"ghost"} className=" h-[80%] hover:bg-background p-0 focus-visible:ring-0" onClick={() => setShowPassword(false)}>
                <EyeOff
                  className="cursor-pointer"
                  size={20}
                />
              </Button>
            )}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
