import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { SplashScreen } from '../../components/SplashScreen';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ErrorMessage from '../../components/ErrorMessage';
import { styles } from '../../styles/register.styles';

export default function Register() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const { signUp, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) return <SplashScreen />;

  const handleRegister = async () => {
    setLocalError('');
    if (!email || !fullName || !username || !password) {
      setLocalError('Por favor completá todos los campos.');
      return;
    }
    try {
      await signUp(email, fullName, username, password);
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
        placeholder="Número de celular o correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Nombre completo"
        value={fullName}
        onChangeText={setFullName}
      />
      <Input
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
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
