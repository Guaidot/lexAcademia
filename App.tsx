
import { Course, Question, UserProgress } from './types';
import React, { useCallback, useMemo, useState } from 'react';

import { About } from './components/About';
import { COURSES, ALL_ACHIEVEMENTS } from './constants';
import { Layout } from './components/Layout';
import { QuizEngine } from './components/QuizEngine';
import { PaymentModal } from './components/PaymentModal';
import { AdminView } from './components/AdminView';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginView } from './components/LoginView';
import { LibraryView } from './components/LibraryView';
import { ProfileView } from './components/ProfileView';
import { CaseStudy } from './components/CaseStudy';
import { LegalCalculator } from './components/LegalCalculator';
import { Dictionary, LatinPractice, TERMS } from './components/Dictionary';
import { CourseModulesView } from './components/CourseModulesView';
import { useAuthSession } from './hooks/useAuthSession';
import { useProgressSync } from './hooks/useProgressSync';
import { usePayments } from './hooks/usePayments';
import { AppProvider, AppContextValue } from './context/AppContext';

const App: React.FC = () => {
  const { user, setUser, handleLogin, handleLogout } = useAuthSession();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeModuleMeta, setActiveModuleMeta] = useState<{ moduleId: string; moduleTitle: string } | null>(null);
  const { progress, setProgress, isSyncing } = useProgressSync({ user, onBlockedUser: handleLogout });
  const { payingCourse, setPayingCourse, handleConfirmPayment } = usePayments({ user, setProgress });

  const getDateKey = (value: string) => {
    const d = new Date(value);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const getWeekStart = (value: string) => {
    const d = new Date(value);
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1) - day; // Monday as start
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
  };

  const getMonthKey = (value: string) => {
    const d = new Date(value);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  };

  const getWeekDates = (startIso: string) => {
    const start = new Date(startIso);
    start.setHours(0, 0, 0, 0);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d.toISOString();
    });
  };

  const stats = useMemo(() => {
    const totalQuestions = COURSES.reduce((acc, c) => acc + (c.preguntas?.length || 0), 0);
    const masteredCount = progress.answeredQuestionIds.length;
    const globalAccuracy = progress.totalAttempts > 0 ? Math.round((progress.correctAnswers / progress.totalAttempts) * 100) : 0;
    const courseStats = COURSES.map(course => {
      const mastered = (course.preguntas || []).filter(p => progress.answeredQuestionIds.includes(p.id)).length;
      const masteredPercent = course.preguntas.length > 0 ? Math.round((mastered / course.preguntas.length) * 100) : 0;
      const isUnlocked = !course.isPremium || progress.unlockedCourseIds.includes(course.id);
      const latestPayment = [...progress.payments].filter(p => p.courseId === course.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
      return { id: course.id, masteredPercent, isUnlocked, status: latestPayment?.status || null };
    });
    return { globalAccuracy, masteredCount, totalQuestions, courseStats, lexCoins: progress.lexCoins };
  }, [progress]);

  const termOfDay = useMemo(() => {
    const today = new Date();
    const key = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    let hash = 0;
    for (let i = 0; i < key.length; i += 1) hash += key.charCodeAt(i);
    return TERMS[hash % TERMS.length];
  }, []);

  const handleStartCourse = (courseId: string) => {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return;
    if (course.isPremium && !progress.unlockedCourseIds.includes(course.id)) {
      const hasFreeModule = course.modules?.some(m => m.isPremium === false);
      if (hasFreeModule) {
        setSelectedCourse(course);
        setActiveQuestions([]);
        setShowQuiz(false);
        return;
      }
      const s = stats.courseStats.find(x => x.id === course.id);
      if (s?.status === 'pending') return alert("Tu pago está siendo revisado por un administrador.");
      setPayingCourse(course);
      return;
    }
    if (!course.modules || course.modules.length === 0) {
      setActiveQuestions(course.preguntas);
      setSelectedCourse(course);
      setShowQuiz(true);
      return;
    }
    setSelectedCourse(course);
    setActiveQuestions([]);
    setShowQuiz(false);
  };

  const handleStartModuleQuiz = (questions: Question[], courseTitle: string, moduleId?: string, moduleTitle?: string) => {
    if (!selectedCourse) return;
    setActiveQuestions(questions);
    setSelectedCourse({ ...selectedCourse, titulo: courseTitle });
    if (moduleId && moduleTitle) {
      setActiveModuleMeta({ moduleId, moduleTitle });
    } else {
      setActiveModuleMeta(null);
    }
    setShowQuiz(true);
  };

  const recommendedCourse = useMemo(() => {
    const ordered = COURSES.map(course => {
      const mastered = (course.preguntas || []).filter(p => progress.answeredQuestionIds.includes(p.id)).length;
      const percent = course.preguntas.length > 0 ? Math.round((mastered / course.preguntas.length) * 100) : 0;
      return { course, percent };
    }).sort((a, b) => a.percent - b.percent);
    return ordered.find(c => c.percent < 100)?.course || ordered[0]?.course || null;
  }, [progress]);

  const unlockedCount = useMemo(() => {
    const freeCount = COURSES.filter(c => !c.isPremium).length;
    const premiumUnlocked = progress.unlockedCourseIds.length;
    return freeCount + premiumUnlocked;
  }, [progress.unlockedCourseIds]);

  if (!user) return <LoginView onLogin={handleLogin} />;

  const handleNavigateTab = useCallback((tab: string) => {
    setActiveTab(tab);
    setShowQuiz(false);
    if (tab !== 'courses') {
      setSelectedCourse(null);
      setActiveQuestions([]);
    }
  }, []);

  const handleAppLogout = async () => {
    await handleLogout();
    setActiveTab('dashboard');
    setShowQuiz(false);
    setSelectedCourse(null);
    setActiveQuestions([]);
  };

  const appContextValue = useMemo<AppContextValue>(() => ({
    user,
    setUser,
    progress,
    setProgress,
    activeTab,
    setActiveTab: handleNavigateTab,
    isSyncing,
    onLogout: handleAppLogout
  }), [activeTab, handleAppLogout, handleNavigateTab, isSyncing, progress, setProgress, setUser, user]);

  const renderContent = () => {
    if (showQuiz && selectedCourse) {
      return (
        <QuizEngine questions={activeQuestions} onFinish={() => {
          if (activeModuleMeta) {
            const completedAt = new Date().toISOString();
            setProgress(prev => ({
              ...prev,
              lastCompletedModule: {
                courseId: selectedCourse.id,
                courseTitle: selectedCourse.titulo,
                moduleId: activeModuleMeta.moduleId,
                moduleTitle: activeModuleMeta.moduleTitle,
                completedAt
              }
            }));
          }
          setActiveModuleMeta(null);
          setShowQuiz(false);
        }} onQuestionResult={(id, correct, pts) => {
          setProgress(prev => {
            const now = new Date().toISOString();
            const lastKey = prev.lastStudyDate ? getDateKey(prev.lastStudyDate) : '';
            const todayKey = getDateKey(now);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayKey = getDateKey(yesterday.toISOString());

            let nextStreak = prev.streakDays || 0;
            if (lastKey !== todayKey) {
              nextStreak = lastKey === yesterdayKey ? nextStreak + 1 : 1;
            }

            const weekStart = getWeekStart(now);
            const weekStartKey = getDateKey(weekStart);
            const prevWeekStartKey = prev.weeklyStartDate ? getDateKey(prev.weeklyStartDate) : '';
            let nextWeeklyCount = prev.weeklyCount || 0;
            let nextWeeklyStart = prev.weeklyStartDate || weekStart;
            if (prevWeekStartKey !== weekStartKey) {
              nextWeeklyCount = 0;
              nextWeeklyStart = weekStart;
            }
            if (lastKey !== todayKey) {
              nextWeeklyCount += 1;
            }

            const nextStudyDays = Array.isArray(prev.studyDays) ? [...prev.studyDays] : [];
            if (!nextStudyDays.includes(todayKey)) {
              nextStudyDays.push(todayKey);
            }

            const nextMonthlyStudy = { ...(prev.monthlyStudy || {}) };
            if (lastKey !== todayKey) {
              const monthKey = getMonthKey(now);
              nextMonthlyStudy[monthKey] = (nextMonthlyStudy[monthKey] || 0) + 1;
            }

            const nextAchievements = Array.isArray(prev.achievements) ? [...prev.achievements] : [];
            const unlockAchievement = (id: string) => {
              if (nextAchievements.some(a => a.id === id)) return;
              const meta = ALL_ACHIEVEMENTS.find(a => a.id === id);
              if (!meta) return;
              nextAchievements.push({ ...meta, unlockedAt: now });
            };
            if (nextStreak >= 3) unlockAchievement('streak-3');
            if (nextStreak >= 7) unlockAchievement('streak-7');
            if (nextStreak >= 14) unlockAchievement('streak-14');

            return {
              ...prev,
              correctAnswers: prev.correctAnswers + (correct ? 1 : 0),
              totalAttempts: prev.totalAttempts + 1,
              answeredQuestionIds: correct ? Array.from(new Set([...prev.answeredQuestionIds, id])) : prev.answeredQuestionIds,
              lexCoins: prev.lexCoins + pts,
              lastStudyDate: now,
              streakDays: nextStreak,
              weeklyCount: nextWeeklyCount,
              weeklyStartDate: nextWeeklyStart,
              weeklyGoal: prev.weeklyGoal || 3,
              studyDays: nextStudyDays,
              monthlyStudy: nextMonthlyStudy,
              achievements: nextAchievements
            };
          });
        }} courseTitle={selectedCourse.titulo} />
      );
    }

    switch(activeTab) {
      case 'dashboard':
        if (user.role === 'admin') {
          return <AdminDashboard />;
        }
        return (
          <div className="space-y-6 sm:space-y-10 animate-fadeIn">
            {isSyncing && (
              <div className="bg-amber-500 text-slate-900 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-3 animate-pulse fixed top-20 right-10 z-50 shadow-2xl">
                 <i className="fa-solid fa-cloud-arrow-down"></i> Sincronizando datos...
              </div>
            )}
            <section className="bg-slate-900 rounded-[2rem] sm:rounded-[3.5rem] p-6 sm:p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="max-w-2xl">
                  <h1 className="text-2xl sm:text-5xl font-black tracking-tighter leading-tight mb-3 sm:mb-4">Domina la Jurisprudencia.</h1>
                  <p className="text-slate-400 text-xs sm:text-lg font-medium leading-relaxed mb-6 sm:mb-8">Entrenamiento legal de alto nivel basado en la LOTTT y el C.C. vigente.</p>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => setActiveTab('courses')} className="bg-amber-500 text-slate-900 px-6 py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-white transition-all shadow-xl">Entrenar Ahora</button>
                    {recommendedCourse && (
                      <button
                        onClick={() => { setActiveTab('courses'); handleStartCourse(recommendedCourse.id); }}
                        className="bg-white/10 text-white px-6 py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest border border-white/10 hover:bg-white/20 transition-all"
                      >
                        Continuar
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-white/10 border border-white/10 rounded-2xl p-4 max-w-sm w-full lg:w-80 lg:ml-auto">
                  <p className="text-[9px] font-black uppercase tracking-widest text-amber-400">Termino del dia</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <h3 className="text-base sm:text-lg font-black text-white">{termOfDay.term}</h3>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 bg-white/10 px-2 py-0.5 rounded-full">
                      {termOfDay.category}
                    </span>
                  </div>
                  <p className="text-slate-200 text-[11px] sm:text-xs mt-2 leading-relaxed">
                    {termOfDay.definition}
                  </p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-3">
                    {termOfDay.basis}
                  </p>
                </div>
              </div>
              <i className="fa-solid fa-scale-balanced absolute -bottom-20 -right-20 text-white/5 text-[180px] sm:text-[320px]"></i>
            </section>

            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <DashboardStat label="Precision" value={`${stats.globalAccuracy}%`} icon="fa-bullseye" color="text-emerald-600" />
              <DashboardStat label="Preguntas" value={`${stats.masteredCount}/${stats.totalQuestions}`} icon="fa-list-check" color="text-slate-900" />
              <DashboardStat label="Progreso" value={stats.lexCoins} icon="fa-chart-line" color="text-emerald-600" />
              <DashboardStat label="Materias" value={unlockedCount} icon="fa-book" color="text-indigo-600" />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-5 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Racha activa</p>
                  <p className="text-2xl font-black text-slate-900">{progress.streakDays || 0} dias</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                  <i className="fa-solid fa-fire"></i>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-5 lg:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Meta semanal</p>
                  <div className="flex items-center gap-2">
                    <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest">
                      {(progress.weeklyCount || 0)}/{progress.weeklyGoal || 3} dias
                    </p>
                    <select
                      value={progress.weeklyGoal || 3}
                      onChange={(e) => setProgress(prev => ({ ...prev, weeklyGoal: Number(e.target.value) }))}
                      className="text-[9px] font-black uppercase tracking-widest bg-white border border-slate-200 rounded-lg px-2 py-1"
                    >
                      {[2,3,4,5,6,7].map(v => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: `${Math.min(100, Math.round(((progress.weeklyCount || 0) / (progress.weeklyGoal || 3)) * 100))}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">Completa estudios en dias distintos para mantener la racha.</p>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-slate-100 shadow-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Calendario semanal</p>
                <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center">
                {getWeekDates(getWeekStart(new Date().toISOString())).map((iso) => {
                  const key = getDateKey(iso);
                  const studied = (progress.studyDays || []).includes(key);
                  const day = new Date(iso).toLocaleDateString('es-VE', { weekday: 'short' });
                  return (
                    <div key={key} className={`rounded-xl border ${studied ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'} p-2`}
                    >
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">{day}</p>
                      <div className={`w-3 h-3 rounded-full mx-auto mt-2 ${studied ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                    </div>
                  );
                })}
              </div>
            </section>

            {recommendedCourse && (
              <section className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Siguiente recomendado</p>
                  <h3 className="text-lg sm:text-2xl font-black text-slate-900">{recommendedCourse.titulo}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-xl">Avanza con el siguiente modulo y mejora tu progreso general.</p>
                </div>
                <button
                  onClick={() => { setActiveTab('courses'); handleStartCourse(recommendedCourse.id); }}
                  className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-amber-500 hover:text-slate-900 transition-all"
                >
                  Continuar
                </button>
              </section>
            )}

            {progress.lastCompletedModule && (
              <section className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ultimo modulo completado</p>
                  <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest">
                    {new Date(progress.lastCompletedModule.completedAt).toLocaleDateString()}
                  </p>
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-slate-900">
                  {progress.lastCompletedModule.moduleTitle}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm font-medium">
                  {progress.lastCompletedModule.courseTitle}
                </p>
              </section>
            )}

            <section className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg sm:text-2xl font-black text-slate-900">Progreso por Materia</h3>
                <button onClick={() => setActiveTab('courses')} className="text-[9px] font-black uppercase tracking-widest text-amber-600">Ver todas</button>
              </div>
              <div className="space-y-4">
                {COURSES.map((course) => {
                  const s = stats.courseStats.find(x => x.id === course.id);
                  const moduleCount = course.modules?.length || 0;
                  const isUnlocked = s?.isUnlocked;
                  return (
                    <div key={course.id} className="border border-slate-100 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-xl ${course.color} text-white flex items-center justify-center`}>
                          <i className={`fa-solid ${course.icono}`}></i>
                        </div>
                        <div className="min-w-0">
                          <p className="font-black text-slate-900 text-sm sm:text-base truncate">{course.titulo}</p>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{moduleCount} modulos</p>
                        </div>
                      </div>
                      <div className="flex-1 w-full">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Progreso</span>
                          <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">{s?.masteredPercent || 0}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: `${s?.masteredPercent || 0}%` }}></div>
                        </div>
                      </div>
                      <div>
                        {isUnlocked ? (
                          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Activa</span>
                        ) : s?.status === 'pending' ? (
                          <span className="text-[9px] font-black uppercase tracking-widest text-amber-600">En revision</span>
                        ) : (
                          <span className="text-[9px] font-black uppercase tracking-widest text-rose-500">Bloqueada</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        );
      case 'courses':
        return (
          selectedCourse ? (
            <CourseModulesView
              course={selectedCourse}
              onBack={() => setSelectedCourse(null)}
              onStartQuiz={handleStartModuleQuiz}
              isCourseUnlocked={progress.unlockedCourseIds.includes(selectedCourse.id)}
              onRequestAccess={() => setPayingCourse(selectedCourse)}
            />
          ) : (
            <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto pb-20">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                 {COURSES.map((course) => {
                   const s = stats.courseStats.find(x => x.id === course.id);
                   return (
                     <div key={course.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all flex flex-col group">
                        <div className={`h-40 ${course.color} flex items-center justify-center text-white relative`}>
                           <i className={`fa-solid ${course.icono} text-5xl group-hover:scale-110 transition-transform`}></i>
                           {course.isPremium && !s?.isUnlocked && (
                             <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md p-2 rounded-lg">
                                <i className="fa-solid fa-lock text-white/70"></i>
                             </div>
                           )}
                        </div>
                        <div className="p-8 flex-1 flex flex-col justify-between">
                           <div className="mb-6">
                             <h3 className="text-xl font-black text-slate-900 mb-2">{course.titulo}</h3>
                             <p className="text-slate-500 font-medium text-xs leading-relaxed">{course.descripcion}</p>
                           </div>
                           <button onClick={() => handleStartCourse(course.id)} className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${s?.isUnlocked ? 'bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-900' : 'bg-amber-500 text-slate-900 hover:bg-slate-900 hover:text-white'}`}>
                              {s?.isUnlocked ? 'Entrar' : `Comprar Acceso ($${course.price})`}
                           </button>
                        </div>
                     </div>
                   );
                 })}
               </div>
            </div>
          )
        );
      case 'expedientes': return <CaseStudy onOpenLibrary={() => setActiveTab('library')} />;
      case 'calculator': return <LegalCalculator />;
      case 'dictionary': return <Dictionary />;
      case 'latin-practice': return <LatinPractice />;
      case 'library': return <LibraryView />;
      case 'profile': return <ProfileView />;
      case 'admin': return <AdminView />;
      case 'about': return <About onExplore={() => setActiveTab('courses')} />;
      default: return <About onExplore={() => setActiveTab('courses')} />;
    }
  };

  return (
    <AppProvider value={appContextValue}>
      <Layout>
        {payingCourse && <PaymentModal course={payingCourse} onClose={() => setPayingCourse(null)} onConfirm={handleConfirmPayment} />}
        {renderContent()}
      </Layout>
    </AppProvider>
  );
};

export default App;

const DashboardStat = ({ label, value, icon, color }: { label: string; value: string | number; icon: string; color: string }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-4 sm:p-5 flex items-center justify-between">
    <div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className={`text-lg sm:text-2xl font-black ${color}`}>{value}</p>
    </div>
    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
      <i className={`fa-solid ${icon}`}></i>
    </div>
  </div>
);
