import { useCallback, useEffect, useState } from 'react';

// Define the possible theme colors
export type Theme = 'neutral' | 'red' | 'rose' | 'orange' | 'green' | 'blue' | 'yellow' | 'violet'; // Add more themes as needed

/**
 * Sets a cookie with the given name, value, and expiration days.
 * Used for server-side rendering persistence.
 * @param name The name of the cookie.
 * @param value The value to store in the cookie.
 * @param days The number of days until the cookie expires.
 */
const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

/**
 * Applies the selected theme class to the document's root element (<html>).
 * This function is responsible for toggling the CSS classes that define the theme colors.
 * @param theme The theme to apply.
 */
const applyTheme = (theme: Theme) => {
    if (typeof document === 'undefined') {
        return;
    }

    const htmlElement = document.documentElement;

    // Remove all existing theme classes to ensure only one is active at a time.
    // Make sure to list all possible theme classes here.
    const themeClasses = ['theme-neutral', 'theme-rose', 'theme-red', 'theme-green'];
    themeClasses.forEach(cls => htmlElement.classList.remove(cls));

    // Add the class for the currently selected theme.
    // If the theme is 'neutral', we might not need a specific class if it's the default.
    // However, for explicit control, adding 'theme-neutral' is good practice.
    htmlElement.classList.add(`theme-${theme}`);
};

/**
 * Initializes the theme based on localStorage or defaults to 'neutral'.
 * This function should be called once when the application loads to set the initial theme.
 */
export function initializeColorTheme() {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'neutral';
    applyTheme(savedTheme);
}

/**
 * A custom React hook for managing the application's theme color.
 * It provides the current theme and a function to update it.
 * The theme is persisted in localStorage and a cookie.
 */
export function useTheme() {
    // State to hold the current active theme
    const [theme, setTheme] = useState<Theme>('neutral');

    /**
     * Updates the current theme, persists it, and applies the corresponding CSS class.
     * @param newTheme The new theme to set.
     */
    const updateTheme = useCallback((newTheme: Theme) => {
        setTheme(newTheme); // Update React state

        // Store in localStorage for client-side persistence across sessions
        localStorage.setItem('theme', newTheme);

        // Store in cookie for server-side rendering (SSR) consistency
        setCookie('theme', newTheme);

        // Apply the CSS class to the document element
        applyTheme(newTheme);
    }, []); // Dependency array is empty as updateTheme doesn't depend on any external values

    // Effect to initialize the theme when the component mounts
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        // If a theme is saved, use it; otherwise, default to 'neutral'.
        // Call updateTheme to ensure state and DOM class are synchronized.
        updateTheme(savedTheme || 'neutral');
    }, [updateTheme]); // Re-run if updateTheme changes (though it's memoized by useCallback)

    // Return the current theme and the update function
    return { theme, updateTheme } as const;
}
