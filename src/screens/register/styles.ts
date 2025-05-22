import { StyleSheet } from 'react-native';
import theme from '@/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
    },
    title: {
        fontSize: theme.typography.heading.fontSize,
        fontWeight: theme.typography.heading.fontWeight as any,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
        textAlign: 'center',
    },
    label: {
        fontSize: theme.typography.body.fontSize,
        color: theme.colors.text,
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: theme.colors.accent,
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: theme.spacing.sm,
        color: theme.colors.text,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius,
        alignItems: 'center',
        marginBottom: theme.spacing.xs,
    },
    buttonText: {
        color: theme.colors.white,
        fontWeight: 'bold',
        fontSize: theme.typography.body.fontSize,
    },
    link: {
        color: theme.colors.primary,
        textAlign: 'center',
        fontWeight: '500',
    },
    errorText: {
        fontSize: 10,
        color: 'red',
        position: 'relative',
        top: -7,
        left: 10,
    },
});
