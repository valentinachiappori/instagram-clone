import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { SplashScreen } from '../../components/SplashScreen';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ErrorMessage from '../../components/ErrorMessage';
import { styles } from './register.styles';
import { object, string } from "yup";

const registerSchema = object({
    name: string().required("El nombre es obligatorio"),
    email: string().required("El email es obligatorio").email("El email no tiene un formato válido"),
    password: string().required("La contraseña es obligatoria").min(5, "La contraseña tiene menos de 5 caracteres").max(32, "La contraseña supera los 32 caracteres"),
    image: string().url("La imagen debe ser una URL válida"),
});


export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [localError, setLocalError] = useState('');

  const { signUp, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) return <SplashScreen />;

  const handleRegister = async () => {
    setLocalError('');
    try {
      registerSchema.validateSync({ name, email, password, image });
    } catch (validationError) {
      setLocalError(validationError.message);
      return;
    }
    try {
      await signUp(email, name, password, image);
      router.replace('/');
    } catch (err) {
      setLocalError('Error al crear la cuenta. Intentalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/splash.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.subtitle}>
        Regístrate para ver fotos y videos de tus amigos.
      </Text>

      <ErrorMessage message={localError} />

      <Input
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Nombre completo"
        value={name}
        onChangeText={setName}
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Input
        placeholder="Imagen (URL)"
        value={image}
        onChangeText={setImage}
        keyboardType="url"
        autoCapitalize="none"
      />

      <Button onPress={handleRegister} loading={isLoading}>
        Registrarte
      </Button>

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿Tienes una cuenta?</Text>
        <Link href="/noauth/login" asChild>
          <TouchableOpacity>
            <Text style={styles.link}>Inicia sesión</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
