# Fundación Reiki Intranet

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

## Visión General (Overview)

La **Fundación Reiki Intranet** es una plataforma web robusta y escalable diseñada para optimizar la gestión interna de la Fundación Reiki. Su objetivo principal es centralizar funcionalidades críticas como la administración de alumnos, avisos, clases y materiales educativos, garantizando una experiencia de usuario segura y eficiente. Este sistema impacta directamente en la eficiencia operativa de la fundación, mejorando la comunicación interna, facilitando el acceso a recursos y automatizando procesos administrativos clave, lo que permite a la fundación enfocarse en su misión principal.

## Características Clave (Key Features)

*   **Gestión de Usuarios y Roles**: Sistema de autenticación y autorización basado en Supabase, con roles definidos (`admin`, `alumno`) para controlar el acceso a diferentes secciones de la plataforma.
*   **Administración de Contenidos**: Módulos dedicados para la creación y gestión de avisos, clases y materiales educativos, facilitando la comunicación y el acceso a recursos.
*   **Control de Suscripciones (Paywall)**: Implementación de un sistema de paywall dinámico que restringe el acceso a contenido premium para usuarios con suscripciones expiradas, con una interfaz clara para la renovación.
*   **Seguridad Reforzada**: Middleware global de seguridad para protección contra ataques comunes (FOUC) y blindaje de Server Actions con verificación de permisos de administrador, asegurando la integridad de los datos.
*   **Diseño Responsivo y UX Mejorada**: Interfaz de usuario optimizada para diversos dispositivos (escritorio, tablet, móvil) con retroalimentación visual (spinners de carga) para una experiencia intuitiva y sin interrupciones.

## Arquitectura y Tecnologías

La `Fundación Reiki Intranet` está construida con un stack tecnológico moderno que prioriza el rendimiento, la escalabilidad y la mantenibilidad. La elección de **Next.js con App Router** permite aprovechar el renderizado del lado del servidor (SSR) y la generación estática (SSG), optimizando la velocidad de carga y la experiencia del usuario. **Supabase** fue seleccionado por su capacidad de proporcionar una base de datos PostgreSQL robusta y servicios de autenticación seguros, reduciendo la complejidad del backend. **Tailwind CSS** facilita un desarrollo ágil y un diseño responsivo y estéticamente coherente.

*   **Framework Frontend**: Next.js (App Router) para aplicaciones web de alto rendimiento, con SSR y optimizaciones de enrutamiento.
*   **Base de Datos & Auth**: Supabase, una plataforma de código abierto para bases de datos PostgreSQL y servicios de autenticación en tiempo real.
*   **Estilos CSS**: Tailwind CSS, un framework CSS utility-first para un diseño rápido y altamente personalizable.
*   **Lenguaje de Programación**: TypeScript, un superset de JavaScript que añade tipado estático para mejorar la calidad y mantenibilidad del código.
*   **Entorno de Ejecución**: Node.js para la ejecución de JavaScript en el servidor.
*   **Despliegue**: Vercel, una plataforma de despliegue continuo optimizada para aplicaciones Next.js.

## Requisitos Previos (Prerequisites)

Para configurar y ejecutar el proyecto en un entorno de desarrollo local, asegúrese de tener instalados los siguientes componentes:

*   **Git**: Sistema de control de versiones.
    ```bash
    # Verificar instalación
    git --version
    ```
*   **Node.js**: Versión 18.x o superior. Incluye `npm` o `pnpm` para la gestión de paquetes.
    ```bash
    # Verificar instalación
    node -v
    npm -v
    ```
*   **pnpm**: Gestor de paquetes eficiente para Node.js.
    ```bash
    # Instalar pnpm si no está disponible
    npm install -g pnpm
    # Verificar instalación
    pnpm -v
    ```
*   **Supabase CLI (Opcional)**: Para desarrollo local de Supabase.

## Guía de Instalación Rápida (Getting Started)

Siga estos pasos para levantar el entorno de desarrollo local:

1.  **Clonar el Repositorio**:
    ```bash
    git clone https://github.com/Juan-David-Idarraga/fundacion-reiki.git
    cd fundacion-reiki
    ```

2.  **Instalar Dependencias**:
    ```bash
    pnpm install
    ```

3.  **Configurar Supabase**:
    *   Cree un nuevo proyecto en [Supabase](https://supabase.com/).
    *   Obtenga su `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
    *   Cree un archivo `.env.local` en la raíz del proyecto y configure las variables de entorno como se muestra en la sección siguiente.

4.  **Ejecutar la Aplicación**:
    ```bash
    pnpm dev
    ```
    La aplicación estará disponible en `http://localhost:3000`.

## Variables de Entorno (Environment Variables)

Cree un archivo `.env.local` en la raíz de su proyecto con las siguientes variables:

```ini
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Opcional: Clave de servicio de Supabase para Server Actions seguras
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Despliegue (Deployment)

Este proyecto está optimizado para ser desplegado en **Vercel**, la plataforma recomendada para aplicaciones Next.js. Vercel ofrece integración continua, despliegues automáticos y escalabilidad sin esfuerzo. Simplemente conecte su repositorio de GitHub a Vercel y configure las variables de entorno necesarias.

---

**Desarrollado por Manus AI**
*Tech Lead & Developer Relations*
