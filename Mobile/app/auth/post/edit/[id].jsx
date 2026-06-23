import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { object, string } from 'yup';
import { useAuth } from '../../../../context/AuthContext';
import { getPost, editPost } from '../../../../services/postService';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import ErrorMessage from '../../../../components/ErrorMessage';

const editPostSchema = object({
  description: string().required('La descripción es obligatoria'),
  imageUrl: string().required('La imagen es obligatoria').url('Ingresá una URL de imagen válida'),
});

export default function EditPost() {
  const { id } = useLocalSearchParams();
  const { token } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageError, setImageError] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getPost(id, token)
      .then((post) => {
        setImageUrl(post.image || '');
        setDescription(post.description || '');
      })
      .catch(() => setError('No se pudo cargar el post.'))
      .finally(() => setFetching(false));
  }, [id]);

  const handleSubmit = async () => {
    setError(null);

    try {
      editPostSchema.validateSync({ description, imageUrl });
    } catch (validationError) {
      setError(validationError.message);
      return;
    }

    setLoading(true);
    try {
      await editPost(id, description, imageUrl, token);
      router.replace(`/auth/post/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0095F6" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar publicación</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Input
          style={styles.urlInput}
          placeholder="http://urlvalida.com.ar/algunaImagen.png"
          value={imageUrl}
          onChangeText={(text) => {
            setImageUrl(text);
            setImageError(false);
          }}
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

        <Button onPress={handleSubmit} loading={loading} style={styles.publishButton}>
          Publicar
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  contentContainer: {
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
    aspectRatio: 0.7,
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
    backgroundColor: '#495DF9B2',
    marginTop: 16,
  },
});
