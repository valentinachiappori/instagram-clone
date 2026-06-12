import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { SplashScreen } from '../../components/SplashScreen';
import { styles } from '../../styles/register.styles';

export default function Register() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  
  const { signUp, isLoading } = useAuth();
  const router = useRouter();

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

  if (isLoading) {
    return <SplashScreen />;
  }

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

      {localError ? <Text style={styles.errorText}>{localError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Número de celular o correo electrónico"
        placeholderTextColor="#8E8E8E"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        placeholderTextColor="#8E8E8E"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        placeholderTextColor="#8E8E8E"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
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
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Registrarte</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿Tienes una cuenta?</Text>
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text style={styles.link}>Inicia sesión</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}