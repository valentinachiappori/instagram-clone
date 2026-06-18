import React from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import CommentItem from './CommentItem';
import { styles } from './commentsModal.styles';

const CommentsModal = ({ isVisible, onClose, comments, newComment, onCommentChange, onAddComment, isSubmitting }) => {
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
            renderItem={({ item }) => <CommentItem comment={item} />}
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

export default CommentsModal;