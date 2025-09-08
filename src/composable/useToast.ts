// composables/useToast.ts
import { ref } from 'vue'

// Kiểu dữ liệu cho một Toast
export interface Toast {
    id: number
    show: boolean
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
    duration: number
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center'
    closable: boolean
}

// Type cho options khi tạo toast (không bao gồm id và show)
export interface CreateToastOptions extends Partial<Omit<Toast, 'id' | 'show'>> {
    message: string
}

// Type cho options của các method tiện lợi (không bao gồm id, show, type, message)
export type ConvenienceToastOptions = Partial<Omit<Toast, 'id' | 'show' | 'message' | 'type'>>

export const useToast = () => {
    // Vue sẽ tự động infer type là Ref<Toast[]>
    const toasts = ref<Toast[]>([])
    let toastId = 0

    const addToast = (options: CreateToastOptions): number => {
        const id = toastId++
        const toast: Toast = {
            id,
            show: true,
            type: options.type ?? 'info',
            message: options.message,
            duration: options.duration ?? 3000,
            position: options.position ?? 'top-right',
            closable: options.closable ?? true,
        }

        toasts.value.push(toast)

        // Tự động remove sau duration
        if (toast.duration > 0) {
            setTimeout(() => {
                removeToast(id)
            }, toast.duration)
        }

        return id
    }

    const removeToast = (id: number): void => {
        const index = toasts.value.findIndex(t => t.id === id)
        if (index !== -1) {
            toasts.value.splice(index, 1)
        }
    }

    const clearAllToasts = (): void => {
        toasts.value = []
    }

    // Các method tiện lợi với type safety
    const success = (message: string, options: ConvenienceToastOptions = {}): number =>
        addToast({ ...options, type: 'success', message })

    const error = (message: string, options: ConvenienceToastOptions = {}): number =>
        addToast({ ...options, type: 'error', message })

    const warning = (message: string, options: ConvenienceToastOptions = {}): number =>
        addToast({ ...options, type: 'warning', message })

    const info = (message: string, options: ConvenienceToastOptions = {}): number =>
        addToast({ ...options, type: 'info', message })

    return {
        toasts,
        addToast,
        removeToast,
        clearAllToasts,
        success,
        error,
        warning,
        info
    } as const
}