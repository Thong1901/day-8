// utils/auth.ts
import Cookies from 'js-cookie';
import axiosClient from '../api/apiUsers';

export interface AuthUser {
    UserID: number;
    FullName: string;
    Email: string;
    Role?: string;
    AvatarURL?: string;
}

class AuthService {
    private tokenKey = 'token';
    private userKey = 'user';

    // Lưu token và user info
    setAuth(token: string, user?: AuthUser, remember: boolean = false) {
        const cookieOptions = {
            expires: remember ? 30 : undefined,
            secure: import.meta.env.PROD, // Vite production check
            sameSite: 'strict' as const
        };

        Cookies.set(this.tokenKey, token, cookieOptions);

        if (user) {
            Cookies.set(this.userKey, JSON.stringify(user), cookieOptions);
        }
    }

    // Lấy token
    getToken(): string | null {
        return Cookies.get(this.tokenKey) || null;
    }

    // Lấy user info
    getUser(): AuthUser | null {
        const userStr = Cookies.get(this.userKey);
        try {
            return userStr ? JSON.parse(userStr) : null;
        } catch (error) {
            console.error('Error parsing user data:', error);
            return null;
        }
    }

    // Kiểm tra đã đăng nhập chưa
    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    // Đăng xuất
    logout() {
        Cookies.remove(this.tokenKey);
        Cookies.remove(this.userKey);

        // Redirect về trang login hoặc home
        window.location.href = '/login';
    }

    // Refresh token (nếu API support)
    async refreshToken() {
        try {
            const response = await axiosClient.post('/auth/refresh');
            if (response.data.token) {
                this.setAuth(response.data.token, response.data.user);
                return response.data.token;
            }
        } catch (error) {
            console.error('Token refresh failed:', error);
            this.logout();
            throw error;
        }
    }

    // Validate token với server
    async validateToken(): Promise<boolean> {
        try {
            const token = this.getToken();
            if (!token) return false;

            const response = await axiosClient.get('/auth/validate');
            return response.status === 200;
        } catch (error) {
            console.error('Token validation failed:', error);
            return false;
        }
    }

    // Update user info
    updateUser(user: Partial<AuthUser>) {
        const currentUser = this.getUser();
        if (currentUser) {
            const updatedUser = { ...currentUser, ...user };
            Cookies.set(this.userKey, JSON.stringify(updatedUser));
        }
    }
}

// Export singleton instance
export const authService = new AuthService();

// Composable cho Vue 3
import { ref, computed } from 'vue';

export function useAuth() {
    const user = ref<AuthUser | null>(authService.getUser());
    const token = ref<string | null>(authService.getToken());

    const isAuthenticated = computed(() => !!token.value);

    const login = (newToken: string, newUser?: AuthUser, remember: boolean = false) => {
        authService.setAuth(newToken, newUser, remember);
        token.value = newToken;
        user.value = newUser || null;
    };

    const logout = () => {
        authService.logout();
        token.value = null;
        user.value = null;
    };

    const updateUser = (userData: Partial<AuthUser>) => {
        if (user.value) {
            user.value = { ...user.value, ...userData };
            authService.updateUser(userData);
        }
    };

    return {
        user,
        token,
        isAuthenticated,
        login,
        logout,
        updateUser
    };
}