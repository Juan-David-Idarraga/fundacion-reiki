import React from 'react';
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";
import AlumnosClient from "./AlumnosClient";

export default async function AdminAlumnosPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: alumnos } = await supabase
    .from('perfiles')
    .select('*')
    .order('nombre', { ascending: true });

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <AlumnosClient alumnos={alumnos || []} />
    </div>
  );
}