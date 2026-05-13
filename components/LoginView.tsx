
import React, { useEffect, useState } from 'react';
import { UserRole } from '../types';
import { signInUser, signUpUser, resetPassword, getRecoverySessionFromUrl, updateUserPassword } from '../services/supabaseClient';

interface LoginViewProps {
  onLogin: (id: string, name: string, email: string, role: UserRole) => void;
}

type AuthMode = 'login' | 'register' | 'recovery' | 'reset';

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const ADMIN_MASTER_EMAIL = 'geiser80@gmail.com';

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const handleAuthError = (err: any) => {
    console.error("Auth error:", err);
    if (err.message.includes("Invalid login credentials")) {
      setError("Credenciales inválidas. Verifica tu correo y contraseña.");
    } else if (err.message.includes("User already registered")) {
      setError("Este correo ya está registrado. Intenta iniciar sesión.");
    } else {
      setError(err.message || "Ocurrió un error en la autenticación.");
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || !hash.includes('type=recovery')) return;
    resetMessages();
    setMode('reset');
    setIsLoading(true);
    getRecoverySessionFromUrl()
      .then(({ error: sessionError }) => {
        if (sessionError) {
          handleAuthError(sessionError);
          return;
        }
        setSuccess('Enlace verificado. Crea una nueva contraseña.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);
    
    const { data, error: authError } = await signInUser(email, password);
    
    if (authError) {
      handleAuthError(authError);
      setIsLoading(false);
    } else if (data.user) {
      const isAdmin = data.user.email?.toLowerCase() === ADMIN_MASTER_EMAIL;
      completeAuth(
        data.user.id, 
        data.user.user_metadata.full_name || 'Estudiante', 
        data.user.email!, 
        isAdmin ? 'admin' : 'user'
      );
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);

    if (!name.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      setError('Por favor, complete todos los campos.');
      setIsLoading(false);
      return;
    }

    const fullName = `${name.trim()} ${lastName.trim()}`.trim();
    const { data, error: authError } = await signUpUser(email, password, fullName);
    
    if (authError) {
      handleAuthError(authError);
      setIsLoading(false);
    } else if (data.user) {
      setSuccess('¡Registro exitoso! Por favor verifica tu correo electrónico si es necesario o intenta acceder.');
      setIsLoading(false);
      // Opcionalmente podemos auto-loguear si Supabase está configurado sin confirmación de email
      if (data.session) {
        completeAuth(data.user.id, fullName, email, email.toLowerCase() === ADMIN_MASTER_EMAIL ? 'admin' : 'user');
      } else {
        setMode('login');
      }
    }
  };

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);
    
    if (!email.trim()) {
      setError('Ingrese su correo electrónico.');
      setIsLoading(false);
      return;
    }

    const { error: resetError } = await resetPassword(email);
    
    if (resetError) {
      handleAuthError(resetError);
    } else {
      setSuccess('Se ha enviado un enlace de recuperación a tu correo electrónico.');
    }
    setIsLoading(false);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);

    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError('Ingrese y confirme la nueva contraseña.');
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setIsLoading(false);
      return;
    }

    const { error: updateError } = await updateUserPassword(newPassword);

    if (updateError) {
      handleAuthError(updateError);
    } else {
      setSuccess('Contraseña actualizada. Ya puedes iniciar sesión.');
      setNewPassword('');
      setConfirmPassword('');
      setMode('login');
      window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
    }
    setIsLoading(false);
  };

  const completeAuth = (id: string, name: string, email: string, role: UserRole) => {
    setIsAnimating(true);
    setTimeout(() => {
      onLogin(id, name, email, role);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-['Inter']">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className={`max-w-[400px] w-full transition-all duration-500 ${isAnimating ? 'scale-95 opacity-0 blur-xl' : 'scale-100 opacity-100'}`}>
        <div className="text-center mb-6 sm:mb-8 space-y-3">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center mx-auto shadow-2xl rotate-3">
            <i className="fa-solid fa-scale-balanced text-amber-500 text-2xl sm:text-3xl"></i>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tighter uppercase leading-none">LEX ACADEMIA</h1>
            <p className="text-slate-500 font-bold text-[8px] sm:text-[9px] uppercase tracking-[0.3em] mt-2">Acceso a Jurisprudencia</p>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-xl p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-3xl border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500 to-indigo-500"></div>

          {email.toLowerCase().trim() === ADMIN_MASTER_EMAIL && (
            <div className="mb-4 bg-amber-50 border border-amber-100 text-amber-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <i className="fa-solid fa-user-shield"></i>
              Administrador detectado
            </div>
          )}

          {mode !== 'recovery' && mode !== 'reset' ? (
            <div className="flex justify-center gap-6 sm:gap-10 mb-6 sm:mb-8">
              {['login', 'register'].map((m) => (
                <button 
                  key={m}
                  onClick={() => { setMode(m as AuthMode); resetMessages(); }}
                  className={`text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] pb-1 border-b-2 transition-all ${mode === m ? 'text-slate-900 border-amber-500' : 'text-slate-300 border-transparent hover:text-slate-400'}`}
                >
                  {m === 'login' ? 'Acceder' : 'Registrarse'}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center mb-6 sm:mb-8">
              <button 
                onClick={() => { setMode('login'); resetMessages(); }}
                className="text-[9px] sm:text-[10px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-2 mx-auto"
              >
                <i className="fa-solid fa-arrow-left"></i> Volver al Login
              </button>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-2">
                {mode === 'recovery' ? 'Recuperar Acceso' : 'Crear Nueva Contraseña'}
              </h2>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 sm:p-4 bg-rose-50 text-rose-600 rounded-xl sm:rounded-2xl text-[10px] font-bold border border-rose-100 animate-fadeIn flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span>{error}</span>
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 sm:p-4 bg-emerald-50 text-emerald-600 rounded-xl sm:rounded-2xl text-[10px] font-bold border border-emerald-100 animate-fadeIn flex items-center gap-2">
              <i className="fa-solid fa-check-circle"></i>
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={mode === 'login' ? handleLogin : mode === 'register' ? handleRegister : mode === 'recovery' ? handleRecovery : handlePasswordReset} className="space-y-4 sm:space-y-6">
            {mode === 'register' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-3">Nombre</label>
                  <div className="relative group">
                    <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 text-xs transition-colors"></i>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nombre"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl sm:rounded-2xl py-3.5 sm:py-4 pl-10 pr-4 focus:border-amber-400 focus:bg-white outline-none font-bold text-slate-800 text-sm transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-3">Apellido</label>
                  <div className="relative group">
                    <i className="fa-solid fa-id-card absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 text-xs transition-colors"></i>
                    <input 
                      type="text" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Apellido"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl sm:rounded-2xl py-3.5 sm:py-4 pl-10 pr-4 focus:border-amber-400 focus:bg-white outline-none font-bold text-slate-800 text-sm transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {mode !== 'reset' && (
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-3">Correo Electrónico</label>
                <div className="relative group">
                  <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 text-xs transition-colors"></i>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="estudiante@ejemplo.com"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl sm:rounded-2xl py-3.5 sm:py-4 pl-10 pr-4 focus:border-amber-400 focus:bg-white outline-none font-bold text-slate-800 text-sm transition-all"
                  />
                </div>
              </div>
            )}

            {mode !== 'recovery' && mode !== 'reset' && (
              <div className="space-y-1">
                <div className="flex justify-between items-center px-3">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Contraseña</label>
                  {mode === 'login' && (
                    <button 
                      type="button" 
                      onClick={() => { setMode('recovery'); resetMessages(); }}
                      className="text-[9px] font-black text-amber-600 uppercase tracking-widest hover:underline"
                    >
                      ¿Olvidaste?
                    </button>
                  )}
                </div>
                <div className="relative group">
                  <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 text-xs transition-colors"></i>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl sm:rounded-2xl py-3.5 sm:py-4 pl-10 pr-10 focus:border-amber-400 focus:bg-white outline-none font-bold text-slate-800 text-sm transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors">
                    <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
                  </button>
                </div>
              </div>
            )}

            {mode === 'reset' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-3">Nueva Contraseña</label>
                  <div className="relative group">
                    <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 text-xs transition-colors"></i>
                    <input 
                      type={showPassword ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl sm:rounded-2xl py-3.5 sm:py-4 pl-10 pr-10 focus:border-amber-400 focus:bg-white outline-none font-bold text-slate-800 text-sm transition-all"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors">
                      <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-3">Confirmar Contraseña</label>
                  <div className="relative group">
                    <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 text-xs transition-colors"></i>
                    <input 
                      type={showPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl sm:rounded-2xl py-3.5 sm:py-4 pl-10 pr-10 focus:border-amber-400 focus:bg-white outline-none font-bold text-slate-800 text-sm transition-all"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors">
                      <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full bg-slate-900 text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-wait' : 'hover:bg-amber-500 hover:text-slate-900'}`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {mode === 'login' ? 'Iniciar Sesión' : mode === 'register' ? 'Registrarme' : mode === 'recovery' ? 'Recuperar Acceso' : 'Guardar Contraseña'}
                  <i className="fa-solid fa-arrow-right text-amber-500"></i>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center opacity-30">
           <p className="text-slate-500 text-[7px] sm:text-[8px] font-black uppercase tracking-[0.4em]">Lex Academia • Sistema de Autenticación Supabase</p>
        </div>
      </div>
    </div>
  );
};
