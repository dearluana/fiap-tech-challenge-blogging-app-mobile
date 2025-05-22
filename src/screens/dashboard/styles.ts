import { StyleSheet } from 'react-native';
import theme from '@/styles/theme';

export const styles = StyleSheet.create({
  postCard: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: theme.typography.subheading.fontSize,
    fontWeight: theme.typography.subheading.fontWeight as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  content: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.gray,
    marginBottom: theme.spacing.sm,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius,
  },
  editButton: {
    backgroundColor: theme.colors.accent,
  },
  deleteButton: {
    backgroundColor: theme.colors.accent,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: theme.typography.body.fontSize,
    minWidth: 50,
    textAlign: 'center',
    backgroundColor: theme.colors.accent,
  },
  container: {
    flex: 1,
  },
  addButton: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',   
    alignItems: 'center',     
    marginBottom: 12,
  },
  addButtonText: {
    backgroundColor: theme.colors.primary,
    padding: 9,
    borderRadius: 8,
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  addButtonTextDelete:{
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  searchInput: {
    maxWidth:250,
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: theme.colors.white,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: theme.colors.border,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 6,
  },
  iconButton: {
    marginLeft: 12,
  },
  iconText: {
    fontSize: 20,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  postAuthor: {
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 6,
    color: theme.colors.border,
  },
  postContent: {
    fontSize: 12,
    color: theme.colors.border,
  },
  viewButton: {
    marginTop: 4,
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  viewButtonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  pageButton: {
    padding: 8,
  },
  pageButtonDisabled: {
    opacity: 0.4,
  },
  pageInfo: {
    fontWeight: 'bold',
    color: theme.colors.gray,
  },
  pageTextPrev: {
    color: theme.colors.gray,
  },
  pageTextNext: {
    color: theme.colors.gray,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    padding: 16,
    maxHeight: '80%',
    color: theme.colors.white,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: theme.colors.gray,
  },
  modalAuthor: {
    fontStyle: 'italic',
    marginBottom: 6,
    color: theme.colors.gray,
  },
  modalDate: {
    fontSize: 12,
    color: theme.colors.gray,
    marginBottom: 16,
  },
  modalBody: {
    fontSize: 16,
    color: theme.colors.gray,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 16,
    color: theme.colors.text,
  },
  textarea: {
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 120,
    fontSize: 16,
    textAlignVertical: 'top',
    color: theme.colors.text,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 6,
    alignItems: 'center',
    backgroundColor: theme.colors.accent,
  },
  actionButtonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
});
