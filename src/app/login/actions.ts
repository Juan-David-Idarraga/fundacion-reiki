'use server';

import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  // 1. Intentamos iniciar sesión
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // Si falla, lo devolvemos al login con el mensaje de error
  if (error) {
    return redirect("/login?error=Correo o contraseña incorrectos");
  }

  // 2. Si entra bien, le preguntamos a la base de datos QUÉ ROL TIENE
  const { data: perfil } = await supabase
    .from('perfiles')
    .select('rol')
    .eq('id', authData.user.id)
    .single();

  // 3. El cruce de caminos: Lo mandamos a su lugar correspondiente
  if (perfil?.rol === 'admin') {
    redirect('/admin');
  } else {
    redirect('/intranet');
  }
}