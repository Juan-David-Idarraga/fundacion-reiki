import React from 'react';
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { Users, PlusCircle } from 'lucide-react';

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Consultas para los contadores de las tarjetas
  const { count: countAlumnos } = await supabase
    .from('perfiles')
    .select('*', { count: 'exact', head: true });

  const { count: countClases } = await supabase
    .from('clases_grabadas')
    .select('*', { count: 'exact', head: true });

  const { count: countModulos } = await supabase
    .from('modulos')
    .select('*', { count: 'exact', head: true });

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans text-stone-800 pb-20">
      
      <header className="mb-10">
        <h2 className="font-serif text-3xl font-bold text-stone-900 italic tracking-tight">Estado de la Academia</h2>
        <p className="text-stone-500 text-sm mt-2 font-medium">Resumen general de tu plataforma y accesos rápidos.</p>
      </header>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-8 rounded-[32px] border border-stone-200 shadow-sm flex flex-col justify-center relative overflow-hidden">
          <p className="text-5xl font-black text-stone-900 mb-2">{countAlumnos || 0}</p>
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Alumnos Activos</p>
        </div>
        
        <div className="bg-white p-8 rounded-[32px] border border-stone-200 shadow-sm flex flex-col justify-center relative overflow-hidden">
          <p className="text-5xl font-black text-stone-900 mb-2">{countClases || 0}</p>
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Clases Grabadas</p>
        </div>
        
        <div className="bg-white p-8 rounded-[32px] border border-stone-200 shadow-sm flex flex-col justify-center relative overflow-hidden">
          <p className="text-5xl font-black text-stone-900 mb-2">{countModulos || 0}</p>
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Módulos Creados</p>
        </div>
      </div>

      {/* Accesos Directos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/clases" className="bg-stone-900 text-white p-8 rounded-[32px] flex items-center justify-between group hover:shadow-2xl hover:shadow-stone-900/20 transition-all hover:-translate-y-1">
          <div>
            <h3 className="font-bold text-xl mb-1">Gestionar Contenido</h3>
            <p className="text-stone-400 text-xs font-medium">Sube videos y organiza tus módulos</p>
          </div>
          <div className="h-14 w-14 bg-amber-500 rounded-full flex items-center justify-center text-stone-900 group-hover:scale-110 group-hover:rotate-90 transition-transform duration-300 shadow-inner">
            <PlusCircle size={28} />
          </div>
        </Link>

        <Link href="/admin/alumnos" className="bg-white border border-stone-200 p-8 rounded-[32px] flex items-center justify-between group hover:border-amber-400 hover:shadow-xl transition-all hover:-translate-y-1">
          <div>
            <h3 className="font-bold text-xl text-stone-900 mb-1">Gestionar Alumnos</h3>
            <p className="text-stone-500 text-xs font-medium">Registra y administra accesos</p>
          </div>
          <div className="h-14 w-14 bg-stone-50 rounded-full flex items-center justify-center text-stone-400 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
            <Users size={28} />
          </div>
        </Link>
      </div>

    </div>
  );
}