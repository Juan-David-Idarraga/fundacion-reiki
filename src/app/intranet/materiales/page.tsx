import React, { Suspense } from 'react';
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import MaterialesAlumnoClient from "./MaterialesAlumnoClient";

async function MaterialesData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Traemos los módulos y los materiales de la base de datos
  const { data: modulos } = await supabase.from('modulos').select('*').order('orden');
  const { data: materiales } = await supabase.from('materiales').select('*').order('created_at', { ascending: false });

  return (
    <MaterialesAlumnoClient 
      modulos={modulos || []} 
      materiales={materiales || []} 
    />
  );
}

export default function MaterialesClient() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h2 className="font-serif text-3xl font-bold text-stone-900 italic">Biblioteca de Estudio</h2>
        <p className="text-stone-500 text-sm mt-2 font-medium">Accede a tus manuales y guías de formación oficial.</p>
      </header>

      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
          {[1,2,3,4].map(i => <div key={i} className="h-24 bg-stone-100 rounded-[32px]"></div>)}
        </div>
      }>
        <MaterialesData />
      </Suspense>
    </div>
  );
}