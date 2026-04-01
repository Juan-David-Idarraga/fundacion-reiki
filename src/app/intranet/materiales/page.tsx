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

export default function MaterialesPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-y-auto custom-scrollbar">
      <Suspense fallback={
        <div className="p-10 animate-pulse">
          <div className="h-10 w-64 bg-stone-200 rounded-full mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-32 bg-stone-100 rounded-[32px]"></div>)}
          </div>
        </div>
      }>
        <MaterialesData />
      </Suspense>
    </div>
  );
}
