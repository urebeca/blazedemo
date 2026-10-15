# Conectar la cuenta de GitHub y subir el proyecto a un repositorio nuevo

Esta guía explica, paso a paso, cómo autenticarse en GitHub y subir el proyecto local `C:\Users\Asus\exp003` a un repositorio **nuevo**, **privado** y vacío en la cuenta `urebeca`.

El proyecto local ya está preparado como repositorio git:

- Es un repositorio git inicializado con la rama `main`.
- Tiene un commit inicial: "Initial commit: BlazeDemo QA documentation and Playwright navigation suite".
- Tiene 40 archivos rastreados.
- Todavía **no** tiene remoto configurado, no está autenticado y no se ha subido.

## 1. Requisitos previos

Antes de empezar, confirma estos datos del entorno real:

- Sistema operativo: Windows. Shell: PowerShell 5.1. Usuario de Windows: `Asus`.
- Proyecto local: `C:\Users\Asus\exp003`.
- Git instalado: versión `2.25.0.windows.1`.
  - Nota: esta versión **no** soporta `git init -b`. Si necesitas fijar la rama se usa `git init` y luego `git symbolic-ref HEAD refs/heads/main`.
  - Sí soporta `git remote add`, `git push` y `git branch -M main`.
- GitHub CLI (`gh`): **no** está instalado en el sistema, pero se instaló de forma portátil en `C:\Users\Asus\tools\bin\gh.exe` (versión 2.102.0).
  - Por eso los comandos se invocan con la ruta completa entre comillas, por ejemplo: `& "C:\Users\Asus\tools\bin\gh.exe" auth login`.
- Cuenta de GitHub objetivo: `urebeca`.
- Nombre del repositorio a crear: `blazedemo`, **privado**.
- El repositorio local usa HTTPS y la rama `main`.
- No hay token ni credenciales almacenadas. El método recomendado es el flujo de dispositivo de `gh auth login` (código de un solo uso).

## 2. Método A (recomendado): autenticar con `gh` usando el flujo de dispositivo

Este método abre el navegador y usa un código de un solo uso. No necesitas crear ni pegar un token manualmente.

### Paso 1: iniciar sesión

Ejecuta en PowerShell:

```powershell
& "C:\Users\Asus\tools\bin\gh.exe" auth login --hostname github.com --git-protocol https --web
```

Qué ocurre:

1. La terminal muestra un **código de un solo uso** con el formato `XXXX-XXXX`.
2. Abre en tu navegador la página `https://github.com/login/device`.
3. Inicia sesión como el usuario `urebeca`.
4. Pega el código `XXXX-XXXX` cuando la página lo solicite.
5. Autoriza el acceso de GitHub CLI.

### Paso 2: verificar la autenticación

```powershell
& "C:\Users\Asus\tools\bin\gh.exe" auth status
```

Si todo está correcto, verás que la sesión está activa para `github.com` con la cuenta `urebeca`.

## 3. Crear el repositorio y subir el proyecto

Una vez autenticado, crea el repositorio remoto y sube el proyecto. El comando `repo create` con `--source .` y `--push` configura el remoto y hace el primer push automáticamente.

### Paso 1: entrar a la carpeta del proyecto

```powershell
cd C:\Users\Asus\exp003
```

### Paso 2: crear el repositorio y subir

```powershell
& "C:\Users\Asus\tools\bin\gh.exe" repo create urebeca/blazedemo --private --source . --remote origin --push
```

Qué hace este comando:

- Crea el repositorio `urebeca/blazedemo` como **privado**.
- Usa la carpeta actual como origen (`--source .`).
- Agrega el remoto con el nombre `origin` (`--remote origin`).
- Sube el contenido con el primer push (`--push`).

### Alternativa manual con git (si lo prefieres)

```powershell
cd C:\Users\Asus\exp003
git remote add origin https://github.com/urebeca/blazedemo.git
git push -u origin main
```

### Paso 3: verificar

Abre en el navegador:

```text
https://github.com/urebeca/blazedemo
```

Deberías ver los 40 archivos del proyecto y la rama `main`.

## 4. Método B (alternativa): Personal Access Token (PAT)

Usa este método solo si no quieres o no puedes usar el flujo de dispositivo de `gh`.

### Paso 1: crear el token en GitHub

1. Entra a GitHub e inicia sesión como `urebeca`.
2. Ve a **Settings** (Configuración).
3. Entra a **Developer settings** (Configuración de desarrollador).
4. Entra a **Personal access tokens**.
5. Elige **Fine-grained tokens** o **Tokens (classic)**:
   - Con un token **classic**, selecciona el scope `repo`.
6. Genera el token y **cópialo en un lugar seguro**.

### Paso 2: usarlo (según la opción elegida)

Opción 1, iniciar sesión en `gh` con el token:

```powershell
& "C:\Users\Asus\tools\bin\gh.exe" auth login --hostname github.com --git-protocol https --with-token
```

(Pega el token cuando se solicite.)

Opción 2, usar el helper de credenciales de git:

```powershell
git config --global credential.helper manager
git push -u origin main
```

(Se te pedirá usuario y contraseña; en la contraseña pega el token.)

Opción 3, usar la URL con token (solo si es imprescindible):

```powershell
git remote set-url origin https://urebeca:<TU_TOKEN>@github.com/urebeca/blazedemo.git
```

Advertencia: el token es un **secreto**. No lo compartas, no lo publiques y no lo incluyas en el repositorio (ni en archivos ni en commits). Si crees que se filtró, revócalo y genera uno nuevo.

## 5. Solución de problemas

### Git 2.25 no soporta `git init -b`

Esta versión no acepta la opción `-b`. Si necesitas fijar la rama principal, usa:

```powershell
git init
git symbolic-ref HEAD refs/heads/main
```

### Error: `remote origin already exists`

Ocurre si ya existe un remoto `origin`. En lugar de volver a agregarlo, actualiza su URL:

```powershell
git remote set-url origin https://github.com/urebeca/blazedemo.git
```

### `gh` no reconocido como comando

Como `gh` está instalado de forma portátil y no en el PATH del sistema, siempre invócalo con la ruta completa:

```powershell
& "C:\Users\Asus\tools\bin\gh.exe" auth status
```

### Autenticación fallida o expirada

Si los comandos fallan por credenciales, vuelve a iniciar sesión:

```powershell
& "C:\Users\Asus\tools\bin\gh.exe" auth login --hostname github.com --git-protocol https --web
```

### Verificar la rama actual

Comprueba que estás en la rama `main` antes de subir:

```powershell
git branch --show-current
```

El resultado debe ser:

```text
main
```
