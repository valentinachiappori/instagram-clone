import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '75%',
    paddingTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#DBDBDB',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 15,
  },
  emptyComments: {
    color: '#8E8E8E',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
  inputWrapper: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    paddingTop: 15,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 5,
    minHeight: 60,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 14,
    backgroundColor: '#FAFAFA',
  },
  publishButton: {
    backgroundColor: '#6C8EEF',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  publishButtonDisabled: {
    backgroundColor: '#B2C6FB',
  },
  publishButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});