import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  togglePassword?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ togglePassword, className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {(togglePassword) && (
          <div className="absolute top-1/2 -translate-y-1/2 right-4 ">
            {!showPassword ? (
              <Eye
                className="cursor-pointer"
                size={20}
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <EyeOff
                className="cursor-pointer"
                size={20}
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
