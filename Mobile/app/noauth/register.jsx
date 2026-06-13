import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { SplashScreen } from '../../components/SplashScreen';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ErrorMessage from '../../components/ErrorMessage';
import { styles } from './register.styles';

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
    if (!email || !name || !password || !image) {
      setLocalError('Por favor completá todos los campos.');
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
