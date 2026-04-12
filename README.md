
## Instalação

### Pré-Requisitos
Antes de rodar o projeto, certifique-se de ter as seguintes dependências.
- [NPM](#https://www.npmjs.com/)
- [Expo](#https://expo.dev/)


### Passo a Passo

#### 0. Clone este repositório:
```bash
git clone https://github.com/Bernardo270408/minianilist
cd minianilist
```

#### 1. Instale as dependencias
```bash
cd minianilist
npm install
```

#### 2. Configure as variáveis de Ambiente:
Crie o arquivo `.env` na pasta raiz e adicione a chave de API do TMDB:
```env
EXPO_PUBLIC_API_KEY=SUA_CHAVE_TMDB
```
**Nota**: Você pode obter a chave de API necessária para o projeto nos seguinte link de forma gratuita: [https://developer.themoviedb.org/docs/getting-started](https://developer.themoviedb.org/docs/getting-started)

#### 3. Inicialize o Projeto
Conecte seu dispositivo Mobile via USB, permita a depuração USB nas opções de desenvolvedor e execute o comando de inicialização no computador:
```bash
npm run android
```
**Nota**: Também é possível utilizar o emulador Android do Android Studio.