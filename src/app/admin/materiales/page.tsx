import React, { Suspense } from 'react';
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import MaterialesClient from "./MaterialesClient";

async function MaterialesData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: modulos } = await supabase.from('modulos').select('*').order('orden');
  const { data: materiales } = await supabase.from('materiales').select('*');

  return <MaterialesClient modulos={modulos || []} materiales={materiales || []} />;
}

export default function AdminMaterialesPage() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Suspense fallback={<div className="p-10 animate-pulse text-[10px] font-black uppercase tracking-widest text-stone-400">Cargando biblioteca...</div>}>
        <MaterialesData />
      </Suspense>
    </div>
  );
}