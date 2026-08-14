export type TaskT = {
    id: string;
    text: string;
    completed: boolean;
};
export type Theme = 'system' | 'light' | 'dark' | 'shiny';
export type Language = 'en';

export type ExtendedUser = {
    preferences?: {
        theme?: Theme;
        language?: Language;
    };
};
