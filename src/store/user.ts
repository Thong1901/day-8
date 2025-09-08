// store/user.ts
import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
    state: () => ({
        userid: null as number | null, // ✅ rõ kiểu dữ liệu
    }),
    actions: {
        setUser(id: number) {
            this.userid = id
        }
    }
})
