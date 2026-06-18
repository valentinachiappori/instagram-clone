import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';
import { object, string } from 'yup';
import { createPost } from '../../../services/postService'; 
import { useRouter } from 'expo-router'; 
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import ErrorMessage from '../../../components/ErrorMessage';

const createPostSchema = object({
  description: string().required("La descripción es obligatoria"),
  imageUrl: string().required("La imagen es obligatoria").url("Ingresá una URL de imagen válida"),
});

export default function Create() {
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();
  const { token } = useAuth();

  const handleSubmit = async () => {
    setError(null);

    try {
      createPostSchema.validateSync({ description, imageUrl });
    } catch (validationError) {
      setError(validationError.message);
      return;
    }
    
    setLoading(true);
    try {
      const post = await createPost(imageUrl, description, token);
      router.push(`/auth/post/${post.id}`);
      setImageUrl("");
      setDescription("");
      setImageError(false);
    } catch (err) {
      if (err.response?.status === 401) { 
        router.replace('/login'); 
        return; 
      }
      setError(err.response?.data?.errors?.[0] || err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crear publicacion</Text>
      </View>

      <View style={styles.content}>
        <Input
          style={styles.urlInput}
          placeholder="Image"
          value={imageUrl}
          onChangeText={(text) => {
            setImageUrl(text);
            setImageError(false);}}
          autoCapitalize="none"
        />

        <View style={styles.previewContainer}>
          {imageUrl && !imageError ? (
            <Image 
              source={{ uri: imageUrl }} 
              style={styles.previewImage}
              onError={() => setImageError(true)} 
            />
          ) : (
            <View style={styles.placeholderBox}>
              <Ionicons name="camera-outline" size={60} color="#333" />
              <Text style={styles.placeholderText}>Agregar imagen</Text>
            </View>
          )}
        </View>

        <TextInput
          style={styles.descriptionInput}
          placeholder="Agrega un comentario"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <ErrorMessage message={error} />

        <Button 
          onPress={handleSubmit} 
          loading={loading}
          style={styles.publishButton}
        >
          Publicar
        </Button>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
  },
  urlInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 0, 
  },
  previewContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderBox: {
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#333',
    marginTop: 8,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderTopWidth: 0, 
    padding: 12,
    fontSize: 14,
    minHeight: 60,
    marginBottom: 16,
  },
  publishButton: {
    backgroundColor: '#7C89FF', 
    marginTop: 'auto',
  }
});