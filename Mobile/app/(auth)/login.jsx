import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { SplashScreen } from '../../components/SplashScreen';
import { styles } from '../../styles/login.styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const { signIn, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return <SplashScreen />;
  }

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

      {localError ? <Text style={styles.errorText}>{localError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Teléfono, usuario o correo electrónico"
        placeholderTextColor="#8E8E8E"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#8E8E8E"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿No tienes una cuenta?</Text>
        <Link href="/register" asChild>
          <TouchableOpacity>
            <Text style={styles.link}>Regístrate</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
