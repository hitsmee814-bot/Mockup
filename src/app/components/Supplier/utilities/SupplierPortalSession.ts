import { toast } from "sonner"

let sessionHandled = false

export const handleSupplierSessionExpired = (
  logout: () => void,
  router: {
    replace: (url: string) => void
  }
) => {
  if (sessionHandled) {
    return
  }

  sessionHandled = true

  logout()

  toast.error(
    "Your session has expired. Please log in again.",
    {
      position: "top-right",
      duration: 3000,
    }
  )

  router.replace("/auth")
}

export const resetSupplierSessionHandled = () => {
  sessionHandled = false
}