"use client"

import React from "react"
import { Toast } from "./toast"
import { ToastContext } from "./toast-context"

export function Toaster() {
  const { toasts, removeToast } = React.useContext(ToastContext)

  if (toasts.length === 0) return null

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex max-h-screen w-full max-w-[420px] flex-col gap-2 p-4"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}

