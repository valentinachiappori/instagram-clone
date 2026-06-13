import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { SplashScreen } from '../../components/SplashScreen';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ErrorMessage from '../../components/ErrorMessage';
import { styles } from '../../styles/login.styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const { signIn, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) return <SplashScreen />;

  const handleLogin = async () => {
    setLocalError('');
    if (!email || !password) {
      setLocalError('Por favor completá todos los campos.');
      return;
    }
    try {
      await signIn(email, password);
      router.replace('/');
    } catch (err) {
      setLocalError('Error al iniciar sesión. Revisá tus credenciales.');
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

      <ErrorMessage message={localError} />

      <Input
        placeholder="Teléfono, usuario o correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button onPress={handleLogin} loading={isLoading}>
        Iniciar sesión
      </Button>

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿No tienes una cuenta?</Text>
        <Link href="/noauth/register" asChild>
          <TouchableOpacity>
            <Text style={styles.link}>Regístrate</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
