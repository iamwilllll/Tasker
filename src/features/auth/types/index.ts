import type { UserT } from '@/types';
export type LoginT = { email: string; password: string };

export type RegisterT = {
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type ForgotPasswordT = {
    email: string;
};

export type UpdateUserT = UserT;
