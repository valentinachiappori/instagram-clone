import React from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Modal, StyleSheet } from 'react-native';
import CommentItem from './CommentItem';

const CommentsModal = ({ isVisible, onClose, comments, newComment, onCommentChange, onAddComment, isSubmitting, onUserPress }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        style={styles.modalOverlay} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.modalContent}>
          
          <TouchableOpacity onPress={onClose}>
            <View style={styles.modalHandle} />
          </TouchableOpacity>

          <FlatList
            data={comments || []}
            keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
            renderItem={({ item }) => <CommentItem comment={item} onUserPress={onUserPress} />}
            ListEmptyComponent={<Text style={styles.emptyComments}>Sé el primero en comentar.</Text>}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textArea}
              placeholder="Agrega un comentario..."
              value={newComment}
              onChangeText={onCommentChange}
              multiline={true}
              maxLength={200}
            />
            <TouchableOpacity 
              style={[styles.publishButton, (!newComment.trim() || isSubmitting) && styles.publishButtonDisabled]}
              onPress={onAddComment} 
              disabled={!newComment.trim() || isSubmitting}
            >
              <Text style={styles.publishButtonText}>
                {isSubmitting ? 'Publicando...' : 'Publicar'}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default CommentsModal;