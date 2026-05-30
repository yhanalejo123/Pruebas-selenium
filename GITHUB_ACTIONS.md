# GitHub Actions - Guía de Configuración

## ¿Qué es GitHub Actions?

GitHub Actions automatiza pruebas, builds y despliegues cada vez que haces `push` o `pull_request`.

---

## Estructura del Workflow

Tu workflow `.github/workflows/test.yml` ejecuta **4 trabajos en paralelo**:

### 1. **Backend Tests** 🧪
- Instala dependencias del backend
- Ejecuta tests de integración: `npm run test:integration`
- Prueba con Node 18.x y 20.x
- Carga los resultados

### 2. **Frontend Build** 🏗️
- Instala dependencias del frontend
- Compila React: `npm run build`
- Ejecuta linting si existe
- Carga los artefactos compilados

### 3. **Security Audit** 🔒
- Revisa vulnerabilidades en npm packages
- Nivel de alerta: "moderate"
- No detiene el workflow si las encuentra (solo alerta)

### 4. **Status Check** ✅
- Verifica que backend y frontend pasaron
- Si alguno falla, el workflow falla

---

## Cómo funciona

### Trigger (cuándo se ejecuta)
```yaml
on:
  push:
    branches: [ main, develop ]  # Cada vez que haces push a main o develop
  pull_request:
    branches: [ main, develop ]  # Cada pull request
```

---

## Configuración requerida

### 1. Backend - `backend/package.json`
```json
{
  "scripts": {
    "test:integration": "mocha \"test/integracion/*.test.js\"",
    "start": "node server.js"
  }
}
```

### 2. Frontend - `frontend/package.json`
```json
{
  "scripts": {
    "build": "vite build",
    "lint": "eslint . --ext .js,.jsx"
  }
}
```

---

## Ver los resultados en GitHub

1. Ve a: https://github.com/yhanalejo123/Pruebas-selenium
2. Haz clic en **Actions** (en la barra superior)
3. Verás los workflows ejecutándose
4. Haz clic en uno para ver detalles

---

## Badges para tu README

Puedes agregar un badge de estado en tu `README.md`:

```markdown
[![Backend & Frontend Tests](https://github.com/yhanalejo123/Pruebas-selenium/workflows/Test%20Backend%20&%20Frontend/badge.svg)](https://github.com/yhanalejo123/Pruebas-selenium/actions)
```

---

## Personalización avanzada

### Agregar tests E2E con Selenium
```yaml
- name: Start frontend dev server
  working-directory: frontend
  run: npm run dev &
  
- name: Start backend
  working-directory: backend
  run: npm start &
  
- name: Wait for services
  run: sleep 10
  
- name: Run E2E tests
  working-directory: backend
  run: npm run test:e2e
```

### Agregar cobertura de código
```yaml
- name: Generate coverage
  working-directory: backend
  run: npm test -- --coverage

- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v3
  with:
    files: ./backend/coverage/lcov.info
```

### Enviar notificaciones a Slack
```yaml
- name: Notify Slack
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## Pasos para activar

1. **Commit los cambios:**
   ```powershell
   git add .github/
   git add backend/package.json
   git commit -m "Configure GitHub Actions for CI/CD"
   git push
   ```

2. **Ve a GitHub Actions:**
   - https://github.com/yhanalejo123/Pruebas-selenium/actions
   - Verás los workflows ejecutándose

3. **Espera a que terminen** ✅

---

## Solucionar problemas

### Si los tests fallan:
1. Haz clic en el workflow fallido
2. Lee el log detallado
3. Arregla el error localmente
4. Haz push nuevamente

### Workflow bloqueado:
- Ve a **Settings → Actions → General**
- Verifica que "Allow GitHub Actions to create and approve pull requests" esté habilitado

---

¡Tu pipeline de CI/CD está listo! 🚀
