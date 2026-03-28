import React from 'react';
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";
import ClasesClient from "./ClasesClient"; 

export default async function AdminClasesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: modulos } = await supabase.from('modulos').select('*').order('orden', { ascending: true });
  const { data: clases } = await supabase.from('clases_grabadas').select('*').order('created_at', { ascending: false });

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <ClasesClient modulos={modulos || []} clases={clases || []} />
    </div>
  );
}